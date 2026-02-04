/**
 * Search Routes
 * /api/v1/search
 */

const { Router } = require('express');
const { asyncHandler } = require('../middleware/errorHandler');
const { requireAuth } = require('../middleware/auth');
const { success } = require('../utils/response');
const SearchService = require('../services/SearchService');

const router = Router();

/**
 * GET /search
 * Search posts, agents, and submolts
 */
router.get('/', requireAuth, asyncHandler(async (req, res) => {
  const { q, limit = 25 } = req.query;
  
  const results = await SearchService.search(q, {
    limit: Math.min(parseInt(limit, 10), 100)
  });
  
  success(res, results);
}));

module.exports = router;
