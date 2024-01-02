const Group = require("../models/group");

const createGroup = async (groupData) => {
  const newGroup = new Group(groupData);
  await newGroup.save();
  return newGroup;
};

const findAllGroups = async () => {
  return Group.find().populate("admin", "username").populate("leader", "username").populate("members", "username");
};

const findGroupById = async (_id) => {
  return Group.findById({ _id }).populate("admin", "username").populate("leader", "username").populate("members", "username");
};

const assignLeader = async (groupId, leaderId) => {
  try {
    const group = await Group.findByIdAndUpdate(groupId, { leader: leaderId }, { new: true });
    return group;
  } catch (error) {
    throw new Error("Error assigning leader to group: " + error.message);
  }
};

const assignMember = async (groupId, memberId) => {
  try {
    const member = await Group.findByIdAndUpdate(groupId, { $push: { members: memberId } });
    return member;
  } catch (error) {
    throw new Error("Error assigning leader to group: " + error.message);
  }
};

const findGroupByLeaderId = async (leaderId) => {
  return Group.findOne({ leader: leaderId });
};

module.exports = {
  createGroup,
  findAllGroups,
  findGroupById,
  assignLeader,
  assignMember,
  findGroupByLeaderId
};
