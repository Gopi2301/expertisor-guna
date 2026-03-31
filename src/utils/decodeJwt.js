// src/utils/decodeJwt.js

/**
 * Decodes the payload from a JSON Web Token (JWT) without verifying its signature.
 *
 * This is a client-side utility designed for reading the public claims (like user name,
 * email, roles, etc.) from a token that has ALREADY been validated by the server.
 *
 * ---
 * ❗ WARNING:
 * Do NOT use this function to trust a token's content on its own.
 * Signature verification MUST always be performed on the server using a secret key
 * to ensure the token has not been tampered with.
 * ---
 *
 * @param {string | null | undefined} token The JWT string to decode.
 * @returns {object | null} The decoded payload as a JavaScript object, or null if the token is invalid or decoding fails.
 */
export const decodeJwt = (token) => {
  // --- 1. Basic Validation ---
  // First, check if the token is a valid, non-empty string and looks like a JWT.
  // A JWT must have three parts separated by dots (Header.Payload.Signature).
  if (typeof token !== 'string' || !token || token.split('.').length < 3) {
    console.error("Invalid token provided: The token is not a string or is malformed.");
    return null;
  }

  try {
    // --- 2. Extract the Payload Part ---
    // A JWT consists of three parts separated by dots: Header.Payload.Signature
    // We are interested in the middle part, which is the payload containing the claims.
    const base64Url = token.split('.')[1];

    // --- 3. Convert from Base64Url to standard Base64 ---
    // The JWT specification uses Base64Url encoding to be safe for use in URLs.
    // It replaces '+' with '-' and '/' with '_'. The standard browser `atob()` function,
    // however, expects standard Base64. We must reverse these replacements.
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');

    // --- 4. Decode Base64 and Handle UTF-8 Characters Safely ---
    // The `atob()` function decodes the Base64 string into a raw binary string.
    // A simple `atob()` can corrupt multi-byte characters (like emojis or non-English letters).
    // The following multi-step process ensures proper UTF-8 decoding across all browsers:
    //  a. `atob(base64)` -> Decodes to a raw string, where multi-byte chars may be mangled.
    //  b. `.split('')` -> Converts the string into an array of its characters.
    //  c. `.map(c => ...)` -> Iterates over each character, gets its char code, converts it to a
    //     2-digit hex, and prepends a '%' to create a URI-encoded component (e.g., '€' becomes '%E2%82%AC').
    //  d. `.join('')` -> Joins the array back into a single URI-encoded string.
    //  e. `decodeURIComponent()` -> Correctly interprets the URI-encoded string, reconstructing the original UTF-8 string.
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );

    // --- 5. Parse the JSON Payload ---
    // The decoded string is in JSON format. We parse it to get a standard JavaScript object.
    return JSON.parse(jsonPayload);

  } catch (error) {
    // --- 6. Graceful Error Handling ---
    // If any step in the `try` block fails (e.g., the payload is not valid Base64,
    // or the decoded string is not valid JSON), we catch the error.
    // We log the error for debugging and return null to signal that the decoding failed.
    console.error("Failed to decode JWT:", error);
    return null;
  }
};