-- Create table for storing Airbnb iCal connections
CREATE TABLE public.airbnb_connections (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
  listing_name TEXT,
  ical_url TEXT NOT NULL,
  last_synced_at TIMESTAMP WITH TIME ZONE,
  sync_status TEXT DEFAULT 'pending',
  sync_error TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for storing parsed bookings
CREATE TABLE public.airbnb_bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  connection_id UUID NOT NULL REFERENCES public.airbnb_connections(id) ON DELETE CASCADE,
  booking_start_date TIMESTAMP WITH TIME ZONE NOT NULL,
  booking_end_date TIMESTAMP WITH TIME ZONE NOT NULL,
  guest_name TEXT,
  booking_status TEXT DEFAULT 'confirmed',
  nights INTEGER,
  estimated_revenue NUMERIC,
  raw_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.airbnb_connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.airbnb_bookings ENABLE ROW LEVEL SECURITY;

-- Policies for airbnb_connections
CREATE POLICY "Users can view own connections"
  ON public.airbnb_connections FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.properties p
      JOIN public.applications a ON a.id = p.application_id
      WHERE p.id = airbnb_connections.property_id
        AND a.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create connections for own properties"
  ON public.airbnb_connections FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.properties p
      JOIN public.applications a ON a.id = p.application_id
      WHERE p.id = airbnb_connections.property_id
        AND a.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update own connections"
  ON public.airbnb_connections FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.properties p
      JOIN public.applications a ON a.id = p.application_id
      WHERE p.id = airbnb_connections.property_id
        AND a.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete own connections"
  ON public.airbnb_connections FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.properties p
      JOIN public.applications a ON a.id = p.application_id
      WHERE p.id = airbnb_connections.property_id
        AND a.user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can manage all connections"
  ON public.airbnb_connections FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Policies for airbnb_bookings
CREATE POLICY "Users can view own bookings"
  ON public.airbnb_bookings FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.airbnb_connections ac
      JOIN public.properties p ON p.id = ac.property_id
      JOIN public.applications a ON a.id = p.application_id
      WHERE ac.id = airbnb_bookings.connection_id
        AND a.user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can view all bookings"
  ON public.airbnb_bookings FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Create indexes for performance
CREATE INDEX idx_airbnb_connections_property_id ON public.airbnb_connections(property_id);
CREATE INDEX idx_airbnb_bookings_connection_id ON public.airbnb_bookings(connection_id);
CREATE INDEX idx_airbnb_bookings_dates ON public.airbnb_bookings(booking_start_date, booking_end_date);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_airbnb_connections_updated_at
  BEFORE UPDATE ON public.airbnb_connections
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_airbnb_bookings_updated_at
  BEFORE UPDATE ON public.airbnb_bookings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();