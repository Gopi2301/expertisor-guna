/**
 * Authentication Service
 * Handles login, logout, and token management
 */

const TOKEN_KEY = 'cms_auth_token';
const USER_KEY = 'cms_user';

const envUrl = (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '');
const API_BASE = envUrl
    ? (envUrl.endsWith('/api') ? envUrl : `${envUrl}/api`)
    : '/api';

/**
 * Login with username and password
 */
export const login = async (username, password) => {
    try {
        const response = await fetch(`${API_BASE}/auth.php?action=login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (!data.success) {
            throw new Error(data.error || 'Login failed');
        }

        // Store token and user info
        localStorage.setItem(TOKEN_KEY, data.data.token);
        localStorage.setItem(USER_KEY, JSON.stringify(data.data.user));

        return data.data;
    } catch (error) {
        throw new Error(error.message || 'Login failed');
    }
};

/**
 * Logout and clear stored credentials
 */
export const logout = async () => {
    try {
        const token = getAuthToken();

        if (token) {
            await fetch(`${API_BASE}/auth.php?action=logout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
        }
    } catch (error) {
        console.error('Logout error:', error);
    } finally {
        // Always clear local storage
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
    }
};

/**
 * Verify if current token is valid
 */
export const verifyToken = async () => {
    try {
        const token = getAuthToken();

        if (!token) {
            return false;
        }

        const response = await fetch(`${API_BASE}/auth.php?action=verify`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();

        if (!data.success) {
            // Token is invalid, clear storage
            localStorage.removeItem(TOKEN_KEY);
            localStorage.removeItem(USER_KEY);
            return false;
        }

        return true;
    } catch (error) {
        console.error('Token verification error:', error);
        return false;
    }
};

/**
 * Get stored auth token
 */
export const getAuthToken = () => {
    return localStorage.getItem(TOKEN_KEY);
};

/**
 * Get stored user info
 */
export const getCurrentUser = () => {
    const userStr = localStorage.getItem(USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = () => {
    return !!getAuthToken();
};

/**
 * Add auth header to fetch requests
 */
export const getAuthHeaders = () => {
    const token = getAuthToken();
    return token ? { 'Authorization': `Bearer ${token}` } : {};
};

export default {
    login,
    logout,
    verifyToken,
    getAuthToken,
    getCurrentUser,
    isAuthenticated,
    getAuthHeaders,
};
