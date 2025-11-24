-- Add 'rental_arbitrage' to the ownership_status enum
ALTER TYPE ownership_status ADD VALUE IF NOT EXISTS 'rental_arbitrage';