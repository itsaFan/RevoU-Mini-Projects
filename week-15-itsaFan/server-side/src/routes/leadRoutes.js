const express = require("express");
const { viewProjects, createTask, leaderViewCreatedTask, leaderViewAllCreatedTasks, updateTask, deleteTask } = require("../controllers/leadController");
const { xRequestId, verifyJWT, checkRole } = require("../middlewares");

const router = express.Router();

router.get("/projects", xRequestId, verifyJWT, checkRole(["leader"]), viewProjects);
// router.post("/tasks/:projectId", verifyJWT, checkRole(["leader"]), createTask);
router.post("/tasks/add", xRequestId, verifyJWT, checkRole(["leader"]), createTask);
router.get("/task/:taskId", xRequestId, verifyJWT, checkRole(["leader"]), leaderViewCreatedTask);
router.get("/tasks", xRequestId, verifyJWT, checkRole(["leader"]), leaderViewAllCreatedTasks);
router.put("/tasks/edit/:taskId", xRequestId, verifyJWT, checkRole(["leader"]), updateTask);
router.delete("/tasks/delete/:taskId", xRequestId, verifyJWT, checkRole(["leader"]), deleteTask);

module.exports = router;
