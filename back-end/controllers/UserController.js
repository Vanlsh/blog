import { UserService } from "../services/index.js";

export const register = async (req, res) => {
  try {
    const user = await UserService.register(req.body);
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to register",
    });
  }
};

export const login = async (req, res) => {
  try {
    const user = await UserService.login(req.body);
    res.json(user);
  } catch (err) {
    res.status(404).json({ message: "Error" });
  }
};

export const getMe = async (req, res) => {
  try {
    const userData = await UserService.getMe(req.userId);
    res.status(200).json(userData);
  } catch (err) {
    return res.status(404).json({ message: "opp" });
  }
};
