import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import UserModel from "../models/User.js";

class UserService {
  async register(body) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(body.password, salt);
    const doc = new UserModel({
      fullName: body.fullName,
      email: body.email,
      passwordHash: hash,
      avatarUrl: body.avatarUrl,
    });
    const user = await doc.save();
    const token = jwt.sign(
      {
        _id: user._id,
      },
      "secret123",
      {
        expiresIn: "30d",
      }
    );
    const { passwordHash, ...userData } = user._doc;
    return { ...userData, token };
  }
  async login(body) {
    const user = await UserModel.findOne({ email: body.email });
    if (!user) {
      return { message: "Don`t find" };
    }
    const isValidPass = await bcrypt.compare(
      body.password,
      user._doc.passwordHash
    );
    if (!isValidPass) {
      return {
        message: "Invalid login or password",
      };
    }
    const token = jwt.sign(
      {
        _id: user._id,
      },
      "secret123",
      {
        expiresIn: "30d",
      }
    );
    const { passwordHash, ...userData } = user._doc;
    return {
      ...userData,
      token,
    };
  }
  async getMe(userId) {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "no access" });
    }
    const { passwordHash, ...userData } = user._doc;
    return userData;
  }
}

export default new UserService();
