import PostModel from "../models/Post.js";
import Comment from "../models/Comment.js";
import { removeFile } from "../utils/removeFile.js";
import fs from "fs";

class PostService {
  async create(body, userId, imageName) {
    const doc = new PostModel({
      title: body.title,
      text: body.text,
      imageUrl: imageName ? `/uploads/${imageName}` : "",
      tags: body.tags.split(",").map((item) => item.trim()),
      user: userId,
    });
    const post = await doc.save();
    return post;
  }
  async remove(id) {
    const post = await PostModel.findByIdAndDelete(id);
    removeFile(post.imageUrl);
    if (post.comments) {
      Comment.deleteMany({ _id: { $in: post.comments } }, (error) => {
        if (error) {
          throw error;
        }
      });
    }
    return post;
  }
  async update(id, body, imageName) {
    const post = await PostModel.findById(id);
    removeFile(post.imageUrl);
    post.title = body.title;
    post.text = body.text;
    post.tags = body.tags.split(",").map((item) => item.trim());
    post.imageUrl = imageName ? `/uploads/${imageName}` : body.imageUrl || "";
    post.save();
    return post;
  }
  async getAll(query) {
    if (query.tag) {
      return await PostModel.find({ tags: query.tag }).populate("user").exec();
    }
    switch (query.sort) {
      case "popular":
        return await PostModel.find()
          .populate("user")
          .sort({ viewsCount: -1 })
          .exec();
      default:
        return await PostModel.find()
          .populate("user")
          .sort({ updatedAt: -1 })
          .exec();
    }
  }
  async getOne(id) {
    const post = await PostModel.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        $inc: { viewsCount: 1 },
      },
      {
        returnDocument: "after",
      }
    )
      .populate("user")
      .populate({
        path: "comments",
        populate: { path: "user", select: "fullName avatarUrl" },
      });
    return post;
  }

  async getLastTags() {
    const posts = await PostModel.find().limit(5).exec();
    const tags = posts
      .map((obj) => obj.tags)
      .flat()
      .slice(0, 5);
    return tags;
  }
  async getPostComments(postId) {
    const post = await PostModel.findById(postId).populate({
      path: "comments",
      populate: { path: "user", select: "fullName avatarUrl" },
    });
    return post.comments;
  }

  async updateImage(postId) {
    const post = await PostModel.findById(postId);
    if (post.imageUrl) {
      const fileName = post.imageUrl.split("/").slice(-1);
      fs.unlink(`./uploads/${fileName}`, (error) => console.log(error));
    }
  }
}
export default new PostService();
