import CommentModel from "../models/Comment.js";
import PostModel from "../models/Post.js";
class CommentService {
  async create({ id, comment }, userId) {
    if (!comment) {
      return { message: "Comment can`t be empty!" };
    }
    const newComment = new CommentModel({ comment, user: userId });
    await newComment.save();
    try {
      await PostModel.findByIdAndUpdate(id, {
        $push: { comments: newComment._id },
      });
    } catch (error) {
      console.log(error);
    }
    return newComment.populate("user", "fullName avatarUrl");
  }
  async getComments() {
    const comments = CommentModel.find()
      .populate("user", "fullName avatarUrl")
      .sort({ createdAt: -1 })
      .limit(5);
    return comments;
  }
  async remove(id) {
    return await PostModel.findByIdAndDelete(id);
  }
}

export default new CommentService();
