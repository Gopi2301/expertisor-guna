<?php
// api/zoho/auth_helper.php
require_once 'config.php';

// Check if we have a code to exchange
if (isset($_GET['code'])) {
    $code = $_GET['code'];

    // Exchange code for tokens
    $url = ZOHO_ACCOUNTS_URL . '/oauth/v2/token';
    $postData = [
        'grant_type' => 'authorization_code',
        'client_id' => ZOHO_CLIENT_ID,
        'client_secret' => ZOHO_CLIENT_SECRET,
        'redirect_uri' => 'https://expertisoracademy.in/oauth/callback', // Must match Console
        'code' => $code
    ];

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($postData));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    $response = curl_exec($ch);
    $data = json_decode($response, true);
    curl_close($ch);

    if (isset($data['refresh_token'])) {
        echo "<h1>Success!</h1>";
        echo "<p>Your Refresh Token is:</p>";
        echo "<pre style='background: #f0f0f0; padding: 10px; font-size: 1.2em;'>" . $data['refresh_token'] . "</pre>";
        echo "<p>Please copy this token and update the <code>ZOHO_CRM_REFRESH_TOKEN</code> in <code>api/zoho/config.php</code>.</p>";
    } else {
        echo "<h1>Error</h1>";
        echo "<pre>" . print_r($data, true) . "</pre>";
    }
} else {
    // Show authorization link
    $scope = 'ZohoCRM.modules.ALL'; // Or specific scopes like ZohoCRM.modules.leads.CREATE
    $redirect_uri = 'https://expertisoracademy.in/oauth/callback';

    // Note: The prompt showed a specific redirect URI in the screenshot: https://expertisoracademy.in/oauth/callback
    // Access Type must be 'offline' to get a refresh token
    $authUrl = ZOHO_ACCOUNTS_URL . "/oauth/v2/auth?scope=$scope&client_id=" . ZOHO_CLIENT_ID . "&response_type=code&access_type=offline&redirect_uri=$redirect_uri";

    echo "<h1>Zoho CRM OAuth Helper</h1>";
    echo "<p>Click the button below to authorize the app and generate a Refresh Token.</p>";
    echo "<a href='$authUrl' style='display: inline-block; padding: 10px 20px; background: #007bff; color: white; text-decoration: none; border-radius: 5px;'>Authorize with Zoho</a>";
    echo "<p><small>Make sure you are logged into the correct Zoho account.</small></p>";
}
