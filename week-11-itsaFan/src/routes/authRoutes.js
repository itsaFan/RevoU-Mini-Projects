const express = require("express");
const { register, login, getCurrentUserData } = require("../controllers/authController");
const { verifyJWT } = require("../middlewares/verifyJWT");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get('/me', verifyJWT, getCurrentUserData)

module.exports = router;
