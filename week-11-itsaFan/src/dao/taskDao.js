const Task = require("../models/task");

const createTask = async (taskData) => {
  const newTask = new Task(taskData);
  await newTask.save();
  return newTask;
};

const findTaskByID = async (_id) => {
  return Task.findById({ _id }).populate("project", "projectName").populate("assignedTo", "username").populate("createdBy", "username").populate("group", "name");
};

const findTaskByCreator = async (createdBy) => {
  return Task.find({ createdBy })
    .populate("project", "projectName")
    .populate({
      path: "project",
      populate: {
        path: "assignedGroup",
        populate: [
          { path: "admin", select: "username" },
          { path: "members", select: "username" },
          { path: "leader", select: "username" },
        ],
      },
    })
    .populate("assignedTo", "username");
};

const findTasksAssignedTo = async (assignedTo) => {
  return Task.find({ assignedTo }).populate("project", "projectName").populate("assignedTo", "username").populate("createdBy", "username").populate("group", "name");
};

const findAllTask = async () => {
  return Task.find();
};

const findTasksByStatus = async (statuses, user) => {
  return Task.find({
    status: { $in: statuses },
    assignedTo: user,
  });
};

const updateTask = async (taskId, newTaskData) => {
  try {
    const filter = { _id: taskId };
    const updates = {};

    if (newTaskData.title) {
      updates.title = newTaskData.title;
    }

    if (newTaskData.description) {
      updates.description = newTaskData.description;
    }

    if (newTaskData.dueDate) {
      updates.dueDate = newTaskData.dueDate;
    }

    if (newTaskData.priority) {
      updates.priority = newTaskData.priority;
    }

    if (newTaskData.status) {
      updates.status = newTaskData.status;
    }

    const result = await Task.findOneAndUpdate(filter, updates, {
      new: true,
    });

    if (!result) {
      return null;
    }

    return result;
  } catch (error) {
    console.error("Error when trying to update:", error);
    throw error;
  }
};

const deleteTask = async (taskId) => {
  return Task.deleteOne({ _id: taskId });
};

module.exports = {
  createTask,
  findTaskByID,
  findTaskByCreator,
  findAllTask,
  updateTask,
  deleteTask,
  findTasksAssignedTo,
  findTasksByStatus,
};
