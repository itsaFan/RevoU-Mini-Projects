const express = require("express");
const authRoutes = require('./authRoutes');
const adminRoutes = require('./adminRoutes');
const leadRoutes = require('./leadRoutes');
const userRoutes = require('./userRoutes');

const router = express.Router();

router.use("/api", authRoutes);
router.use("/api/admin", adminRoutes);
router.use("/api/leader", leadRoutes);
router.use("/api/user", userRoutes);

module.exports = router;