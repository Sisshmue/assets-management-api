import jwt from "jsonwebtoken";

 const authMiddleWare = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(400).json({
        message: "No Token Provided",
      });
    }
    const token = authHeader.split(" ")[1];
    const verify = jwt.verify(token, process.env.JWT_SECRET);
    if (!verify) {
      return res.status(400).json({
        message: "Authentication acccess denied!",
      });
    }
    next();
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export default authMiddleWare;
