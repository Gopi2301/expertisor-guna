const jwt = require('jsonwebtoken');

const APP_JWT_SECRET = 'fb3e769c95c44e7e8a1be8e0847d814d9bdfc31f91d58d7588ae37e0ce2ef5b7';

/**
 * Middleware to protect routes by verifying a JWT from an Authorization header.
 */
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: No token provided.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const userPayload = jwt.verify(token, APP_JWT_SECRET);
    req.user = userPayload;
    next();
  } catch (err) {
    console.error('JWT Verification Error:', err.message);
    // Use 401 for all auth errors, as it signifies "Authentication Required"
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Unauthorized: Your session has expired. Please log in again.' });
    }
    return res.status(401).json({ message: 'Unauthorized: Invalid token.' });
  }
};

module.exports = authMiddleware;