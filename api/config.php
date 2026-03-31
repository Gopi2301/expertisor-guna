<?php
/**
 * Database Configuration & Utilities
 * Optimized for Yash Host SMM Plan
 * 
 * SETUP INSTRUCTIONS:
 * 1. Create MySQL database via Yash Host cPanel
 * 2. Update credentials below
 * 3. Run the SQL schema (api/schema.sql) to create tables
 * 4. Update JWT_SECRET with a secure random string
 */

// Database credentials
define('DB_HOST', getenv('DB_HOST') ?: 'localhost');
define('DB_NAME', getenv('DB_NAME') ?: 'expertisor');
define('DB_USER', getenv('DB_USER') ?: 'user');
define('DB_PASS', getenv('DB_PASS') ?: 'password');

// JWT Configuration
define('JWT_SECRET', 'fb3e769c95c44e7e8a1be8e0847d814d9bdfc31f91d58d7588ae37e0ce2ef5b7');
define('JWT_EXPIRY', 86400); // 24 hours in seconds

// Environment detection
define('IS_PRODUCTION', !in_array($_SERVER['HTTP_HOST'], ['localhost', '127.0.0.1', 'localhost:5173']));

// CORS headers - Dynamic handling for sslip.io and dev environments
$allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3000',
    'http://localhost:8080',
    'https://dev.expertisoracademy.in',
    'https://expertisoracademy.in',
    'https://www.expertisoracademy.in',
    'http://sgcso8s8gc4oocwcoooo0k84.72.61.241.36.sslip.io' // Staging
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$isAllowed = in_array($origin, $allowedOrigins);

// Also allow sslip.io domains for Coolify/easypanel deployments
if (!$isAllowed && !empty($origin) && preg_match('/\.sslip\.io$/', parse_url($origin, PHP_URL_HOST))) {
    $isAllowed = true;
}

if ($isAllowed) {
    header('Access-Control-Allow-Origin: ' . $origin);
    header('Access-Control-Allow-Credentials: true');
} else {
    // If not in allowed list, reflect origin but might fail credentials check in strict browsers
    // For debugging, we can be permissive if needed, but 'null' or '*' with creds fails.
    // Safe bet: if debug mode or similar, allow it. For now, strict or specific fallback.
    if (!empty($origin)) {
        header('Access-Control-Allow-Origin: ' . $origin);
        header('Access-Control-Allow-Credentials: true');
    }
}

header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Content-Type: application/json');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

/**
 * Get database connection
 * @param bool $silent If true, returns null on error instead of exiting
 */
function getDB($silent = false)
{
    try {
        $pdo = new PDO(
            "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4",
            DB_USER,
            DB_PASS,
            [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false
            ]
        );
        return $pdo;
    } catch (PDOException $e) {
        if ($silent) {
            return null;
        }
        sendError('Database connection failed: ' . $e->getMessage(), 500);
        return null;
    }
}

/**
 * Send JSON response
 */
function sendResponse($data, $code = 200)
{
    http_response_code($code);
    echo json_encode([
        'success' => true,
        'data' => $data,
        'error' => null
    ]);
    exit();
}

/**
 * Send error response
 */
function sendError($message, $code = 400)
{
    http_response_code($code);
    echo json_encode([
        'success' => false,
        'data' => null,
        'error' => $message
    ]);
    exit();
}

/**
 * Get JSON body from request
 */
function getRequestBody()
{
    $json = file_get_contents('php://input');
    return json_decode($json, true) ?? [];
}

/**
 * Generate URL-friendly slug
 */
function generateSlug($text)
{
    $slug = strtolower($text);
    $slug = preg_replace('/[^a-z0-9]+/', '-', $slug);
    $slug = trim($slug, '-');
    return $slug;
}

// ====================================
// JWT AUTHENTICATION FUNCTIONS
// ====================================

/**
 * Generate JWT token
 */
function generateJWT($userId, $username)
{
    $header = json_encode(['typ' => 'JWT', 'alg' => 'HS256']);
    $payload = json_encode([
        'user_id' => $userId,
        'username' => $username,
        'iat' => time(),
        'exp' => time() + JWT_EXPIRY
    ]);

    $base64UrlHeader = base64UrlEncode($header);
    $base64UrlPayload = base64UrlEncode($payload);
    $signature = hash_hmac('sha256', $base64UrlHeader . "." . $base64UrlPayload, JWT_SECRET, true);
    $base64UrlSignature = base64UrlEncode($signature);

    return $base64UrlHeader . "." . $base64UrlPayload . "." . $base64UrlSignature;
}

/**
 * Verify JWT token
 */
function verifyJWT($token)
{
    $tokenParts = explode('.', $token);
    if (count($tokenParts) !== 3) {
        return false;
    }

    $header = base64UrlDecode($tokenParts[0]);
    $payload = base64UrlDecode($tokenParts[1]);
    $signatureProvided = $tokenParts[2];

    $base64UrlHeader = base64UrlEncode($header);
    $base64UrlPayload = base64UrlEncode($payload);
    $signature = hash_hmac('sha256', $base64UrlHeader . "." . $base64UrlPayload, JWT_SECRET, true);
    $base64UrlSignature = base64UrlEncode($signature);

    if ($base64UrlSignature !== $signatureProvided) {
        return false;
    }

    $payloadData = json_decode($payload, true);

    // Check expiration
    if (isset($payloadData['exp']) && $payloadData['exp'] < time()) {
        return false;
    }

    return $payloadData;
}

/**
 * Base64 URL encode
 */
function base64UrlEncode($data)
{
    return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
}

/**
 * Base64 URL decode
 */
function base64UrlDecode($data)
{
    return base64_decode(strtr($data, '-_', '+/'));
}

/**
 * Get authorization token from header
 */
function getAuthToken()
{
    $headers = getallheaders();
    if (isset($headers['Authorization'])) {
        $matches = [];
        if (preg_match('/Bearer\s+(.*)$/i', $headers['Authorization'], $matches)) {
            return $matches[1];
        }
    }
    return null;
}

/**
 * Require authentication - middleware function
 * Call this at the start of protected endpoints
 */
function requireAuth()
{
    $token = getAuthToken();

    if (!$token) {
        sendError('Authentication required', 401);
    }

    $payload = verifyJWT($token);

    if (!$payload) {
        sendError('Invalid or expired token', 401);
    }

    return $payload; // Returns user data from token
}

/**
 * Hash password using bcrypt
 */
function hashPassword($password)
{
    return password_hash($password, PASSWORD_BCRYPT, ['cost' => 10]);
}

/**
 * Verify password against hash
 */
function verifyPassword($password, $hash)
{
    return password_verify($password, $hash);
}

/**
 * Sanitize input to prevent XSS
 */
function sanitizeInput($data)
{
    if (is_array($data)) {
        return array_map('sanitizeInput', $data);
    }
    return htmlspecialchars(strip_tags($data), ENT_QUOTES, 'UTF-8');
}

/**
 * Validate email format
 */
function isValidEmail($email)
{
    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}

if (!function_exists('getallheaders')) {
    function getallheaders()
    {
        $headers = [];
        foreach ($_SERVER as $name => $value) {
            if (substr($name, 0, 5) == 'HTTP_') {
                $headers[str_replace(' ', '-', ucwords(strtolower(str_replace('_', ' ', substr($name, 5)))))] = $value;
            }
        }
        return $headers;
    }
}
