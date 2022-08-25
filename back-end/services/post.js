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
  async getAll(sort) {
    switch (sort) {
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
    ).populate("user");
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
        tags: body.tags.split(","),
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
}

export default new PostService();
