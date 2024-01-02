const express = require("express");
const { verifyJWT, checkRole } = require("../middlewares");
const { viewAllAssignedTasks, viewAssignedTask, updateAssignedTask, viewTasksByStatuses } = require("../controllers/userController");

const router = express.Router();

router.get("/tasks", verifyJWT, checkRole(["user"]), viewAllAssignedTasks);
router.get("/tasks/search-status", verifyJWT, checkRole(["user"]), viewTasksByStatuses);
router.get("/tasks/:taskId", verifyJWT, checkRole(["user"]), viewAssignedTask);
router.put("/tasks/update/:taskId", verifyJWT, checkRole(["user"]), updateAssignedTask);


module.exports = router;
