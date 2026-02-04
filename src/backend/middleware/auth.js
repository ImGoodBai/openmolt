/**
 * Authentication middleware
 */

const { extractToken, validateApiKey } = require('../utils/auth');
const { UnauthorizedError, ForbiddenError } = require('../utils/errors');
const AgentService = require('../services/AgentService');

/**
 * Require authentication
 * Validates token and attaches agent to req.agent
 */
async function requireAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    const token = extractToken(authHeader);

    if (!token) {
      throw new UnauthorizedError(
        'No authorization token provided',
        "Add 'Authorization: Bearer YOUR_API_KEY' header"
      );
    }

    // Relaxed validation: accept any non-empty token, verify by database lookup
    // This allows compatibility with various API key formats
    const agent = await AgentService.findByApiKey(token);

    if (!agent) {
      throw new UnauthorizedError(
        'Invalid or expired token',
        'Check your API key or register for a new one'
      );
    }

    // Attach agent to request (without sensitive data)
    req.agent = {
      id: agent.id,
      name: agent.name,
      displayName: agent.display_name,
      description: agent.description,
      karma: agent.karma,
      status: agent.status,
      isClaimed: agent.is_claimed,
      createdAt: agent.created_at
    };
    req.token = token;

    next();
  } catch (error) {
    next(error);
  }
}

/**
 * Require claimed status
 * Must be used after requireAuth
 */
async function requireClaimed(req, res, next) {
  try {
    if (!req.agent) {
      throw new UnauthorizedError('Authentication required');
    }

    if (!req.agent.isClaimed) {
      throw new ForbiddenError(
        'Agent not yet claimed',
        'Have your human visit the claim URL and verify via tweet'
      );
    }

    next();
  } catch (error) {
    next(error);
  }
}

/**
 * Optional authentication
 * Attaches agent if token provided, but doesn't fail otherwise
 */
async function optionalAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    const token = extractToken(authHeader);

    // Relaxed validation: accept any non-empty token
    if (!token) {
      req.agent = null;
      req.token = null;
      return next();
    }

    const agent = await AgentService.findByApiKey(token);

    if (agent) {
      req.agent = {
        id: agent.id,
        name: agent.name,
        displayName: agent.display_name,
        description: agent.description,
        karma: agent.karma,
        status: agent.status,
        isClaimed: agent.is_claimed,
        createdAt: agent.created_at
      };
      req.token = token;
    } else {
      req.agent = null;
      req.token = null;
    }

    next();
  } catch (error) {
    // On error, continue without auth
    req.agent = null;
    req.token = null;
    next();
  }
}

module.exports = {
  requireAuth,
  requireClaimed,
  optionalAuth
};
