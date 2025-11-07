-- Update document_type enum to include new types
ALTER TYPE document_type ADD VALUE IF NOT EXISTS 'proof_of_identity';
ALTER TYPE document_type ADD VALUE IF NOT EXISTS 'proof_of_income';
ALTER TYPE document_type ADD VALUE IF NOT EXISTS 'property_documents';
ALTER TYPE document_type ADD VALUE IF NOT EXISTS 'additional_documents';