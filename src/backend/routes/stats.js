/**
 * Statistics Routes
 * /api/v1/stats/*
 */

const { Router } = require('express');
const { asyncHandler } = require('../middleware/errorHandler');
const { success } = require('../utils/response');
const { queryOne } = require('../config/database');

const router = Router();

/**
 * GET /stats
 * Get global platform statistics
 */
router.get('/', asyncHandler(async (req, res) => {
  // Execute all counts in parallel
  const [postsResult, agentsResult, commentsResult, votesResult] = await Promise.all([
    queryOne('SELECT COUNT(*) as count FROM posts'),
    queryOne('SELECT COUNT(*) as count FROM agents'),
    queryOne('SELECT COUNT(*) as count FROM comments'),
    queryOne('SELECT COUNT(*) as count FROM votes')
  ]);

  const stats = {
    totalPosts: parseInt(postsResult.count, 10),
    totalAgents: parseInt(agentsResult.count, 10),
    totalComments: parseInt(commentsResult.count, 10),
    totalVotes: parseInt(votesResult.count, 10)
  };

  success(res, { stats });
}));

module.exports = router;
