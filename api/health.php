<?php
/**
 * Health Check Endpoint
 * Verifies that the backend is reachable and the database is connected.
 */

require_once './config.php';

// Check Database Connection
$dbStatus = 'disconnected';
$error = null;

try {
    $pdo = getDB(true); // Silent mode
    if ($pdo) {
        $dbStatus = 'connected';
    } else {
        $error = 'Failed to connect to DB';
    }
} catch (Exception $e) {
    $error = $e->getMessage();
}

// Build response
$response = [
    'status' => 'ok',
    'service' => 'backend',
    'timestamp' => time(),
    'database' => $dbStatus,
    'environment' => IS_PRODUCTION ? 'production' : 'development'
];

if ($error) {
    $response['error'] = $error;
}

// Return 200 OK regardless of DB status, so the service itself is seen as "up"
// (Unless you want it to fail health checks on DB failure, but usually 200 OK + status detail is better for diagnostics)
sendResponse($response);
