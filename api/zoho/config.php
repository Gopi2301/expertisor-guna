<?php
/**
 * Zoho Integration Configuration
 * Stores Zoho Forms and CRM API credentials
 */

// Zoho CRM Configuration
define('ZOHO_CRM_ENABLED', true);
define('ZOHO_CLIENT_ID', '1000.0WIJ6YLXQAL5SJDIJJSEVS9UVXDYQZ');
define('ZOHO_CLIENT_SECRET', '4099516a4050c48521ed8bdf07a310d4388d62deac');

// This needs to be generated once using the auth_helper.php script
define('ZOHO_CRM_REFRESH_TOKEN', '1000.50e9c9607ebeb48d24f1f3d2a284d75b.7b96f736c2179ab20b7eee39ab383f38'); 

// API Endpoints (India Data Center)
define('ZOHO_ACCOUNTS_URL', 'https://accounts.zoho.in');
define('ZOHO_API_URL', 'https://www.zohoapis.in');

// Field Mapping Configuration
define('ZOHO_LEAD_SOURCE', 'Website Form');
define('ZOHO_DEFAULT_COUNTRY', 'India');

// Logging Configuration
define('ZOHO_DEBUG_MODE', true);
