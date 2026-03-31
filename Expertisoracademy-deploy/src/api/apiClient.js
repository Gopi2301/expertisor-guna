// src/api/apiClient.js

import axios from "axios";
import toast from "react-hot-toast";

// --- 1. Dynamic API URL Configuration ---
// This line is crucial for switching between development and production environments.
// - In development (`npm run dev`), it uses the URL from your `.env` file (e.g., 'http://localhost:5999').
// - In production (`npm run build`), it uses the URL from your `.env.production` file (e.g., 'https://api.expertisoracademy.in').
const API_URL = import.meta.env.VITE_API_URL;

/**
 * Logs the user out by removing their credentials and reloading the page.
 * A hard redirect (`window.location.href`) is used to ensure all application state,
 * including component state, is completely cleared for a clean logout.
 */
export const logout = () => {
  // Remove the user's token information from browser storage.
  localStorage.removeItem("userInfo");
  // Redirect to the homepage.
  window.location.href = "/";
};

// --- 2. Axios Instance Creation ---
// We create a single, configured instance of Axios to be used throughout the application.
// Setting the `baseURL` here means we don't have to type the full URL for every API call.
const apiClient = axios.create({
  baseURL: API_URL,
});

// --- 3. Axios Request Interceptor ---
// Interceptors are functions that Axios calls for every request or response.
// This REQUEST interceptor modifies the outgoing request BEFORE it is sent.
apiClient.interceptors.request.use(
  (config) => {
    // This function runs for every single request made using `apiClient`.
    try {
      // Retrieve the stored user info (which contains our tokens).
      const userInfo = localStorage.getItem("userInfo");

      if (userInfo) {
        // Parse the JSON string back into an object.
        const { appToken } = JSON.parse(userInfo);

        // If an `appToken` exists, attach it to the request's Authorization header.
        // The "Bearer" scheme is the standard for sending JWTs.
        if (appToken) {
          config.headers["Authorization"] = `Bearer ${appToken}`;
        }
      }
    } catch (e) {
      // If parsing fails, log the error but don't block the request.
      console.error("Could not parse user info from localStorage", e);
    }
    // Return the modified config object for Axios to use.
    return config;
  },
  (error) => {
    // If an error occurs during the request setup, pass it along.
    return Promise.reject(error);
  },
);

// --- 4. Axios Response Interceptor ---
// This RESPONSE interceptor handles responses AFTER they are received from the server.
// It's the perfect place to centrally handle common errors, like authentication failures.
apiClient.interceptors.response.use(
  // The first function handles successful responses (status 2xx).
  // We don't need to do anything here, so we just return the response.
  (response) => response,

  // The second function handles error responses.
  (error) => {
    // Check if the error is a 401 Unauthorized response.
    const isAuthError = error.response && error.response.status === 401;
    // Also, ensure this was an authenticated request that failed, not a public one.
    const wasAuthenticatedRequest = error.config.headers["Authorization"];

    // This global flag prevents a race condition where multiple failed API calls
    // would all try to log the user out at the same time.
    if (isAuthError && wasAuthenticatedRequest && !window.isLoggingOut) {
      // Set the flag to true to indicate a logout is in progress.
      window.isLoggingOut = true;

      // Log out the user by removing their credentials.
      localStorage.removeItem("userInfo");

      // Show a user-friendly message explaining what happened.
      toast.error("Your session has expired. Please log in again.", {
        duration: 2000,
      });

      // After a short delay, redirect the user to the homepage.
      // The delay gives the user time to read the toast message.
      setTimeout(() => {
        window.location.href = "/";
        // Reset the flag after the redirect is complete.
        window.isLoggingOut = false;
      }, 2500);

      // We return an empty, non-resolving Promise to "swallow" the original error.
      // This prevents any `.catch()` blocks in the application code from also trying
      // to handle this error, since we've already handled it globally here.
      return new Promise(() => {});
    }

    // For any other type of error, we just pass it along for local handling.
    return Promise.reject(error);
  },
);

// --- 5. Export the Configured Client ---
// Export the `apiClient` instance as the default export.
// All other files in the app should import this instance to make API calls.
export default apiClient;
