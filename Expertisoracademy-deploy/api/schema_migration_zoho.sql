-- Zoho Forms Integration Schema Migration
-- Add form_submissions table to track all form submissions

CREATE TABLE IF NOT EXISTS form_submissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    course_id INT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    education VARCHAR(255) NULL,
    profile VARCHAR(100) NULL,
    question TEXT NULL,
    submitted_at DATETIME NOT NULL,
    zoho_submitted BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE SET NULL,
    INDEX idx_email (email),
    INDEX idx_submitted_at (submitted_at),
    INDEX idx_course_id (course_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
