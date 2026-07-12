const roleMiddleware = (...allowedRoles) => {
    return (req, res, next) => {
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: "You don't have permission to perform this action.",
            });
        }

        next();
    };
};

export default roleMiddleware;