-- Add payout_date column to applications table
ALTER TABLE public.applications 
ADD COLUMN payout_date date;