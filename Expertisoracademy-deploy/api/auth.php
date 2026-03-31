<?php
/**
 * Authentication API
 * Handles login, logout, and token verification
 * 
 * Endpoints:
 * POST /api/auth.php?action=login    - Admin login
 * POST /api/auth.php?action=verify   - Verify JWT token
 * POST /api/auth.php?action=logout   - Logout (invalidate token)
 */

require_once 'config.php';

$action = $_GET['action'] ?? '';
$method = $_SERVER['REQUEST_METHOD'];

if ($method !== 'POST') {
    sendError('Method not allowed', 405);
}

$db = getDB();

switch ($action) {
    case 'login':
        handleLogin($db);
        break;
    case 'verify':
        handleVerify($db);
        break;
    case 'logout':
        handleLogout($db);
        break;
    default:
        sendError('Invalid action');
}

/**
 * Handle login request
 */
function handleLogin($db)
{
    $data = getRequestBody();

    $username = $data['username'] ?? '';
    $password = $data['password'] ?? '';

    if (empty($username) || empty($password)) {
        sendError('Username and password are required');
    }

    // Sanitize input
    $username = sanitizeInput($username);

    // Get user from database
    $stmt = $db->prepare("SELECT * FROM admin_users WHERE username = ?");
    $stmt->execute([$username]);
    $user = $stmt->fetch();

    if (!$user) {
        sendError('Invalid credentials', 401);
    }

    // Verify password
    if (!verifyPassword($password, $user['password_hash'])) {
        sendError('Invalid credentials', 401);
    }

    // Generate JWT token
    $token = generateJWT($user['id'], $user['username']);

    // Store token hash in database for tracking
    $tokenHash = hash('sha256', $token);
    $expiresAt = date('Y-m-d H:i:s', time() + JWT_EXPIRY);

    $stmt = $db->prepare("
        INSERT INTO auth_tokens (user_id, token_hash, expires_at) 
        VALUES (?, ?, ?)
    ");
    $stmt->execute([$user['id'], $tokenHash, $expiresAt]);

    // Update last login
    $stmt = $db->prepare("UPDATE admin_users SET last_login = NOW() WHERE id = ?");
    $stmt->execute([$user['id']]);

    // Return token and user info
    sendResponse([
        'token' => $token,
        'user' => [
            'id' => $user['id'],
            'username' => $user['username'],
            'email' => $user['email']
        ],
        'expiresIn' => JWT_EXPIRY
    ]);
}

/**
 * Handle token verification
 */
function handleVerify($db)
{
    $userData = requireAuth(); // This will exit with 401 if invalid

    // Token is valid, return user data
    $stmt = $db->prepare("SELECT id, username, email FROM admin_users WHERE id = ?");
    $stmt->execute([$userData['user_id']]);
    $user = $stmt->fetch();

    if (!$user) {
        sendError('User not found', 404);
    }

    sendResponse([
        'valid' => true,
        'user' => $user
    ]);
}

/**
 * Handle logout
 */
function handleLogout($db)
{
    $token = getAuthToken();

    if (!$token) {
        sendError('No token provided');
    }

    // Remove token from database
    $tokenHash = hash('sha256', $token);
    $stmt = $db->prepare("DELETE FROM auth_tokens WHERE token_hash = ?");
    $stmt->execute([$tokenHash]);

    sendResponse(['message' => 'Logged out successfully']);
}

// Clean up expired tokens periodically (10% chance on each request)
if (rand(1, 10) === 1) {
    try {
        $db->exec("DELETE FROM auth_tokens WHERE expires_at < NOW()");
    } catch (Exception $e) {
        // Silently fail - this is just cleanup
    }
}
