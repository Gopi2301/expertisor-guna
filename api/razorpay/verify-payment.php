<?php
/**
 * Verify Razorpay Payment
 * Validates payment signature and updates Zoho Deal stage
 */

require_once '../config.php';
require_once '../zoho/config.php';
require_once '../zoho/functions.php';
require_once './config.php';

// CORS Handled in config.php

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit(0);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendError('Method not allowed', 405);
}

try {
    // Get request body
    $requestBody = getRequestBody();

    // Validate required fields
    $required = ['razorpay_order_id', 'razorpay_payment_id', 'razorpay_signature'];
    foreach ($required as $field) {
        if (empty($requestBody[$field])) {
            sendError("$field is required", 400);
        }
    }

    // Verify payment signature
    $isValid = verifyRazorpaySignature(
        $requestBody['razorpay_order_id'],
        $requestBody['razorpay_payment_id'],
        $requestBody['razorpay_signature']
    );

    if (!$isValid) {
        sendError('Invalid payment signature', 400);
    }

    // Get payment details
    $api = getRazorpayApi();
    $payment = $api->payment->fetch($requestBody['razorpay_payment_id']);

    // Update Zoho Deal stage if deal_id provided
    if (!empty($requestBody['deal_id']) && ZOHO_CRM_ENABLED) {
        try {
            $accessToken = getAccessToken();
            $dealId = $requestBody['deal_id'];

            // Update Deal stage to "Payment Completed"
            $dealUpdateData = [
                'Stage' => 'Payment Completed',
                'Amount' => $payment['amount'] / 100 // Convert paise to rupees
            ];

            $result = updateZohoDealStage($accessToken, $dealId, $dealUpdateData);

            if (!$result) {
                error_log('[RAZORPAY] Failed to update Deal stage in Zoho');
            }
        } catch (Exception $e) {
            error_log('[RAZORPAY] Zoho update error: ' . $e->getMessage());
        }
    }

    // Return success
    sendResponse([
        'success' => true,
        'payment_id' => $payment['id'],
        'order_id' => $payment['order_id'],
        'amount' => $payment['amount'] / 100,
        'status' => $payment['status']
    ]);

} catch (Exception $e) {
    error_log('[RAZORPAY] Payment verification error: ' . $e->getMessage());
    sendError('Payment verification failed: ' . $e->getMessage(), 500);
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

    return isset($data['data'][0]['status']) && $data['data'][0]['status'] === 'success';
}
