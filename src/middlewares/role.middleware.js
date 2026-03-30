const checkRole =
  (...allowedRoles) =>
  (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(404).json({
        messagae: "Access Denied",
      });
    }
    next();
  };

export default checkRole;
