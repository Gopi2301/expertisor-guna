-- ====================================
-- Schema Migration: Add Status System
-- Run this after initial schema.sql
-- ====================================

-- Add new status values and timestamp columns
ALTER TABLE courses 
    MODIFY COLUMN status ENUM('DRAFT', 'SCHEDULED', 'PUBLISHED', 'ARCHIVED') DEFAULT 'DRAFT',
    ADD COLUMN scheduled_publish_at DATETIME NULL AFTER published_at,
    ADD COLUMN archived_at DATETIME NULL AFTER scheduled_publish_at;

-- Add indexes for performance
CREATE INDEX idx_course_status ON courses(status);
CREATE INDEX idx_scheduled_publish ON courses(scheduled_publish_at);

-- Update templates table status enum as well
ALTER TABLE cms_templates 
    MODIFY COLUMN status ENUM('draft', 'scheduled', 'published', 'archived') DEFAULT 'draft',
    ADD COLUMN scheduled_publish_at DATETIME NULL AFTER published_at,
    ADD COLUMN archived_at DATETIME NULL AFTER scheduled_publish_at;

CREATE INDEX idx_template_status ON cms_templates(status);
CREATE INDEX idx_template_scheduled ON cms_templates(scheduled_publish_at);
