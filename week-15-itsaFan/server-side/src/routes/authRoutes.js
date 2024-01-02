const express = require("express");
const { register, login, getCurrentUserData } = require("../controllers/authController");
const { xRequestId, verifyJWT } = require("../middlewares");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", xRequestId, verifyJWT, getCurrentUserData);

module.exports = router;
