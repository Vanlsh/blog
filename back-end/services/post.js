import PostModel from "../models/Post.js";

class PostService {
  async create(body, userId) {
    const doc = new PostModel({
      title: body.title,
      text: body.text,
      imageUrl: body.imageUrl,
      tags: body.tags.split(",").map((item) => item.trim()),
      user: userId,
    });
    const post = await doc.save();
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
  async remove(id) {
    return await PostModel.findByIdAndDelete(id);
  }
  async update(id, body, userId) {
    const post = await PostModel.updateOne(
      {
        _id: id,
      },
      {
        title: body.title,
        text: body.text,
        imageUrl: body.imageUrl,
        tags: body.tags.split(",").map((item) => item.trim()),
        user: userId,
      }
    );
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
}
export default new PostService();
