-- ====================================
-- CMS Enhancement Migration v2
-- Phase 1: Apply Now Popup, Brochure Download, Single-Page Layout
-- ====================================

-- Add new columns to courses table
ALTER TABLE courses 
ADD COLUMN IF NOT EXISTS brochure_enabled BOOLEAN DEFAULT FALSE COMMENT 'Toggle for brochure download button',
ADD COLUMN IF NOT EXISTS brochure_type ENUM('file', 'link') DEFAULT 'link' COMMENT 'Brochure source type (uploaded file or external link)',
ADD COLUMN IF NOT EXISTS brochure_url VARCHAR(500) DEFAULT NULL COMMENT 'Brochure file URL or external link',
ADD COLUMN IF NOT EXISTS brochure_filename VARCHAR(255) DEFAULT NULL COMMENT 'Original filename for uploaded brochures',
ADD COLUMN IF NOT EXISTS icon_id VARCHAR(100) DEFAULT 'sparkles' COMMENT 'Selected icon identifier from icon library',
ADD COLUMN IF NOT EXISTS icon_color VARCHAR(20) DEFAULT '#FFF200' COMMENT 'Icon color hex code',
ADD COLUMN IF NOT EXISTS title_highlights JSON DEFAULT NULL COMMENT 'Title text highlighting metadata',
ADD COLUMN IF NOT EXISTS subtitle_highlights JSON DEFAULT NULL COMMENT 'Subtitle text highlighting metadata',
ADD COLUMN IF NOT EXISTS metadata JSON DEFAULT NULL COMMENT 'Course metadata (rating, students, duration, difficulty)',
ADD COLUMN IF NOT EXISTS testimonials JSON DEFAULT NULL COMMENT 'Student testimonials array',
ADD COLUMN IF NOT EXISTS faqs JSON DEFAULT NULL COMMENT 'FAQ items array';

-- Update existing hero_data to support new modal configuration
-- Note: This is a data migration, not schema change
-- Existing JSON structure will be updated via application code

-- Create uploads directory table for file management
CREATE TABLE IF NOT EXISTS uploaded_files (
    id INT AUTO_INCREMENT PRIMARY KEY,
    course_id INT NOT NULL,
    file_type ENUM('brochure', 'thumbnail', 'other') DEFAULT 'other',
    original_filename VARCHAR(255) NOT NULL,
    stored_filename VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_size INT NOT NULL COMMENT 'File size in bytes',
    mime_type VARCHAR(100) NOT NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    uploaded_by INT NULL COMMENT 'Admin user ID who uploaded',
    
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    FOREIGN KEY (uploaded_by) REFERENCES admin_users(id) ON DELETE SET NULL,
    
    INDEX idx_course_id (course_id),
    INDEX idx_file_type (file_type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ====================================
-- ROLLBACK SCRIPT (Run if migration fails)
-- ====================================

/*
-- To rollback this migration, run:

ALTER TABLE courses 
DROP COLUMN IF EXISTS brochure_enabled,
DROP COLUMN IF EXISTS brochure_type,
DROP COLUMN IF EXISTS brochure_url,
DROP COLUMN IF EXISTS brochure_filename,
DROP COLUMN IF EXISTS icon_id,
DROP COLUMN IF EXISTS icon_color,
DROP COLUMN IF EXISTS title_highlights,
DROP COLUMN IF EXISTS subtitle_highlights;

DROP TABLE IF EXISTS uploaded_files;
*/

-- ====================================
-- Verification Query
-- ====================================

/*
-- Run this to verify migration succeeded:

DESCRIBE courses;
DESCRIBE uploaded_files;

-- Check for new columns
SELECT COLUMN_NAME, COLUMN_TYPE, COLUMN_DEFAULT, COLUMN_COMMENT 
FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_NAME = 'courses' 
AND COLUMN_NAME IN ('brochure_enabled', 'brochure_type', 'brochure_url', 'brochure_filename', 
                     'icon_id', 'icon_color', 'title_highlights', 'subtitle_highlights');
*/
