// =============================================================================
// == server.js - Final Production Version                                  ==
// =============================================================================

const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });


const express = require("express");
const cors = require("cors");
const axios = require("axios");
const querystring = require("querystring");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const authMiddleware = require("./authMiddleware");

// --- Global Error Handlers for Stability ---
process.on("unhandledRejection", (reason, promise) => {
  console.error("--- UNHANDLED REJECTION ---", reason.stack || reason);
});
process.on("uncaughtException", (err) => {
  console.error("--- UNCAUGHT EXCEPTION ---", err.stack);
  process.exit(1);
});

const app = express();
const PORT = 5999;

// --- Hardcoded Production Configuration ---
// --- Configuration from Environment Variables ---
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";
const API_URL = process.env.API_URL || "http://localhost:8000/api";
const APP_JWT_SECRET = process.env.APP_JWT_SECRET || "fb3e769c95c44e7e8a1be8e0847d814d9bdfc31f91d58d7588ae37e0ce2ef5b7";
const GRAPHY_API_TOKEN = process.env.GRAPHY_API_TOKEN || "25cc16a6-5c73-4b41-a957-d9959e89b199";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

// Redirect URIs - typically constructed from the API_URL or a specific public URL
// If running behind Nginx on the same domain, these should be relative to the domain.
// But mostly these need to match exactly what is registered in Google/GitHub Console.
// We'll trust the env var or construct it.
const GOOGLE_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI || `${process.env.PUBLIC_URL || "http://localhost:5999"}/auth/google/callback`;
const GITHUB_REDIRECT_URI = process.env.GITHUB_REDIRECT_URI || `${process.env.PUBLIC_URL || "http://localhost:5999"}/auth/github/callback`;

console.log("--- SERVER STARTING IN PRODUCTION MODE ---");
console.log(`[CONFIG] API URL: ${API_URL}`);
console.log(`[CONFIG] Client URL: ${CLIENT_URL}`);
console.log(`[CONFIG] Google Redirect URI: ${GOOGLE_REDIRECT_URI}`);
// --- ADDED THIS LINE FOR DEBUGGING ---
console.log(`[TIME_CHECK] Server UTC Time is: ${new Date().toUTCString()}`);
console.log(`[DEBUG] GOOGLE_CLIENT_ID Loaded: ${process.env.GOOGLE_CLIENT_ID ? "YES" : "NO"}`);
console.log(`[DEBUG] GITHUB_CLIENT_ID Loaded: ${process.env.GITHUB_CLIENT_ID ? "YES" : "NO"}`);
console.log("------------------------------------------");

// --- Middleware Setup ---
const allowedOrigins = [CLIENT_URL];
app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json());

// --- Services ---
const jwtService = {
  generateToken: (email, name) =>
    jwt.sign({ email, name: name || email.split("@")[0] }, APP_JWT_SECRET, {
      expiresIn: "180d",
    }),
};

const graphySsoService = {
  generateToken(email, name) {
    const payload = {
      email,
      name: name || email.split("@")[0],
      exp: Math.floor(Date.now() / 1000) + 3600,
    };
    const header = { alg: "HS256", typ: "JWT" };
    const encodedHeader = Buffer.from(JSON.stringify(header)).toString(
      "base64url",
    );
    const encodedPayload = Buffer.from(JSON.stringify(payload)).toString(
      "base64url",
    );
    const signatureInput = `${encodedHeader}.${encodedPayload}`;
    const signature = crypto
      .createHmac("sha256", GRAPHY_API_TOKEN)
      .update(signatureInput)
      .digest("base64url");
    return `${signatureInput}.${signature}`;
  },
};

// --- Authentication Controller ---
const authController = {
  redirectToGoogle: (req, res) => {
    console.log(`${GOOGLE_REDIRECT_URI} Redirecting user to Google. Client ${CLIENT_URL}`);
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=code&scope=profile%20email`;
    console.log(`[AUTH_GOOGLE] Redirecting user to Google.`);
    res.redirect(authUrl);
  },

  redirectToGitHub: (req, res) => {
    const authUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${GITHUB_REDIRECT_URI}&scope=user:email`;
    console.log(`[AUTH_GITHUB] Redirecting user to GitHub.`);
    res.redirect(authUrl);
  },

  handleGoogleCallback: async (req, res) => {
    const { code } = req.query;
    console.log("[AUTH_GOOGLE] Callback received.");

    if (!code) {
      console.error("[FAIL] Google callback contained no code.");
      return res.redirect(`${CLIENT_URL}/?error=auth_failed_no_code`);
    }

    try {
      console.log("[AUTH_GOOGLE] Step 1: Exchanging code for token...");
      const requestBody = {
        code,
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        redirect_uri: GOOGLE_REDIRECT_URI,
        grant_type: "authorization_code",
      };

      const tokenResponse = await axios.post(
        "https://oauth2.googleapis.com/token",
        querystring.stringify(requestBody),
      );
      const { access_token } = tokenResponse.data;
      console.log("[AUTH_GOOGLE] Step 1 Success: Token received.");

      console.log("[AUTH_GOOGLE] Step 2: Fetching user info...");
      const userInfoResponse = await axios.get(
        "https://www.googleapis.com/oauth2/v2/userinfo",
        { headers: { Authorization: `Bearer ${access_token}` } },
      );
      const { email, name } = userInfoResponse.data;
      console.log(`[AUTH_GOOGLE] Step 2 Success: Got user info for ${email}.`);

      console.log("[AUTH_GOOGLE] Step 3: Generating tokens...");
      const appToken = jwtService.generateToken(email, name);
      const graphyToken = graphySsoService.generateToken(email, name);
      console.log("[AUTH_GOOGLE] Step 3 Success: Tokens generated.");
      console.log(`Redirecting to ${CLIENT_URL}/auth/success?appToken=${appToken}&graphyToken=${graphyToken}`);
      res.redirect(
        `${CLIENT_URL}/auth/success?appToken=${appToken}&graphyToken=${graphyToken}`,
      );
    } catch (err) {
      console.error("--- [FATAL] GOOGLE CALLBACK FAILED ---");
      if (err.response) {
        console.error("Error Status:", err.response.status);
        console.error("Error Data:", err.response.data);
      } else {
        console.error("Error Message:", err.message);
      }
      console.error("------------------------------------");
      res.redirect(`${CLIENT_URL}/?error=auth_failed`);
    }
  },

  handleGitHubCallback: async (req, res) => {
    const { code } = req.query;
    console.log("[AUTH_GITHUB] Callback received.");

    if (!code) {
      console.error("[FAIL] GitHub callback contained no code.");
      return res.redirect(`${CLIENT_URL}/?error=auth_failed_no_code`);
    }
    try {
      const requestBody = {
        client_id: GITHUB_CLIENT_ID,
        client_secret: GITHUB_CLIENT_SECRET,
        code,
      };
      const tokenResponse = await axios.post(
        "https://github.com/login/oauth/access_token",
        requestBody,
        { headers: { Accept: "application/json" } },
      );
      const { access_token } = tokenResponse.data;
      if (!access_token)
        throw new Error("GitHub response did not contain access_token.");

      const userInfoResponse = await axios.get("https://api.github.com/user", {
        headers: { Authorization: `token ${access_token}` },
      });
      let email = userInfoResponse.data.email;
      const name = userInfoResponse.data.name || userInfoResponse.data.login;

      if (!email) {
        const emailsResponse = await axios.get(
          "https://api.github.com/user/emails",
          { headers: { Authorization: `token ${access_token}` } },
        );
        const primaryEmail = emailsResponse.data.find(
          (e) => e.primary && e.verified,
        );
        if (!primaryEmail)
          throw new Error("Could not find a primary verified GitHub email.");
        email = primaryEmail.email;
      }

      const appToken = jwtService.generateToken(email, name);
      const graphyToken = graphySsoService.generateToken(email, name);
      res.redirect(
        `${CLIENT_URL}/auth/success?appToken=${appToken}&graphyToken=${graphyToken}`,
      );
    } catch (err) {
      console.error("--- [FATAL] GITHUB CALLBACK FAILED ---");
      console.error(err.response?.data || err.message);
      res.redirect(`${CLIENT_URL}/?error=auth_failed`);
    }
  },

  checkMe: (req, res) => {
    res.status(200).json({ user: req.user });
  },
};

// --- API Routes ---
app.get("/auth/google", authController.redirectToGoogle);
app.get("/auth/google/callback", authController.handleGoogleCallback);
app.get("/auth/github", authController.redirectToGitHub);
app.get("/auth/github/callback", authController.handleGitHubCallback);
app.get("/api/me", authMiddleware, authController.checkMe);
app.get("/", (req, res) =>
  res.send("✅ Expertisor Social Login Backend is Live!"),
);

// --- Server Start ---
app.listen(PORT, () => {
  console.log(
    `✅✅✅ Backend server started successfully on port ${PORT} ✅✅✅`,
  );
});
