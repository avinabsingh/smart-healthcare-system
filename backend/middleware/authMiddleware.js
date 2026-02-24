const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const header = req.headers.authorization;

  if (!header) return res.status(401).send("Access Denied");

  const token = header.split(" ")[1];

  jwt.verify(token, "healthcareSecret", (err, decoded) => {
    if (err) return res.status(401).send("Invalid Token");

    req.userId = decoded.id;
    next();
  });
};

module.exports = verifyToken;