const jwt = require("jsonwebtoken");
const config = require("../config/config");

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!config.tokenSecret) {
    return res.status(500).json({ error: "Token secret is missing or undefined" });
  }

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, config.tokenSecret, (error, userPayload) => {
      if (error) {
        console.log("JWT Verification Error:", error);
        return res.status(401).json({ error: "Unauthorized: Invalid token" });
      }
      req.userPayload = userPayload;
      next();
    });
  } else {
    res.status(401).json({ error: "Unauthorized: No bearer token" });
  }
};

module.exports = { verifyJWT };
