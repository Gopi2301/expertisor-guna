// src/utils/utmUtils.js

/**
 * Parses the current URL's query string to extract UTM parameters.
 * @returns {object} An object containing the UTM parameters.
 */
export const getUtmParams = () => {
  const params = new URLSearchParams(window.location.search);
  const utmParams = {};
  for (const [key, value] of params.entries()) {
    if (key.startsWith('utm_')) {
      utmParams[key] = value;
    }
  }
  return utmParams;
};

/**
 * Stores the UTM parameters in localStorage.
 * @param {object} utmParams - An object containing the UTM parameters.
 */
export const storeUtmParams = (utmParams) => {
  try {
    localStorage.setItem('utmParams', JSON.stringify(utmParams));
  } catch (error) {
    console.error('Error storing UTM parameters in localStorage:', error);
  }
};

/**
 * Retrieves the UTM parameters from localStorage.
 * @returns {object|null} An object containing the UTM parameters, or null if not found.
 */
export const getStoredUtmParams = () => {
  try {
    const storedParams = localStorage.getItem('utmParams');
    return storedParams ? JSON.parse(storedParams) : null;
  } catch (error) {
    console.error('Error retrieving UTM parameters from localStorage:', error);
    return null;
  }
};

/**
 * Appends UTM parameters to a given URL.
 * @param {string} url - The URL to append the parameters to.
 * @param {object} utmParams - An object containing the UTM parameters.
 * @returns {string} The URL with the appended UTM parameters.
 */
export const appendUtmParamsToUrl = (url, utmParams) => {
  if (!utmParams || Object.keys(utmParams).length === 0) {
    return url;
  }

  const newUrl = new URL(url);
  const params = new URLSearchParams(newUrl.search);

  for (const [key, value] of Object.entries(utmParams)) {
    params.set(key, value);
  }

  newUrl.search = params.toString();
  return newUrl.toString();
};