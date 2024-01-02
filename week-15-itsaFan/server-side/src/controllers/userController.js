const groupDao = require("../dao/groupDao");
const userDao = require("../dao/userDao");
const projectDao = require("../dao/projectDao");
const taskDao = require("../dao/taskDao");

const viewAllAssignedTasks = async (req, res) => {
  const user = req.userPayload.userId;

  try {
    const tasks = await taskDao.findTasksAssignedTo(user);

    if (tasks.length === 0) {
      return res.status(200).json({ message: "You currently have no tasks" });
    }

    return res.status(200).json({ message: "Your Assigned Tasks : ", tasks });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const viewAssignedTask = async (req, res) => {
  const { taskId } = req.params;
  const user = req.userPayload.userId;

  try {
    const task = await taskDao.findTaskByID(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (task.assignedTo._id.toString() !== user) {
      return res.status(403).json({ message: "Invalid: You are not assigned to this task" });
    }
    return res.status(200).json({ message: "Task details:", task });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateAssignedTask = async (req, res) => {
  const { taskId } = req.params;
  const { status } = req.body;
  const user = req.userPayload.userId;

  const validStatusValues = ["pending", "in-progress", "completed"];

  try {
    if (!validStatusValues.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const updateTask = await taskDao.updateTask(taskId, { status });
    if (!updateTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (updateTask.assignedTo.toString() !== user) {
      return res.status(403).json({ message: "You are not assigned to this task" });
    }

    return res.status(200).json({ message: "Task updated successfully", updateTask });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const viewTasksByStatuses = async (req, res) => {
  const { statuses } = req.query;
  const user = req.userPayload.userId;
  if (!statuses) {
    return res.status(400).json({ message: "Missing 'statuses' paramater" });
  }

  const statusesArray = statuses.split(",");

  try {
    const tasks = await taskDao.findTasksByStatus(statusesArray, user);

    if (tasks.length === 0) {
      return res.status(200).json({ message: `There is no tasks for ${statuses}` });
    }

    return res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  viewAllAssignedTasks,
  viewAssignedTask,
  updateAssignedTask,
  viewTasksByStatuses,
};
