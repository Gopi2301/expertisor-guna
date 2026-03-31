<?php
/**
 * Shared Zoho CRM Functions
 */

require_once __DIR__ . '/config.php';

/**
 * Get Access Token using Refresh Token
 * 
 * @return string Access Token
 * @throws Exception If token generation fails
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
 * Search Contact in Zoho CRM by Email
 */
function searchZohoCRMContact($accessToken, $email)
{
    $url = ZOHO_API_URL . '/crm/v2/Contacts/search?email=' . urlencode($email);

    $ch = curl_init($url);
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
 * Search Deals in Zoho CRM by Contact ID and Deal Name
 */
function searchZohoCRMDeals($accessToken, $contactId, $dealName)
{
    // Search Criteria: (Contact_Name:equals:CONTACT_ID) and (Deal_Name:equals:DEAL_NAME)
    $criteria = "((Contact_Name:equals:" . $contactId . ")and(Deal_Name:equals:" . urlencode($dealName) . "))";
    $url = ZOHO_API_URL . '/crm/v2/Deals/search?criteria=' . $criteria;

    $ch = curl_init($url);
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
 * Update Deal in Zoho CRM
 */
function updateZohoCRMDeal($accessToken, $dealId, $dealData)
{
    $url = ZOHO_API_URL . '/crm/v2/Deals/' . $dealId;

    $payload = [
        'data' => [$dealData],
        'trigger' => ['approval', 'workflow', 'blueprint'] // Trigger automation
    ];

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "PUT"); // Use PUT for updates
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
