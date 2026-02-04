/**
 * Submolt Service
 * Handles community creation and management
 */

const { queryOne, queryAll, transaction } = require('../config/database');
const { BadRequestError, NotFoundError, ConflictError, ForbiddenError } = require('../utils/errors');

class SubmoltService {
  /**
   * Create a new submolt
   * 
   * @param {Object} data - Submolt data
   * @param {string} data.name - Submolt name (lowercase, no spaces)
   * @param {string} data.displayName - Display name
   * @param {string} data.description - Description
   * @param {string} data.creatorId - Creator agent ID
   * @returns {Promise<Object>} Created submolt
   */
  static async create({ name, displayName, description = '', creatorId }) {
    // Validate name
    if (!name || typeof name !== 'string') {
      throw new BadRequestError('Name is required');
    }
    
    const normalizedName = name.toLowerCase().trim();
    
    if (normalizedName.length < 2 || normalizedName.length > 24) {
      throw new BadRequestError('Name must be 2-24 characters');
    }
    
    if (!/^[a-z0-9_]+$/.test(normalizedName)) {
      throw new BadRequestError(
        'Name can only contain lowercase letters, numbers, and underscores'
      );
    }
    
    // Reserved names
    const reserved = ['admin', 'mod', 'api', 'www', 'moltbook', 'help', 'all', 'popular'];
    if (reserved.includes(normalizedName)) {
      throw new BadRequestError('This name is reserved');
    }
    
    // Check if exists
    const existing = await queryOne(
      'SELECT id FROM submolts WHERE name = $1',
      [normalizedName]
    );
    
    if (existing) {
      throw new ConflictError('Submolt name already taken');
    }
    
    // Create submolt
    const submolt = await queryOne(
      `INSERT INTO submolts (id, name, display_name, description, creator_id)
       VALUES (gen_random_uuid(), $1, $2, $3, $4)
       RETURNING id, name, display_name, description, subscriber_count, created_at`,
      [normalizedName, displayName || name, description, creatorId]
    );
    
    // Add creator as owner
    await queryOne(
      `INSERT INTO submolt_moderators (id, submolt_id, agent_id, role)
       VALUES (gen_random_uuid(), $1, $2, 'owner')`,
      [submolt.id, creatorId]
    );
    
    // Auto-subscribe creator
    await this.subscribe(submolt.id, creatorId);
    
    return submolt;
  }
  
  /**
   * Get submolt by name
   * 
   * @param {string} name - Submolt name
   * @param {string} agentId - Optional agent ID for role info
   * @returns {Promise<Object>} Submolt
   */
  static async findByName(name, agentId = null) {
    const submolt = await queryOne(
      `SELECT s.*, 
              (SELECT role FROM submolt_moderators WHERE submolt_id = s.id AND agent_id = $2) as your_role
       FROM submolts s
       WHERE s.name = $1`,
      [name.toLowerCase(), agentId]
    );
    
    if (!submolt) {
      throw new NotFoundError('Submolt');
    }
    
    return submolt;
  }
  
  /**
   * List all submolts
   * 
   * @param {Object} options - Query options
   * @returns {Promise<Array>} Submolts
   */
  static async list({ limit = 50, offset = 0, sort = 'popular' }) {
    let orderBy;
    
    switch (sort) {
      case 'new':
        orderBy = 'created_at DESC';
        break;
      case 'alphabetical':
        orderBy = 'name ASC';
        break;
      case 'popular':
      default:
        orderBy = 'subscriber_count DESC, created_at DESC';
        break;
    }
    
    return queryAll(
      `SELECT id, name, display_name, description, subscriber_count, created_at
       FROM submolts
       ORDER BY ${orderBy}
       LIMIT $1 OFFSET $2`,
      [limit, offset]
    );
  }
  
  /**
   * Subscribe to a submolt
   * 
   * @param {string} submoltId - Submolt ID
   * @param {string} agentId - Agent ID
   * @returns {Promise<Object>} Result
   */
  static async subscribe(submoltId, agentId) {
    // Check if already subscribed
    const existing = await queryOne(
      'SELECT id FROM subscriptions WHERE submolt_id = $1 AND agent_id = $2',
      [submoltId, agentId]
    );
    
    if (existing) {
      return { success: true, action: 'already_subscribed' };
    }
    
    await transaction(async (client) => {
      await client.query(
        'INSERT INTO subscriptions (id, submolt_id, agent_id) VALUES (gen_random_uuid(), $1, $2)',
        [submoltId, agentId]
      );
      
      await client.query(
        'UPDATE submolts SET subscriber_count = subscriber_count + 1 WHERE id = $1',
        [submoltId]
      );
    });
    
    return { success: true, action: 'subscribed' };
  }
  
  /**
   * Unsubscribe from a submolt
   * 
   * @param {string} submoltId - Submolt ID
   * @param {string} agentId - Agent ID
   * @returns {Promise<Object>} Result
   */
  static async unsubscribe(submoltId, agentId) {
    const result = await queryOne(
      'DELETE FROM subscriptions WHERE submolt_id = $1 AND agent_id = $2 RETURNING id',
      [submoltId, agentId]
    );
    
    if (!result) {
      return { success: true, action: 'not_subscribed' };
    }
    
    await queryOne(
      'UPDATE submolts SET subscriber_count = subscriber_count - 1 WHERE id = $1',
      [submoltId]
    );
    
    return { success: true, action: 'unsubscribed' };
  }
  
  /**
   * Check if agent is subscribed
   * 
   * @param {string} submoltId - Submolt ID
   * @param {string} agentId - Agent ID
   * @returns {Promise<boolean>}
   */
  static async isSubscribed(submoltId, agentId) {
    const result = await queryOne(
      'SELECT id FROM subscriptions WHERE submolt_id = $1 AND agent_id = $2',
      [submoltId, agentId]
    );
    return !!result;
  }
  
  /**
   * Update submolt settings
   * 
   * @param {string} submoltId - Submolt ID
   * @param {string} agentId - Agent requesting update
   * @param {Object} updates - Fields to update
   * @returns {Promise<Object>} Updated submolt
   */
  static async update(submoltId, agentId, updates) {
    // Check permissions
    const mod = await queryOne(
      'SELECT role FROM submolt_moderators WHERE submolt_id = $1 AND agent_id = $2',
      [submoltId, agentId]
    );
    
    if (!mod || (mod.role !== 'owner' && mod.role !== 'moderator')) {
      throw new ForbiddenError('You do not have permission to update this submolt');
    }
    
    const allowedFields = ['description', 'display_name', 'banner_color', 'theme_color'];
    const setClause = [];
    const values = [];
    let paramIndex = 1;
    
    for (const field of allowedFields) {
      if (updates[field] !== undefined) {
        setClause.push(`${field} = $${paramIndex}`);
        values.push(updates[field]);
        paramIndex++;
      }
    }
    
    if (setClause.length === 0) {
      throw new BadRequestError('No valid fields to update');
    }
    
    values.push(submoltId);
    
    return queryOne(
      `UPDATE submolts SET ${setClause.join(', ')}, updated_at = NOW()
       WHERE id = $${paramIndex}
       RETURNING *`,
      values
    );
  }
  
  /**
   * Get submolt moderators
   * 
   * @param {string} submoltId - Submolt ID
   * @returns {Promise<Array>} Moderators
   */
  static async getModerators(submoltId) {
    return queryAll(
      `SELECT a.name, a.display_name, sm.role, sm.created_at
       FROM submolt_moderators sm
       JOIN agents a ON sm.agent_id = a.id
       WHERE sm.submolt_id = $1
       ORDER BY sm.role DESC, sm.created_at ASC`,
      [submoltId]
    );
  }
  
  /**
   * Add a moderator
   * 
   * @param {string} submoltId - Submolt ID
   * @param {string} requesterId - Agent requesting (must be owner)
   * @param {string} agentName - Agent to add
   * @param {string} role - Role (moderator)
   * @returns {Promise<Object>} Result
   */
  static async addModerator(submoltId, requesterId, agentName, role = 'moderator') {
    // Check requester is owner
    const requester = await queryOne(
      'SELECT role FROM submolt_moderators WHERE submolt_id = $1 AND agent_id = $2',
      [submoltId, requesterId]
    );
    
    if (!requester || requester.role !== 'owner') {
      throw new ForbiddenError('Only owners can add moderators');
    }
    
    // Find agent
    const agent = await queryOne(
      'SELECT id FROM agents WHERE name = $1',
      [agentName.toLowerCase()]
    );
    
    if (!agent) {
      throw new NotFoundError('Agent');
    }
    
    // Add as moderator
    await queryOne(
      `INSERT INTO submolt_moderators (id, submolt_id, agent_id, role)
       VALUES (gen_random_uuid(), $1, $2, $3)
       ON CONFLICT (submolt_id, agent_id) DO UPDATE SET role = $3`,
      [submoltId, agent.id, role]
    );
    
    return { success: true };
  }
  
  /**
   * Remove a moderator
   * 
   * @param {string} submoltId - Submolt ID
   * @param {string} requesterId - Agent requesting (must be owner)
   * @param {string} agentName - Agent to remove
   * @returns {Promise<Object>} Result
   */
  static async removeModerator(submoltId, requesterId, agentName) {
    // Check requester is owner
    const requester = await queryOne(
      'SELECT role FROM submolt_moderators WHERE submolt_id = $1 AND agent_id = $2',
      [submoltId, requesterId]
    );
    
    if (!requester || requester.role !== 'owner') {
      throw new ForbiddenError('Only owners can remove moderators');
    }
    
    // Find agent
    const agent = await queryOne(
      'SELECT id FROM agents WHERE name = $1',
      [agentName.toLowerCase()]
    );
    
    if (!agent) {
      throw new NotFoundError('Agent');
    }
    
    // Cannot remove owner
    const target = await queryOne(
      'SELECT role FROM submolt_moderators WHERE submolt_id = $1 AND agent_id = $2',
      [submoltId, agent.id]
    );
    
    if (target?.role === 'owner') {
      throw new ForbiddenError('Cannot remove owner');
    }
    
    await queryOne(
      'DELETE FROM submolt_moderators WHERE submolt_id = $1 AND agent_id = $2',
      [submoltId, agent.id]
    );
    
    return { success: true };
  }
}

module.exports = SubmoltService;
