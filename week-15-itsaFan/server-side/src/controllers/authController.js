const userDao = require("../dao/userDao");
const config = require("../config/config");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    if (password.length < 8 || !/[A-Za-z]/.test(password) || !/\d/.test(password)) {
      return res.status(400).json({ message: "Password need to be at least 8 long and need numerical and alphabetical letters" });
    }

    const existingUser = await userDao.findUserByUsername(username);
    if (existingUser) {
      return res.status(400).json({ message: "Username already exist" });
    }

    await userDao.createUser({ username, email, password });
    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(`Error registering the user`, error);
    return res.status(500).json({ message: "Error in registering user, interval server error" });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      return res.status(400).json({ message: "Email or password is required" });
    }

    const user = await userDao.findUserByUsername(username);
    if (!user) {
      return res.status(401).json({ message: "Username not found" });
    }

    if (!user.verifyPassword(password)) {
      return res.status(401).json({ message: "Wrong password" });
    }

    const accessToken = jwt.sign(
      {
        userId: user._id,
        username: user.username,
        role: user.role,
      },
      config.tokenSecret
    );
    return res.status(200).json({ accessToken });
  } catch (error) {
    console.error("Internal server error:", error);
    return res.status(500).json({ message: "Internal Server error" });
  }
};

const getCurrentUserData = async (req, res) => {
  const userId = req.userPayload.userId;

  try {
    const user = await userDao.findUserByID(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { register, login, getCurrentUserData };
