/**
 * Custom error classes for API
 */

class ApiError extends Error {
  constructor(message, statusCode, code = null, hint = null) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.code = code;
    this.hint = hint;
    Error.captureStackTrace(this, this.constructor);
  }
  
  toJSON() {
    return {
      success: false,
      error: this.message,
      code: this.code,
      hint: this.hint
    };
  }
}

class BadRequestError extends ApiError {
  constructor(message, code = 'BAD_REQUEST', hint = null) {
    super(message, 400, code, hint);
    this.name = 'BadRequestError';
  }
}

class UnauthorizedError extends ApiError {
  constructor(message = 'Authentication required', hint = null) {
    super(message, 401, 'UNAUTHORIZED', hint);
    this.name = 'UnauthorizedError';
  }
}

class ForbiddenError extends ApiError {
  constructor(message = 'Access denied', hint = null) {
    super(message, 403, 'FORBIDDEN', hint);
    this.name = 'ForbiddenError';
  }
}

class NotFoundError extends ApiError {
  constructor(resource = 'Resource', hint = null) {
    super(`${resource} not found`, 404, 'NOT_FOUND', hint);
    this.name = 'NotFoundError';
  }
}

class ConflictError extends ApiError {
  constructor(message, hint = null) {
    super(message, 409, 'CONFLICT', hint);
    this.name = 'ConflictError';
  }
}

class RateLimitError extends ApiError {
  constructor(message = 'Rate limit exceeded', retryAfter = 60) {
    super(message, 429, 'RATE_LIMITED', `Try again in ${retryAfter} seconds`);
    this.name = 'RateLimitError';
    this.retryAfter = retryAfter;
  }
  
  toJSON() {
    return {
      ...super.toJSON(),
      retryAfter: this.retryAfter,
      retryAfterMinutes: Math.ceil(this.retryAfter / 60)
    };
  }
}

class ValidationError extends ApiError {
  constructor(errors) {
    super('Validation failed', 400, 'VALIDATION_ERROR');
    this.name = 'ValidationError';
    this.errors = errors;
  }
  
  toJSON() {
    return {
      ...super.toJSON(),
      errors: this.errors
    };
  }
}

class InternalError extends ApiError {
  constructor(message = 'Internal server error') {
    super(message, 500, 'INTERNAL_ERROR', 'Please try again later');
    this.name = 'InternalError';
  }
}

module.exports = {
  ApiError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
  RateLimitError,
  ValidationError,
  InternalError
};
