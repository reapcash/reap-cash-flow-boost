-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create enum for application status
CREATE TYPE public.application_status AS ENUM (
  'draft',
  'submitted',
  'under_review',
  'approved',
  'rejected',
  'funded'
);

-- Create enum for property types
CREATE TYPE public.property_type AS ENUM (
  'single_family',
  'multi_family',
  'condo_apartment',
  'other'
);

-- Create enum for property ownership status
CREATE TYPE public.ownership_status AS ENUM (
  'owned_outright',
  'mortgaged'
);

-- Create enum for repayment terms
CREATE TYPE public.repayment_terms AS ENUM (
  'weekly',
  'bi_weekly',
  'monthly'
);

-- Create enum for document types
CREATE TYPE public.document_type AS ENUM (
  'government_id',
  'property_deed',
  'mortgage_statement',
  'booking_history',
  'insurance_proof',
  'utility_bill',
  'bank_statements'
);

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone_number TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create user_roles table (separate for security)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Create applications table
CREATE TABLE public.applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  status application_status DEFAULT 'draft' NOT NULL,
  
  -- Financial Information
  preferred_advance_amount DECIMAL(12, 2),
  repayment_terms repayment_terms,
  
  -- Consent & Agreement
  credit_report_authorized BOOLEAN DEFAULT FALSE,
  verification_consent BOOLEAN DEFAULT FALSE,
  terms_agreed BOOLEAN DEFAULT FALSE,
  
  -- Signature
  signature_data TEXT,
  signature_date TIMESTAMPTZ,
  
  -- Timestamps
  submitted_at TIMESTAMPTZ,
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

-- Create properties table (multiple properties per application)
CREATE TABLE public.properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id UUID REFERENCES public.applications(id) ON DELETE CASCADE NOT NULL,
  
  -- Property Information
  property_address TEXT NOT NULL,
  property_type property_type NOT NULL,
  property_type_other TEXT,
  number_of_bedrooms INTEGER,
  number_of_bathrooms DECIMAL(3, 1),
  square_footage INTEGER,
  ownership_status ownership_status NOT NULL,
  year_of_purchase INTEGER,
  estimated_property_value DECIMAL(12, 2),
  
  -- STR Details
  booking_platforms TEXT[], -- Array of platforms
  average_occupancy_rate DECIMAL(5, 2), -- Percentage
  average_nightly_rate DECIMAL(10, 2),
  average_monthly_revenue DECIMAL(12, 2),
  booking_history_summary TEXT,
  
  -- Future Bookings
  future_bookings_nights INTEGER,
  future_bookings_revenue DECIMAL(12, 2),
  
  -- Financial
  current_mortgage_balance DECIMAL(12, 2),
  monthly_mortgage_payment DECIMAL(10, 2),
  outstanding_debts TEXT,
  
  -- Bank Information
  bank_name TEXT,
  bank_account_number_last_4 TEXT, -- Only store last 4 digits
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;

-- Create documents table
CREATE TABLE public.documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id UUID REFERENCES public.applications(id) ON DELETE CASCADE NOT NULL,
  document_type document_type NOT NULL,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_size INTEGER,
  mime_type TEXT,
  uploaded_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;

-- Create application_notes table for admin tags and progress tracking
CREATE TABLE public.application_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id UUID REFERENCES public.applications(id) ON DELETE CASCADE NOT NULL,
  admin_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  note TEXT NOT NULL,
  tags TEXT[], -- Array of tags for progress marking
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.application_notes ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Admins can view all profiles"
  ON public.profiles FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for user_roles
CREATE POLICY "Users can view own roles"
  ON public.user_roles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles"
  ON public.user_roles FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for applications
CREATE POLICY "Users can view own applications"
  ON public.applications FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own applications"
  ON public.applications FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own applications"
  ON public.applications FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all applications"
  ON public.applications FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update all applications"
  ON public.applications FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for properties
CREATE POLICY "Users can view own properties"
  ON public.properties FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.applications
      WHERE applications.id = properties.application_id
      AND applications.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create properties for own applications"
  ON public.properties FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.applications
      WHERE applications.id = properties.application_id
      AND applications.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update own properties"
  ON public.properties FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.applications
      WHERE applications.id = properties.application_id
      AND applications.user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can view all properties"
  ON public.properties FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for documents
CREATE POLICY "Users can view own documents"
  ON public.documents FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.applications
      WHERE applications.id = documents.application_id
      AND applications.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can upload documents for own applications"
  ON public.documents FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.applications
      WHERE applications.id = documents.application_id
      AND applications.user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can view all documents"
  ON public.documents FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for application_notes
CREATE POLICY "Users can view notes on own applications"
  ON public.application_notes FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.applications
      WHERE applications.id = application_notes.application_id
      AND applications.user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can manage all notes"
  ON public.application_notes FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- Create function to automatically create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, phone_number)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'phone_number', '')
  );
  
  -- Assign default 'user' role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'user');
  
  RETURN NEW;
END;
$$;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_applications_updated_at
  BEFORE UPDATE ON public.applications
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_properties_updated_at
  BEFORE UPDATE ON public.properties
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();