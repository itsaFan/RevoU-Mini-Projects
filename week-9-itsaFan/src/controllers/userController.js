const { getRepository } = require("typeorm");
const { User } = require("../entities/user.js");

const createUser = async (req, res) => {
  try {
    const { username, address } = req.body;

    const userRepostiory = getRepository(User);
    const newUser = userRepostiory.create({ username, address });
    await userRepostiory.save(newUser);
    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Fail to create user:", error);
    res.status(500).json({ message: "Fail to create user" });
  }
};

const getUsers = async (req, res) => {
  try {
    const userRepostiory = getRepository(User);
    const users = await userRepostiory.find();

    res.status(200).json(users);
  } catch (error) {
    console.error("Fail to fetch all users", error);
    res.status(500).json({ message: "Fail to fetch all users" });
  }
};

const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;

    const userRepostiory = getRepository(User);
    const user = await userRepostiory
    .createQueryBuilder("user")
    .where("user.id = :id", { id: userId})
    .getOne();

    if (!user) {
      return res.status(404).json({ message: "No user found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Fail to get user:", error);
    res.status(500).json({ message: "Fail to get user" });
  }
};

const updateUser = async (req, res) => {
  try{
    const userId = req.params.id;
    const {username, address} = req.body;

    const userRepo = getRepository(User);
    const user = await userRepo
    .createQueryBuilder()
    .update(User)
    .set({username, address})
    .where("id = :id", { id: userId})
    .execute();

    if(user.affected === 0) {
      return res.status(404).json({message: "No user found"})
    }
    res.status(200).json({message: "Update success :)"})
  } catch (error) {
    console.error("Failed to update the user:", error);
    res.status(500).json({message: "Failed to update the user"})
  }
}

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const userRepo  = getRepository(User);
    const user = await userRepo
    .createQueryBuilder()
    .delete()
    .from(User)
    .where("id = :id", {id: userId})
    .execute();
    
    if(user.affected === 0) {
      return res.status(404).json({message: "User not found"})
    }
    res.status(200).json({message: "Delete success :)"})
  } catch (error) {
    console.error("Failed to delete user: ", error);
    res.status(500).json({message: "Failed to delete user"})
  }
}

module.exports = { createUser, getUsers, getUserById, updateUser, deleteUser };
