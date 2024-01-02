const groupDao = require("../dao/groupDao");
const userDao = require("../dao/userDao");
const projectDao = require("../dao/projectDao");
const taskDao = require("../dao/taskDao");

const viewProjects = async (req, res) => {
  const userId = req.userPayload.userId;
  console.log(userId);
  try {
    const projects = await projectDao.findProjectsByLeader(userId);
    // console.log(projects);
    return res.status(200).json({ message: "Projects available", projects });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// const createTask = async (req, res) => {
//   const { title, description, dueDate, priority, assignedTo } = req.body;
//   const { projectId } = req.params;
//   const leader = req.userPayload.userId;
//   // console.log(leader);

//   try {
//     const group = await groupDao.findGroupByLeaderId(leader);
//     if (!group) {
//       return res.status(400).json({ message: "You are not assigned to any group as a leader." });
//     }

//     if (!group.members.includes(assignedTo)) {
//       return res.status(404).json({ message: "User is not assigned to this group as a member" });
//     }

//     const checkMemberRole = await userDao.findUserByID(assignedTo);
//     if (checkMemberRole.role !== "user") {
//       return res.status(401).json({
//         message: "User role not valid",
//       });
//     }

//     const newTask = await taskDao.createTask({
//       project: projectId,
//       title,
//       description,
//       dueDate,
//       priority,
//       assignedTo,
//       createdBy: leader,
//       group: group._id,
//     });

//     return res.status(201).json({ message: "Task created successfully", newTask });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Internal Server Error" });
//   }
// };

const createTask = async (req, res) => {
  const { project, title, description, dueDate, priority, assignedTo } = req.body;
  const leader = req.userPayload.userId;
  // console.log(leader);

  try {
    const group = await groupDao.findGroupByLeaderId(leader);
    if (!group) {
      return res.status(400).json({ message: "You are not assigned to any group as a leader." });
    }

    if (!group.members.includes(assignedTo)) {
      return res.status(404).json({ message: "User is not assigned to this group as a member" });
    }

    const checkMemberRole = await userDao.findUserByID(assignedTo);
    if (checkMemberRole.role !== "user") {
      return res.status(401).json({
        message: "User role not valid",
      });
    }

    const newTask = await taskDao.createTask({
      project,
      title,
      description,
      dueDate,
      priority,
      assignedTo,
      createdBy: leader,
      group: group._id,
    });

    return res.status(201).json({ message: "Task created successfully", newTask });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const leaderViewCreatedTask = async (req, res) => {
  const { taskId } = req.params;
  const leader = req.userPayload.userId;
  console.log(leader);

  try {
    const task = await taskDao.findTaskByID(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (task.createdBy._id.toString() !== leader) {
      return res.status(403).json({ message: "Only creator of this task can view details" });
    }

    return res.status(200).json({ message: "Task details:", task });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
const leaderViewAllCreatedTasks = async (req, res) => {
  const leader = req.userPayload.userId;

  try {
    const tasks = await taskDao.findTaskByCreator(leader);

    if (tasks.length === 0) {
      return res.status(200).json({ message: "No tasks created yet by this leader." });
    }

    return res.status(200).json({ message: "All Created Tasks:", tasks });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateTask = async (req, res) => {
  const { taskId } = req.params;
  const newTaskData = req.body;
  const leader = req.userPayload.userId;

  try {
    const updatedTask = await taskDao.updateTask(taskId, newTaskData);

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (updatedTask.createdBy.toString() !== leader) {
      return res.status(403).json({ message: "Only creator of this task can update" });
    }

    return res.status(200).json({ message: "Task updated success", updatedTask });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteTask = async (req, res) => {
  const { taskId } = req.params;
  const leader = req.userPayload.userId;

  try {
    const task = await taskDao.findTaskByID(taskId);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (task.status !== "pending") {
      return res.status(403).json({ message: "Only 'pending' tasks can be deleted" });
    }

    if (task.createdBy._id.toString() !== leader) {
      return res.status(403).json({ message: "Only the creator of this task can delete it" });
    }

    await taskDao.deleteTask(taskId);

    return res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  viewProjects,
  createTask,
  leaderViewCreatedTask,
  leaderViewAllCreatedTasks,
  updateTask,
  deleteTask,
};
