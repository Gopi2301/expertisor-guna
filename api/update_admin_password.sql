-- Update admin password
-- New password: admin123
-- This is the bcrypt hash for 'admin123'

UPDATE admin_users 
SET password = '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'
WHERE username = 'admin';

-- Verify the update
SELECT id, username, email, created_at FROM admin_users WHERE username = 'admin';
