<?php
/**
 * Course Application Submission Handler
 * Creates Zoho CRM Contact with course-specific fields
 */

require_once '../config.php';
require_once './config.php';

// Enable error logging
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendError('Method not allowed', 405);
}

try {
    // Get request body
    $requestBody = getRequestBody();

    logToConsole('[COURSE APPLICATION] Request received', $requestBody);

    // Validate required fields
    $required = ['name', 'email', 'phone'];
    foreach ($required as $field) {
        if (empty($requestBody[$field])) {
            sendError("$field is required", 400);
        }
    }

    // Validate email format
    if (!filter_var($requestBody['email'], FILTER_VALIDATE_EMAIL)) {
        sendError('Invalid email format', 400);
    }

    // Get Zoho access token
    $accessToken = getAccessToken();

    if (!$accessToken) {
        throw new Exception('Failed to get Zoho access token');
    }

    // Parse name into first and last name
    $nameParts = explode(' ', trim($requestBody['name']), 2);
    $firstName = $nameParts[0];
    $lastName = isset($nameParts[1]) ? $nameParts[1] : '';

    // Prepare contact data with course-specific fields
    $contactData = [
        'Last_Name' => $lastName ?: $firstName,
        'Email' => $requestBody['email'],
        'Mobile' => $requestBody['phone'],
        'Educational_qualification' => $requestBody['qualification'],
        'Current_Profile' => $requestBody['profile']
    ];

    // Create Contact in Zoho CRM
    $contactResult = createZohoCRMContact($accessToken, $contactData);
    logToConsole('[COURSE APPLICATION] Zoho CRM Contact Response', $contactResult);

    $dealResult = null;

    // Check for errors
    if (isset($contactResult['code']) && $contactResult['code'] !== 'SUCCESS') {
        // Handle duplicate contact
        if ($contactResult['data'][0]['code'] === 'DUPLICATE_DATA') {
            $duplicateId = $contactResult['data'][0]['details']['duplicate_record']['id'];
            logToConsole('[COURSE APPLICATION] Duplicate contact found', ['id' => $duplicateId]);

            // Use existing contact ID for Deal creation
            $contactId = $duplicateId;
        } else {
            throw new Exception('CRM Contact Error: ' . json_encode($contactResult));
        }
    } else {
        // Get newly created contact ID
        $contactId = $contactResult['data'][0]['details']['id'];
    }

    // Create Deal if we have contact ID and Deal fields
    if ($contactId && !empty($requestBody['Deal_Name'])) {
        try {
            // Prepare Deal data from request
            $dealData = [
                'Deal_Name' => $requestBody['Deal_Name'],
                'Contact_Name' => $contactId,
                'Course' => !empty($requestBody['Course_ID']) ? (int) $requestBody['Course_ID'] : ($requestBody['Course'] ?? $requestBody['courseName'] ?? ''),
                'Amount' => $requestBody['Amount'] ?? '0',
                'Pipeline' => $requestBody['Pipeline'] ?? 'Standard',
                'Stage' => $requestBody['Stage'] ?? 'Qualification',
                'Layout' => [
                    'id' => '1070637000001991066'
                ]
            ];

            // Create Deal in CRM
            $dealResult = createZohoCRMDeal($accessToken, $dealData);
            logToConsole('[COURSE APPLICATION] Zoho CRM Deal Response', $dealResult);

            if (isset($dealResult['data'][0]['code']) && $dealResult['data'][0]['code'] !== 'SUCCESS') {
                error_log('[COURSE APPLICATION] Deal creation failed: ' . json_encode($dealResult));
            }
        } catch (Exception $e) {
            error_log('[COURSE APPLICATION] Deal creation error: ' . $e->getMessage());
        }
    }

    // Success response
    sendResponse([
        'message' => 'Application submitted successfully',
        'zoho_contact' => $contactResult,
        'zoho_deal' => $dealResult
    ]);

} catch (Exception $e) {
    error_log('[COURSE APPLICATION] Error: ' . $e->getMessage());
    sendError($e->getMessage(), 500);
}

/**
 * Create Contact in Zoho CRM
 */
function createZohoCRMContact($accessToken, $contactData)
{
    $url = ZOHO_API_URL . '/crm/v8/Contacts/upsert';

    $payload = [
        'data' => [$contactData],
        'trigger' => ['approval', 'workflow', 'blueprint']
    ];

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Authorization: Zoho-oauthtoken ' . $accessToken,
        'Content-Type: application/json'
    ]);

    $response = curl_exec($ch);
    $data = json_decode($response, true);
    curl_close($ch);

    return $data;
}

/**
 * Create Deal in Zoho CRM
 * 
 * @param string $accessToken Zoho access token
 * @param array $dealData Deal data with fields: Deal_Name, Contact_Name, Amount, Pipeline, Stage
 * @return array CRM response
 */
function createZohoCRMDeal($accessToken, $dealData)
{
    $url = ZOHO_API_URL . '/crm/v8/Deals';

    $payload = [
        'data' => [$dealData],
        'trigger' => ['approval', 'workflow', 'blueprint'] // Trigger automation
    ];

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Authorization: Zoho-oauthtoken ' . $accessToken,
        'Content-Type: application/json'
    ]);

    $response = curl_exec($ch);
    $data = json_decode($response, true);
    curl_close($ch);

    return $data;
}

/**
 * Get Access Token using Refresh Token
 */
function getAccessToken()
{
    $url = ZOHO_ACCOUNTS_URL . '/oauth/v2/token';
    $postData = [
        'refresh_token' => ZOHO_CRM_REFRESH_TOKEN,
        'client_id' => ZOHO_CLIENT_ID,
        'client_secret' => ZOHO_CLIENT_SECRET,
        'grant_type' => 'refresh_token'
    ];

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($postData));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    $response = curl_exec($ch);
    $data = json_decode($response, true);
    curl_close($ch);

    if (isset($data['access_token'])) {
        return $data['access_token'];
    }

    throw new Exception('Failed to generate Access Token: ' . ($data['error'] ?? 'Unknown error'));
}

/**
 * Log to console (for debugging)
 */
function logToConsole($message, $data = null)
{
    if (ZOHO_DEBUG_MODE) {
        error_log($message . ($data ? ': ' . json_encode($data) : ''));
    }
}
