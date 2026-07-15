import ApiError from "../utils/ApiError.js";

/**
 * isAdmin – must be used AFTER verifyToken.
 * Grants access only to users with role === "admin".
 */
export const isAdmin = (req, _res, next) => {
  if (!req.user) {
    throw ApiError.unauthorized("Authentication required.");
  }
  if (req.user.role !== "admin") {
    throw ApiError.forbidden(
      "Access denied. Administrator privileges required."
    );
  }

  next();
};

export default isAdmin;
