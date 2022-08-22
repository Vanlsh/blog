import PostModel from "../models/Post.js";

class PostService {
  async create(body, userId) {
    const doc = new PostModel({
      title: body.title,
      text: body.text,
      imageUrl: body.imageUrl,
      tags: body.tags,
      user: userId,
    });
    const post = await doc.save();
    return post;
  }
  async getAll(id, sort) {}
}

export default new PostService();
