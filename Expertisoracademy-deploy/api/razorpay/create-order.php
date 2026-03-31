<?php
/**
 * Create Razorpay Order
 * Endpoint to create a new order for payment collection
 */

require_once '../config.php';
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
    if (empty($requestBody['amount'])) {
        sendError('Amount is required', 400);
    }

    // Get Razorpay API instance
    $api = getRazorpayApi();

    // Prepare order data
    $orderData = [
        'receipt' => uniqid('order_'),
        'amount' => $requestBody['amount'] * 100, // Convert to paise
        'currency' => RAZORPAY_CURRENCY,
        'notes' => [
            'deal_id' => $requestBody['deal_id'] ?? '',
            'contact_id' => $requestBody['contact_id'] ?? '',
            'email' => $requestBody['email'] ?? '',
            'phone' => $requestBody['phone'] ?? ''
        ]
    ];

    // Create order
    $order = $api->order->create($orderData);

    // Return order details
    sendResponse([
        'order_id' => $order['id'],
        'amount' => $order['amount'],
        'currency' => $order['currency'],
        'key_id' => RAZORPAY_KEY_ID
    ]);

} catch (Exception $e) {
    error_log('[RAZORPAY] Order creation error: ' . $e->getMessage());
    sendError('Failed to create order: ' . $e->getMessage(), 500);
}
