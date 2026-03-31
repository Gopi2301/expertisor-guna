# Plan: UTM Parameter Tracking and Forwarding (Revised)

This plan outlines the steps to capture, store, and forward UTM parameters from the URL to the specified Graphy endpoint.

## 1. Utility Functions for UTM Parameters

- **Location:** `src/utils/utmUtils.js`
- **Scalability:** The implementation is designed to be generic and future-proof. The `getUtmParams()` function automatically captures any URL parameter that begins with the `utm_` prefix (e.g., `utm_source`, `utm_campaign`, `utm_medium`, etc.). This means no code changes are required to support new marketing campaigns for courses, YouTube, or other sources in the future, as long as standard UTM naming conventions are used.
- **No Changes Needed:** The existing utility functions are sufficient.

## 2. Integrate UTM Tracking in the Main Application Component

- **Location:** `src/App.jsx`
- **No Changes Needed:** The existing `useEffect` hook already captures and stores any new UTM parameters on initial application load, replacing any previously stored values.

## 3. Identify and Modify "Join Now" CTAs

- **Objective:** Locate all "Join Now" and similar call-to-action buttons that should redirect to Graphy.
- **Action:**
  - Perform a global search for "Join Now" and other relevant CTA text to identify the components.
  - Create a reusable component or a custom hook to handle the redirection logic. This will prevent code duplication.
- **Redirection Logic:**
  - The component/hook will:
    - Retrieve the stored UTM parameters from `localStorage` using `getStoredUtmParams()`.
    - Construct the Graphy URL: `https://learn.expertisoracademy.in/utm`.
    - Append the stored UTM parameters to the URL using `appendUtmParamsToUrl()`.
    - Redirect the user to the final URL.

## 4. Testing

- **Manual Testing:**
  - Visit the site with various UTM parameters in the URL (e.g., `?utm_source=youtube&utm_campaign=new_course`).
  - Verify that the parameters are stored in `localStorage`.
  - Click on a "Join Now" CTA and verify that you are redirected to the correct Graphy URL with all the UTM parameters appended.