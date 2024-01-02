const express = require("express");
const { verifyJWT } = require("../middlewares/verifyJWT");
const { checkRole } = require("../middlewares/checkRole");
const { viewProjects, createTask, leaderViewCreatedTask, leaderViewAllCreatedTasks, updateTask, deleteTask } = require("../controllers/leadController");

const router = express.Router();

router.get("/projects", verifyJWT, checkRole(["leader"]), viewProjects);
// router.post("/tasks/:projectId", verifyJWT, checkRole(["leader"]), createTask);
router.post("/tasks/add", verifyJWT, checkRole(["leader"]), createTask);
router.get("/task/:taskId", verifyJWT, checkRole(["leader"]), leaderViewCreatedTask);
router.get("/tasks", verifyJWT, checkRole(["leader"]), leaderViewAllCreatedTasks);
router.put("/tasks/edit/:taskId", verifyJWT, checkRole(["leader"]), updateTask);
router.delete("/tasks/delete/:taskId", verifyJWT, checkRole(["leader"]), deleteTask);

module.exports = router;
