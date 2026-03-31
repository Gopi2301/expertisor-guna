-- ====================================
-- Course Metadata Enhancement Migration v3
-- Adds missing course fields for proper metadata storage
-- ====================================

-- Add missing columns to courses table
ALTER TABLE courses 
ADD COLUMN IF NOT EXISTS level VARCHAR(50) DEFAULT 'All levels' COMMENT 'Course difficulty level' AFTER duration,
ADD COLUMN IF NOT EXISTS reviews_count INT DEFAULT 0 COMMENT 'Total number of reviews' AFTER rating,
ADD COLUMN IF NOT EXISTS description TEXT DEFAULT NULL COMMENT 'Course description' AFTER slug,
ADD COLUMN IF NOT EXISTS instructor VARCHAR(100) DEFAULT NULL COMMENT 'Instructor name (alias for mentor_name)' AFTER mentor_name;

-- ====================================
-- Verification Query
-- ====================================

/*
-- Run this to verify migration succeeded:

SELECT COLUMN_NAME, COLUMN_TYPE, COLUMN_DEFAULT, COLUMN_COMMENT 
FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_NAME = 'courses' 
AND COLUMN_NAME IN ('level', 'reviews_count', 'description', 'instructor');

-- Or simply:
DESCRIBE courses;
*/

-- ====================================
-- Sample Update (Optional - for existing courses)
-- ====================================

/*
-- Set default values for existing courses if needed:
UPDATE courses SET level = 'All levels' WHERE level IS NULL;
UPDATE courses SET reviews_count = 0 WHERE reviews_count IS NULL;
*/
