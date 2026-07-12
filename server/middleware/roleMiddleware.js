const roleMiddleware = (requiredRole) => {
  return (req, res, next) => {
    // Placeholder: Add role-based authorization logic here
    // For now, allow all roles
    next();
  };
};

module.exports = roleMiddleware;
