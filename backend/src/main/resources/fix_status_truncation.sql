-- Fix for 'Data truncated for column status' error
ALTER TABLE appointments MODIFY COLUMN status VARCHAR(50) NOT NULL;
ALTER TABLE payments MODIFY COLUMN status VARCHAR(50) NOT NULL;
