const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  try {

    const cookies = req.cookies
    const token = cookies?.authToken;

    if (!token) {
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = parseInt(payload.sub, 10);

    next();

  } 
  catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Unauthorized: Token expired" });
    }
    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = authMiddleware;
