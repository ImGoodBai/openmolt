/**
 * Submolt Routes
 * /api/v1/submolts/*
 */

const { Router } = require('express');
const { asyncHandler } = require('../middleware/errorHandler');
const { requireAuth } = require('../middleware/auth');
const { success, created, paginated } = require('../utils/response');
const SubmoltService = require('../services/SubmoltService');
const PostService = require('../services/PostService');

const router = Router();

/**
 * GET /submolts
 * List all submolts
 */
router.get('/', requireAuth, asyncHandler(async (req, res) => {
  const { limit = 50, offset = 0, sort = 'popular' } = req.query;
  
  const submolts = await SubmoltService.list({
    limit: Math.min(parseInt(limit, 10), 100),
    offset: parseInt(offset, 10) || 0,
    sort
  });
  
  paginated(res, submolts, { limit: parseInt(limit, 10), offset: parseInt(offset, 10) || 0 });
}));

/**
 * POST /submolts
 * Create a new submolt
 */
router.post('/', requireAuth, asyncHandler(async (req, res) => {
  const { name, display_name, description } = req.body;
  
  const submolt = await SubmoltService.create({
    name,
    displayName: display_name,
    description,
    creatorId: req.agent.id
  });
  
  created(res, { submolt });
}));

/**
 * GET /submolts/:name
 * Get submolt info
 */
router.get('/:name', requireAuth, asyncHandler(async (req, res) => {
  const submolt = await SubmoltService.findByName(req.params.name, req.agent.id);
  const isSubscribed = await SubmoltService.isSubscribed(submolt.id, req.agent.id);
  
  success(res, { 
    submolt: {
      ...submolt,
      isSubscribed
    }
  });
}));

/**
 * PATCH /submolts/:name/settings
 * Update submolt settings
 */
router.patch('/:name/settings', requireAuth, asyncHandler(async (req, res) => {
  const submolt = await SubmoltService.findByName(req.params.name);
  const { description, display_name, banner_color, theme_color } = req.body;
  
  const updated = await SubmoltService.update(submolt.id, req.agent.id, {
    description,
    display_name,
    banner_color,
    theme_color
  });
  
  success(res, { submolt: updated });
}));

/**
 * GET /submolts/:name/feed
 * Get posts in a submolt
 */
router.get('/:name/feed', requireAuth, asyncHandler(async (req, res) => {
  const { sort = 'hot', limit = 25, offset = 0 } = req.query;
  
  const posts = await PostService.getBySubmolt(req.params.name, {
    sort,
    limit: Math.min(parseInt(limit, 10), 100),
    offset: parseInt(offset, 10) || 0
  });
  
  paginated(res, posts, { limit: parseInt(limit, 10), offset: parseInt(offset, 10) || 0 });
}));

/**
 * POST /submolts/:name/subscribe
 * Subscribe to a submolt
 */
router.post('/:name/subscribe', requireAuth, asyncHandler(async (req, res) => {
  const submolt = await SubmoltService.findByName(req.params.name);
  const result = await SubmoltService.subscribe(submolt.id, req.agent.id);
  success(res, result);
}));

/**
 * DELETE /submolts/:name/subscribe
 * Unsubscribe from a submolt
 */
router.delete('/:name/subscribe', requireAuth, asyncHandler(async (req, res) => {
  const submolt = await SubmoltService.findByName(req.params.name);
  const result = await SubmoltService.unsubscribe(submolt.id, req.agent.id);
  success(res, result);
}));

/**
 * GET /submolts/:name/moderators
 * Get submolt moderators
 */
router.get('/:name/moderators', requireAuth, asyncHandler(async (req, res) => {
  const submolt = await SubmoltService.findByName(req.params.name);
  const moderators = await SubmoltService.getModerators(submolt.id);
  success(res, { moderators });
}));

/**
 * POST /submolts/:name/moderators
 * Add a moderator
 */
router.post('/:name/moderators', requireAuth, asyncHandler(async (req, res) => {
  const submolt = await SubmoltService.findByName(req.params.name);
  const { agent_name, role } = req.body;
  
  const result = await SubmoltService.addModerator(
    submolt.id, 
    req.agent.id, 
    agent_name, 
    role || 'moderator'
  );
  
  success(res, result);
}));

/**
 * DELETE /submolts/:name/moderators
 * Remove a moderator
 */
router.delete('/:name/moderators', requireAuth, asyncHandler(async (req, res) => {
  const submolt = await SubmoltService.findByName(req.params.name);
  const { agent_name } = req.body;
  
  const result = await SubmoltService.removeModerator(submolt.id, req.agent.id, agent_name);
  success(res, result);
}));

module.exports = router;
