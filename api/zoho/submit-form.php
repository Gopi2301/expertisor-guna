<?php
/**
 * Zoho CRM Submission API
 * Handles all CMS form submissions and creates Leads in Zoho CRM
 */

require_once '../config.php';
require_once './config.php';
require_once './functions.php';

// Enable error logging but disable display for JSON response safety
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit(0);
}

// header('Access-Control-Allow-Origin: *'); // Handled in config.php
// header('Content-Type: application/json'); // Handled in config.php

/**
 * Main form submission handler
 */
function submitToZoho()
{
    // Parse JSON input
    $json = file_get_contents('php://input');
    $requestBody = json_decode($json, true);

    if (!$requestBody) {
        // Fallback for form-encoded data if needed
        $requestBody = $_POST;
    }

    logToConsole('Form Submission Request', $requestBody);

    // Validate required fields
    $validation = validateFormData($requestBody);
    if (!$validation['valid']) {
        sendError(implode(', ', $validation['errors']), 400);
        return;
    }

    $contactResult = null;
    $dealResult = null;
    $error = null;

    if (ZOHO_CRM_ENABLED) {
        try {
            // Get Access Token
            $accessToken = getAccessToken();

            // Map data to CRM Contact format
            $contactData = mapFieldsToZohoCRMContact($requestBody);

            // Create Contact in CRM
            $contactResult = createZohoCRMContact($accessToken, $contactData);
            logToConsole('Zoho CRM Contact Response', $contactResult);
            $contactId = null;

            // Check success
            if (isset($contactResult['data'][0]['status']) && $contactResult['data'][0]['status'] === 'success') {
                $contactId = $contactResult['data'][0]['details']['id'];
            }
            // Check duplicate error
            else if (
                (isset($contactResult['data'][0]['code']) && $contactResult['data'][0]['code'] === 'DUPLICATE_DATA') ||
                (isset($contactResult['data'][0]['status']) && $contactResult['data'][0]['status'] === 'error')
            ) {
                logToConsole('Zoho CRM Contact Duplicate', 'Attempting to resolve existing contact...');

                // Try to get ID from error details first
                if (isset($contactResult['data'][0]['details']['id'])) {
                    $contactId = $contactResult['data'][0]['details']['id'];
                    logToConsole('Zoho CRM Contact Duplicate', 'Found ID in error details: ' . $contactId);
                } else {
                    logToConsole('Zoho CRM Contact Duplicate', 'Searching for existing contact...');
                    $searchResult = searchZohoCRMContact($accessToken, $contactData['Email']);
                    if (isset($searchResult['data'][0]['id'])) {
                        $contactId = $searchResult['data'][0]['id'];
                    } else {
                        throw new Exception('CRM Contact Exists but Search Failed: ' . json_encode($searchResult));
                    }
                }
            } else if (isset($contactResult['code']) && $contactResult['code'] !== 'SUCCESS') {
                // Top level error
                throw new Exception('CRM Contact Error: ' . json_encode($contactResult));
            } else {
                // Other error (fallback)
                if (!isset($contactResult['data'][0]['status']))
                    throw new Exception('CRM Contact Error (Data): ' . json_encode($contactResult));
            }

            // If we have a contact ID, handle Deal
            if ($contactId) {
                $dealName = $requestBody['Deal_Name'];

                // Search for existing deal for this contact with the same name
                $existingDealId = null;
                try {
                    $searchResult = searchZohoCRMDeals($accessToken, $contactId, $dealName);
                    if (isset($searchResult['data'][0]['id'])) {
                        $existingDealId = $searchResult['data'][0]['id'];
                        logToConsole('Zoho CRM Deal Duplicate', "Found existing deal ID: $existingDealId");
                    }
                } catch (Exception $e) {
                    logToConsole('Zoho CRM Deal Search Error', $e->getMessage());
                }

                if ($existingDealId) {
                    // Update existing deal
                    $dealData = [
                        'Amount' => $requestBody['Amount'] ?? 0,
                        'Stage' => $requestBody['Stage'] ?? 'Qualification',
                        // 'Pipeline' => $requestBody['Pipeline'] // We rely on what's passed or existing
                    ];

                    logToConsole('Zoho CRM Deal Update', "Updating deal ID: $existingDealId");
                    $dealResult = updateZohoCRMDeal($accessToken, $existingDealId, $dealData);
                } else {
                    // Create new deal

                    // Determine Layout based on Pipeline
                    // Default to Passive Income Layout (1070637000001991066)
                    $layoutId = '1070637000001991066';

                    // If it is the Webinar pipeline, use the Webinar Layout (1070637000001855053)
                    if (isset($requestBody['Pipeline']) && $requestBody['Pipeline'] === 'SSR-Webinar') {
                        $layoutId = '1070637000001855053';
                    }

                    $defaultDealName = ($contactData['Last_Name'] ?? 'Unknown') . ' - ' . ($requestBody['courseName'] ?? 'Inquiry');

                    $dealData = [
                        'Deal_Name' => $requestBody['Deal_Name'] ?? $defaultDealName,
                        'Contact_Name' => $contactId,
                        'Course' => !empty($requestBody['Course_ID']) ? (int) $requestBody['Course_ID'] : ($requestBody['Course'] ?? $requestBody['courseName'] ?? ''),
                        'Amount' => $requestBody['Amount'] ?? 0,
                        'Stage' => $requestBody['Stage'] ?? 'Lead Captured',
                        'Layout' => [
                            'id' => $layoutId
                        ]
                    ];

                    // Only add Pipeline if it's set in the request (backend shouldn't guess if frontend sends it)
                    // If frontend sends "Course-Pipeline", we send it. If "SSR-Webinar", we send it.
                    if (!empty($requestBody['Pipeline'])) {
                        $dealData['Pipeline'] = $requestBody['Pipeline'];
                    } else {
                        // Fallback if not provided (shouldn't happen with updated frontend)
                        $dealData['Pipeline'] = 'Course-Pipeline';
                    }

                    logToConsole('Zoho CRM Deal Create', "Creating new deal with data: " . json_encode($dealData));
                    $dealResult = createZohoCRMDeal($accessToken, $dealData);
                }

                logToConsole('Zoho CRM Deal Response', $dealResult);

                if (!isset($dealResult['data'][0]['status']) || $dealResult['data'][0]['status'] !== 'success') {
                    throw new Exception('CRM Deal Error: ' . json_encode($dealResult));
                }
            }
        } catch (Exception $e) {
            $error = $e->getMessage();
            logToConsole('Zoho CRM Error', ['error' => $error]);
        }
    }

    // Determine final status
    $success = empty($error);

    // Send response
    if ($error && !$success) {
        sendError($error, 500);
    } else {
        sendResponse([
            'message' => 'Form submitted successfully',
            'zoho_contact' => $contactResult,
            'zoho_deal' => $dealResult
        ]);
    }
}

/**
 * Validate form data
 */
function validateFormData($data)
{
    $errors = [];

    if (empty($data['name']))
        $errors[] = 'Name is required';
    if (empty($data['email']))
        $errors[] = 'Email is required';
    if (empty($data['phone']))
        $errors[] = 'Phone is required';

    return [
        'valid' => empty($errors),
        'errors' => $errors
    ];
}



/**
 * Map CMS form fields to Zoho CRM Lead fields
 */
function mapFieldsToZohoCRM($data)
{
    // Split Name into First/Last if possible, otherwise use Last Name (mandatory)
    $nameParts = explode(' ', trim($data['name']), 2);
    $lastName = $data['name']; // Default whole name to last name
    $firstName = '';

    if (count($nameParts) > 1) {
        $firstName = $nameParts[0];
        $lastName = $nameParts[1];
    }

    // Phone formatting
    $phone = $data['phone'];

    // Build description from extra fields
    $description = [];
    if (!empty($data['education']))
        $description[] = "Education: " . $data['education'];
    if (!empty($data['qualification']))
        $description[] = "Qualification: " . $data['qualification'];
    if (!empty($data['profile']))
        $description[] = "Profile: " . $data['profile'];
    if (!empty($data['question']))
        $description[] = "Question: " . $data['question'];
    if (!empty($data['courseName']))
        $description[] = "Interest: " . $data['courseName'];

    return [
        'Last_Name' => $lastName,
        'First_Name' => $firstName,
        'Email' => $data['email'],
        'Mobile' => $phone,
        'Lead_Source' => ZOHO_LEAD_SOURCE,
        'Description' => implode("\n", $description),
        'Company' => 'N/A' // Mandatory field usually, can be 'Individual' or Name
    ];
}

/**
 * Map CMS form fields to Zoho CRM Contact fields
 */
function mapFieldsToZohoCRMContact($data)
{
    // Split Name into First/Last if possible, otherwise use Last Name (mandatory)
    $nameParts = explode(' ', trim($data['name'] ?? ''), 2);
    $lastName = $data['name'] ?? ''; // Default whole name to last name
    $firstName = '';

    if (count($nameParts) > 1) {
        $firstName = $nameParts[0];
        $lastName = $nameParts[1];
    }

    // Phone formatting
    $phone = $data['phone'] ?? '';

    return [
        'Last_Name' => $lastName,
        'Mobile' => $phone,
        'Phone' => $phone,
        'Email' => $data['email'] ?? '',
        'st_touch_course' => $data['st_touch_course'] ?? '',
        'current_course' => $data['current_course'] ?? '',
        'url_depend_course_name_hidden_filed' => $data['url_depend_course_name_hidden_filed'] ?? ''
    ];
}

/**
 * Create Lead in Zoho CRM
 */
function createZohoCRMLead($accessToken, $leadData)
{
    $url = ZOHO_API_URL . '/crm/v2/Leads';

    $payload = [
        'data' => [$leadData],
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
 * Create Contact in Zoho CRM
 */
function createZohoCRMContact($accessToken, $contactData)
{
    $url = ZOHO_API_URL . '/crm/v2/Contacts';

    $payload = [
        'data' => [$contactData],
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
 * Create Deal in Zoho CRM
 * 
 * @param string $accessToken Zoho access token
 * @param array $dealData Deal data with fields: Deal_Name, Contact_Name, Amount, Pipeline, Stage
 * @return array CRM response
 */
function createZohoCRMDeal($accessToken, $dealData)
{
    $url = ZOHO_API_URL . '/crm/v2/Deals';

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

function logToConsole($label, $data)
{
    if (!ZOHO_DEBUG_MODE)
        return;
    error_log('[ZOHO CRM] ' . $label . ': ' . json_encode($data));
}

try {
    submitToZoho();
} catch (Exception $e) {
    sendError($e->getMessage(), 500);
}
