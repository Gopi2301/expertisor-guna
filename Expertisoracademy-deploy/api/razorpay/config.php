<?php
/**
 * Razorpay Configuration
 * 
 * SETUP INSTRUCTIONS:
 * 1. Get your API keys from Razorpay Dashboard (https://dashboard.razorpay.com/app/keys)
 * 2. Update the credentials below
 * 3. Set webhook secret after configuring webhook in Razorpay Dashboard
 */

// Razorpay API Credentials
// For testing, use Test Mode keys. For production, use Live Mode keys.
define('RAZORPAY_KEY_ID', 'rzp_live_SC0VIhrXSxupb0');
define('RAZORPAY_KEY_SECRET', 'w15Ji4W8GKyoVAfFh2n7xSuM');
// Webhook Secret (get this from Razorpay Dashboard after creating webhook)
define('RAZORPAY_WEBHOOK_SECRET', 'ExpertisorSecureWebhook2026!');

// Environment detection
define('RAZORPAY_ENV', 'live'); // 'test' or 'live'

// Currency
define('RAZORPAY_CURRENCY', 'INR');

// Load Razorpay SDK
require_once __DIR__ . '/../vendor/autoload.php';

use Razorpay\Api\Api;

/**
 * Get Razorpay API instance
 */
function getRazorpayApi()
{
    return new Api(RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET);
}

/**
 * Verify Razorpay payment signature
 */
function verifyRazorpaySignature($orderId, $paymentId, $signature)
{
    $api = getRazorpayApi();

    try {
        $attributes = [
            'razorpay_order_id' => $orderId,
            'razorpay_payment_id' => $paymentId,
            'razorpay_signature' => $signature
        ];

        $api->utility->verifyPaymentSignature($attributes);
        return true;
    } catch (Exception $e) {
        error_log('[RAZORPAY] Signature verification failed: ' . $e->getMessage());
        return false;
    }
}

/**
 * Verify Razorpay webhook signature
 */
function verifyWebhookSignature($payload, $signature)
{
    $api = getRazorpayApi();

    try {
        $api->utility->verifyWebhookSignature($payload, $signature, RAZORPAY_WEBHOOK_SECRET);
        return true;
    } catch (Exception $e) {
        error_log('[RAZORPAY] Webhook signature verification failed: ' . $e->getMessage());
        return false;
    }
}
