var jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_Key;

const fetchuser = async (req, res, next) => {
  const authToken = req.headers["auth-token"];
  if (!authToken) {
    return res
      .status(400)
      .json({ error: "Token not found, please try again!" });
  }
  try {
    const data = jwt.verify(authToken, secretKey);
    req.user = data.user;
    next();
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = fetchuser;
