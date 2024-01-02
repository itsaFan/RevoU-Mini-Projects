const groupDao = require("../dao/groupDao");
const userDao = require("../dao/userDao");
const projectDao = require("../dao/projectDao");

const getAllGroups = async (req, res) => {
  try {
    const groups = await groupDao.findAllGroups();

    return res.status(200).json({ message: "Group Lists", groups });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const createGroup = async (req, res) => {
  const { name } = req.body;
  const admin = req.userPayload.userId;
  try {
    const newGroup = await groupDao.createGroup({
      name,
      admin,
    });
    return res.status(201).json({ message: "Group created successfully", newGroup });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const viewGroupByID = async (req, res) => {
  const { groupId } = req.params;

  try {
    const group = await groupDao.findGroupById(groupId);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }
    return res.status(200).json({ message: "Group details", group });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const assignLeaderToGroup = async (req, res) => {
  const { leaderId } = req.body;
  const { groupId } = req.params;
  try {
    const group = await groupDao.findGroupById(groupId);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    const leader = await userDao.findUserByID(leaderId);
    if (!leader || leader.role !== "leader") {
      return res.status(400).json({ message: "Invalid leader input" });
    }

    await groupDao.assignLeader(groupId, leaderId);
    return res.status(200).json({ message: "Assign leader success " });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const assignMemberToGroup = async (req, res) => {
  const { memberId } = req.body;
  const { groupId } = req.params;

  try {
    const group = await groupDao.findGroupById(groupId);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    if (group.members.includes(memberId)) {
      return res.status(400).json({ message: "This member already assign to the group" });
    }

    const member = await userDao.findUserByID(memberId);
    if (!member || member.role !== "user") {
      return res.status(400).json({ message: "Invalid leader input" });
    }

    await groupDao.assignMember(groupId, memberId);
    return res.status(200).json({ message: "Assign member success " });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await userDao.findAllUser();
    return res.status(200).json({ message: "User Lists", users });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const createProject = async (req, res) => {
  const { projectName, groupId } = req.body;
  try {
    const group = await groupDao.findGroupById(groupId);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    const newProject = await projectDao.createProject({
      projectName,
      assignedGroup: groupId,
    });

    return res.status(201).json({ message: "Project created successfully", newProject });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAllProjects = async (req, res) => {
  try {
    const projects = await projectDao.findAllProjects();
    return res.status(200).json({ message: "Project Lists", projects });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getAllGroups,
  getAllUsers,
  createGroup,
  assignLeaderToGroup,
  viewGroupByID,
  assignMemberToGroup,
  createProject,
  getAllProjects,
};
