import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import UserModel from "../models/User.js";

class UserService {
  async register(body, avatarUrl) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(body.password, salt);
    const doc = new UserModel({
      fullName: body.fullName,
      email: body.email,
      passwordHash: hash,
      avatarUrl,
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
      throw new Error("Wrong email or password!");
    }
    const isValidPass = await bcrypt.compare(
      body.password,
      user._doc.passwordHash
    );
    if (!isValidPass) {
      throw new Error("Wrong email or password!");
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
      throw new Error("no access");
    }
    const { passwordHash, ...userData } = user._doc;
    return userData;
  }
}

export default new UserService();
