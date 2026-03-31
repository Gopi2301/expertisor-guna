<?php
/**
 * Razorpay Webhook Handler
 * Receives and processes payment status updates from Razorpay
 */

require_once '../config.php';
require_once '../zoho/config.php';
require_once '../zoho/functions.php';
require_once './config.php';

// Enable error logging
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

try {
    // Get webhook payload
    $payload = file_get_contents('php://input');
    $webhookSignature = $_SERVER['HTTP_X_RAZORPAY_SIGNATURE'] ?? '';

    if (empty($webhookSignature)) {
        http_response_code(400);
        echo json_encode(['error' => 'Missing signature']);
        exit;
    }

    // Verify webhook signature
    $isValid = verifyWebhookSignature($payload, $webhookSignature);

    if (!$isValid) {
        error_log('[RAZORPAY WEBHOOK] Invalid signature');
        http_response_code(400);
        echo json_encode(['error' => 'Invalid signature']);
        exit;
    }

    // Parse webhook data
    $data = json_decode($payload, true);

    if (!$data || !isset($data['event'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid payload']);
        exit;
    }

    $event = $data['event'];
    $payment = $data['payload']['payment']['entity'] ?? null;

    error_log('[RAZORPAY WEBHOOK] Received event: ' . $event);

    // Process different events
    switch ($event) {
        case 'payment.captured':
            handlePaymentCaptured($payment);
            break;

        case 'payment.failed':
            handlePaymentFailed($payment);
            break;

        case 'payment.authorized':
            // Payment authorized but not captured yet
            error_log('[RAZORPAY WEBHOOK] Payment authorized: ' . $payment['id']);
            break;

        default:
            error_log('[RAZORPAY WEBHOOK] Unhandled event: ' . $event);
    }

    // Return success
    http_response_code(200);
    echo json_encode(['success' => true]);

} catch (Exception $e) {
    error_log('[RAZORPAY WEBHOOK] Error: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode(['error' => 'Internal server error']);
}

/**
 * Handle payment.captured event
 */
function handlePaymentCaptured($payment)
{
    if (!$payment) {
        return;
    }

    error_log('[RAZORPAY WEBHOOK] Payment captured: ' . $payment['id']);

    // Get deal_id from notes
    $dealId = $payment['notes']['deal_id'] ?? null;

    if (!$dealId || !ZOHO_CRM_ENABLED) {
        error_log('[RAZORPAY WEBHOOK] No deal_id in notes or Zoho disabled');
        return;
    }

    try {
        $accessToken = getAccessToken();

        // Update Deal stage
        $dealUpdateData = [
            'Stage' => 'Success',
            'Amount' => $payment['amount'] / 100, // Convert paise to rupees
            'Description' => 'Payment captured via Razorpay. Payment ID: ' . $payment['id']
        ];

        $result = updateZohoDealStage($accessToken, $dealId, $dealUpdateData);

        if ($result) {
            error_log('[RAZORPAY WEBHOOK] Deal updated successfully: ' . $dealId);
        } else {
            error_log('[RAZORPAY WEBHOOK] Failed to update Deal: ' . $dealId);
        }
    } catch (Exception $e) {
        error_log('[RAZORPAY WEBHOOK] Zoho update error: ' . $e->getMessage());
    }
}

/**
 * Handle payment.failed event
 */
function handlePaymentFailed($payment)
{
    if (!$payment) {
        return;
    }

    error_log('[RAZORPAY WEBHOOK] Payment failed: ' . $payment['id']);

    // Get deal_id from notes
    $dealId = $payment['notes']['deal_id'] ?? null;

    if (!$dealId || !ZOHO_CRM_ENABLED) {
        return;
    }

    try {
        $accessToken = getAccessToken();

        // Update Deal stage to Payment Failed
        $dealUpdateData = [
            'Stage' => 'Failed',
            'Description' => 'Payment failed. Reason: ' . ($payment['error_description'] ?? 'Unknown')
        ];

        $result = updateZohoDealStage($accessToken, $dealId, $dealUpdateData);

        if ($result) {
            error_log('[RAZORPAY WEBHOOK] Deal updated to Payment Failed: ' . $dealId);
        }
    } catch (Exception $e) {
        error_log('[RAZORPAY WEBHOOK] Zoho update error: ' . $e->getMessage());
    }
}

/**
 * Update Zoho Deal Stage
 */
function updateZohoDealStage($accessToken, $dealId, $dealData)
{
    $url = ZOHO_API_URL . '/crm/v8/Deals/' . $dealId;

    $payload = [
        'data' => [$dealData]
    ];

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'PUT');
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Authorization: Zoho-oauthtoken ' . $accessToken,
        'Content-Type: application/json'
    ]);

    $response = curl_exec($ch);
    $data = json_decode($response, true);
    curl_close($ch);

    error_log('[RAZORPAY WEBHOOK] Zoho response: ' . json_encode($data));

    return isset($data['data'][0]['status']) && $data['data'][0]['status'] === 'success';
}

