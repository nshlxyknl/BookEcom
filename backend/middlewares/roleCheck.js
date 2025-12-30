/**
 * Role-based access control middleware
 * This middleware works in conjunction with the auth middleware to create a dual-layer protection system.
 *
 * The checkRole function is a middleware factory that creates a middleware function
 * specifically configured to check for a particular role.
 *
 * Usage example:
 * router.get("/admin-only", auth, checkRole("admin"), handler);
 *
 * @param {string} role - The role required to access the route (e.g., 'admin', 'user')
 * @returns {Function} Express middleware function
 */
const checkRole = (role) => {
    return (req, res, next) => {
      // Get the user's role from the request object (set by auth middleware)
      const userRole = req.user.role;
  
      // Compare the user's role with the required role
      if (userRole !== role) {
        return res.status(403).json({
          message: "Access denied: Insufficient permissions",
          requiredRole: role,
          userRole: userRole,
          details: `This action requires ${role} privileges, but you are a ${userRole}`,
        });
      }
  
      // If roles match, allow the request to proceed
      next();
    };
  };
  
  module.exports = checkRole;
  