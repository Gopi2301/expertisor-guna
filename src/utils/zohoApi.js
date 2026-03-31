/**
 * Zoho CRM API Wrapper
 * 
 * Provides a dev guard to prevent test submissions from polluting 
 * the production CRM when running on localhost.
 */

export const submitToZoho = async (endpoint, payload) => {
    // Check if we are running locally
    const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

    if (isLocalhost) {
        console.warn(`🚧 [DEV GUARD] Intercepted Zoho request to ${endpoint}`);
        console.log("📦 Payload:", payload);

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 800));

        // Return a mocked successful response
        return {
            success: true,
            message: "Mocked success (Dev Mode)",
            mocked: true,
            data: {
                zoho_deal: { data: [{ details: { id: "mock_deal_" + Date.now() } }] },
                zoho_contact: { data: [{ details: { id: "mock_contact_" + Date.now() } }] }
            }
        };
    }

    // Production: make the actual API call
    const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
        throw new Error(result.error || 'Submission failed');
    }

    return result;
};
