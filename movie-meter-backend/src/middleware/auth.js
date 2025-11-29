export const requireAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({
    success: false,
    message: 'Authentication required'
  });
};

export const optionalAuth = (req, res, next) => {
  // Always proceed, but user info will be available if authenticated
  next();
};
