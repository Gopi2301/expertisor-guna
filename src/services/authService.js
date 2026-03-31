import { jwtDecode } from "jwt-decode";

/**
 * Authentication Service
 * Handles all auth-related API calls and token management
 */

const SSO_BACKEND_URL = import.meta.env.VITE_SSO_URL;
console.log(SSO_BACKEND_URL);
const STORAGE_KEYS = {
  APP_TOKEN: "expertisor_app_token",
  GRAPHY_TOKEN: "expertisor_graphy_token",
  USER: "expertisor_user",
};

class AuthService {
  /**
   * Initiate Google OAuth login
   */
  initiateGoogleLogin() {
    window.location.href = `${SSO_BACKEND_URL}/auth/google`;
  }

  /**
   * Initiate GitHub OAuth login
   */
  initiateGitHubLogin() {
    window.location.href = `${SSO_BACKEND_URL}/auth/github`;
  }

  /**
   * Handle auth callback after OAuth redirect
   * Stores tokens and user info
   */
  handleAuthCallback(appToken, graphyToken) {
    try {
      // Decode and validate app token
      const decoded = jwtDecode(appToken);

      // Store tokens
      localStorage.setItem(STORAGE_KEYS.APP_TOKEN, appToken);
      localStorage.setItem(STORAGE_KEYS.GRAPHY_TOKEN, graphyToken);

      // Store user info
      const user = {
        email: decoded.email,
        name: decoded.name,
      };
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));

      return user;
    } catch (error) {
      console.error("Error handling auth callback:", error);
      throw new Error("Invalid token received");
    }
  }

  /**
   * Get current user from stored token
   */
  getCurrentUser() {
    try {
      const token = localStorage.getItem(STORAGE_KEYS.APP_TOKEN);
      if (!token) return null;

      // Decode token
      const decoded = jwtDecode(token);

      // Check if expired
      if (decoded.exp * 1000 < Date.now()) {
        this.logout();
        return null;
      }

      return {
        email: decoded.email,
        name: decoded.name,
      };
    } catch (error) {
      console.error("Error getting current user:", error);
      this.logout();
      return null;
    }
  }

  /**
   * Get app token for API requests
   */
  getAppToken() {
    return localStorage.getItem(STORAGE_KEYS.APP_TOKEN);
  }

  /**
   * Get Graphy SSO token
   */
  getGraphyToken() {
    return localStorage.getItem(STORAGE_KEYS.GRAPHY_TOKEN);
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated() {
    const token = this.getAppToken();
    if (!token) return false;

    try {
      const decoded = jwtDecode(token);
      return decoded.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  }

  /**
   * Logout user
   */
  logout() {
    localStorage.removeItem(STORAGE_KEYS.APP_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.GRAPHY_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
  }

  /**
   * Redirect to Graphy platform with SSO
   */
  redirectToGraphy() {
    const graphyToken = this.getGraphyToken();
    if (!graphyToken) {
      throw new Error("No Graphy SSO token found. Please login first.");
    }
    window.location.href = `https://satheshpc.graphy.com/auth/sso?token=${graphyToken}`;
  }
}

export default new AuthService();
