const express = require("express");
const User = require("../Schemas/User");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_Key;
const fetchuser = require("../middleware/fetchdata");

const router = express.Router();

// < ------------------------------- Api for creating User ------------------------------- >
router.post("/createuser", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(403)
        .json({ error: "User already exist, please try with new email!" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);
    user = new User({
      name: name,
      email: email,
      password: hashedPass,
    });
    const savedUser = await user.save();

    const data = {
      user: {
        userId: user.id,
      },
    };
    const authToken = jwt.sign(data, secretKey, { expiresIn: "1h" });
    const expiry = Math.floor(Date.now() / 1000) + 3600;
    res.send({ authToken, expiry });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

// < ------------------------------- Api for login User ------------------------------- >
router.post("/loginuser", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ error: "User not found, please try again!" });
    }
    const compPass = await bcrypt.compare(password, user.password);
    if (!compPass) {
      return res
        .status(400)
        .json({ error: "Incorrect creds, please try again!" });
    }
    const data = {
      user: {
        userId: user.id,
      },
    };
    const authToken = jwt.sign(data, secretKey, { expiresIn: "1h" });
    const expiry = Math.floor(Date.now() / 1000) + 3600;
    res.send({ authToken, expiry });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

// < ------------------------------- Api for get user ------------------------------- >
router.get("/getuser", fetchuser, async (req, res) => {
  try {
    let userId = req.user.userId;
    const user = await User.findById(userId).select("-password");
    res.send({ user });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("An Error Occurred");
  }
});

module.exports = router;
