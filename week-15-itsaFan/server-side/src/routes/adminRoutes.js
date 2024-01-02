const express = require("express");
const { verifyJWT, checkRole } = require("../middlewares");
const { getAllGroups, getAllUsers, createGroup, viewGroupByID, assignLeaderToGroup, assignMemberToGroup, createProject, getAllProjects } = require("../controllers/adminController");

const router = express.Router();

//user section
router.get("/users", verifyJWT, checkRole(["admin"]), getAllUsers);

//group section
router.get("/groups", verifyJWT, checkRole(["admin"]), getAllGroups);
router.post("/groups/add", verifyJWT, checkRole(["admin"]), createGroup);
router.get("/groups/:groupId", verifyJWT, checkRole(["admin"]), viewGroupByID);
router.put("/group/assign-leader/:groupId", verifyJWT, checkRole(["admin"]), assignLeaderToGroup);
router.put("/group/assign-member/:groupId", verifyJWT, checkRole(["admin"]), assignMemberToGroup);

//project section
router.post("/projects", verifyJWT, checkRole(["admin"]), createProject);
router.get("/projects", verifyJWT, checkRole(["admin"]), getAllProjects);

module.exports = router;
