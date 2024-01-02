import express from "express";
import jwt from "jsonwebtoken";
import { users } from "../data/user";
import config from "../config/config";

export const getAllUsers = (req: express.Request, res: express.Response) => {
  res.json(users);
};

export const login = (req: express.Request, res: express.Response) => {
  const { username, password } = req.body;

  const user = users.find((item) => {
    return item.username === username && item.password === password;
  });

  if (user) {
    if (!config.tokenSecret) {
      return res.status(500).json({ error: "Missing JWT secret" });
    }

    const accessToken = jwt.sign(
      {
        username: user.username,
        role: user.role,
      },
      config.tokenSecret
    );

    res.json({
      accessToken,
    });
  } else {
    res.send("Username or password is incorrect");
  }
};
