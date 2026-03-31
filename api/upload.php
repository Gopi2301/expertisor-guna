<?php
/**
 * File Upload API
 * 
 * Handles uploads for course thumbnails and brochures
 * POST /api/upload.php
 */

require_once 'config.php';

// Add CORS headers for development
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Try to authenticate but don't fail if token is missing
$token = getAuthToken();
if ($token) {
    $payload = verifyJWT($token);
    if (!$payload) {
        error_log('[UPLOAD] Invalid token provided');
        sendError('Invalid or expired token', 401);
    }
} else {
    error_log('[UPLOAD] No auth token provided - allowing upload anyway');
    // Allow upload even without token for now
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendError('Method not allowed', 405);
}

if (!isset($_FILES['file'])) {
    sendError('No file uploaded', 400);
}

$file = $_FILES['file'];
$uploadDir = '../uploads/';

// Ensure upload directory exists
if (!file_exists($uploadDir)) {
    mkdir($uploadDir, 0777, true);
}

// Validation
$allowedTypes = [
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/gif',
    'application/pdf'
];

if (!in_array($file['type'], $allowedTypes)) {
    sendError('Invalid file type. Allowed: JPG, PNG, WEBP, GIF, PDF', 400);
}

if ($file['size'] > 5 * 1024 * 1024) { // 5MB limit
    sendError('File size exceeds 5MB limit', 400);
}

// Generate unique filename
$extension = pathinfo($file['name'], PATHINFO_EXTENSION);
$filename = uniqid('upload_') . '_' . time() . '.' . $extension;
$targetPath = $uploadDir . $filename;
$publicPath = '/uploads/' . $filename;

// Move uploaded file
if (move_uploaded_file($file['tmp_name'], $targetPath)) {
    error_log('[UPLOAD] Successfully uploaded file: ' . $filename);
    sendResponse([
        'url' => $publicPath,
        'filename' => $filename,
        'original_name' => $file['name']
    ]);
} else {
    error_log('[UPLOAD] Failed to move uploaded file');
    sendError('Failed to save file', 500);
}
