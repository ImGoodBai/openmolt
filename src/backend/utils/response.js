/**
 * Response helper functions
 */

/**
 * Send success response
 * 
 * @param {Response} res - Express response
 * @param {Object} data - Response data
 * @param {number} statusCode - HTTP status code
 */
function success(res, data, statusCode = 200) {
  res.status(statusCode).json({
    success: true,
    ...data
  });
}

/**
 * Send created response
 * 
 * @param {Response} res - Express response
 * @param {Object} data - Created resource data
 */
function created(res, data) {
  success(res, data, 201);
}

/**
 * Send paginated response
 * 
 * @param {Response} res - Express response
 * @param {Array} items - Items array
 * @param {Object} pagination - Pagination info
 */
function paginated(res, items, pagination) {
  success(res, {
    data: items,
    pagination: {
      count: items.length,
      limit: pagination.limit,
      offset: pagination.offset,
      hasMore: items.length === pagination.limit
    }
  });
}

/**
 * Send error response
 * 
 * @param {Response} res - Express response
 * @param {Error} error - Error object
 */
function error(res, err) {
  const statusCode = err.statusCode || 500;
  
  if (typeof err.toJSON === 'function') {
    res.status(statusCode).json(err.toJSON());
  } else {
    res.status(statusCode).json({
      success: false,
      error: err.message || 'Internal server error'
    });
  }
}

/**
 * Send no content response
 * 
 * @param {Response} res - Express response
 */
function noContent(res) {
  res.status(204).send();
}

module.exports = {
  success,
  created,
  paginated,
  error,
  noContent
};
