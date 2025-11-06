-- Add columns to store selected bookings for advance
ALTER TABLE public.applications 
ADD COLUMN selected_booking_ids TEXT[] DEFAULT '{}',
ADD COLUMN selected_bookings_revenue NUMERIC DEFAULT 0,
ADD COLUMN requested_advance_amount NUMERIC DEFAULT 0;

-- Add comment for clarity
COMMENT ON COLUMN public.applications.selected_booking_ids IS 'Array of airbnb_bookings IDs that user selected for advance';
COMMENT ON COLUMN public.applications.selected_bookings_revenue IS 'Total expected revenue from selected bookings';
COMMENT ON COLUMN public.applications.requested_advance_amount IS 'Amount user is requesting (typically 70% of selected bookings revenue)';