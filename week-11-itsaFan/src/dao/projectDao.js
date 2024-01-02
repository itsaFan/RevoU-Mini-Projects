const Project = require("../models/project");

const createProject = async (projectData) => {
  const newProject = new Project(projectData);
  await newProject.save();
  return newProject;
};

const findAllProjects = async () => {
  return Project.find().populate({
    path: "assignedGroup",
    populate: [
      { path: "admin", select: "username" },
      { path: "members", select: "username" },
      { path: "leader", select: "username" },
    ],
  });
};

const findProjectById = async (_id) => {
  return Group.findById({ _id }).populate("assignedGroup", "name").populate("assignedGroup", "members");
};

const findProjectsByLeader = async (leaderId) => {
  const projects = await Project.find({}).populate({
    path: "assignedGroup",
    match: { leader: leaderId },
    populate: [
      { path: "admin", select: "username" },
      { path: "members", select: "username" },
      { path: "leader", select: "username" },
    ],
  });

  const filteredProjects = projects.filter((project) => project.assignedGroup);

  return filteredProjects;
};

module.exports = {
  createProject,
  findAllProjects,
  findProjectById,
  findProjectsByLeader,
};
