import CommentModel from "../models/Comment.js";
import PostModel from "../models/Post.js";
class CommentService {
  async create({ postId, comment }) {
    if (!comment) {
      return { message: "Comment can`t be empty!" };
    }
    const newComment = new CommentModel({ comment });
    await newComment.save();
    try {
      await PostModel.findByIdAndUpdate(postId, {
        $push: { comments: newComment._id },
      });
    } catch (error) {
      console.log(error);
    }
    return newComment;
  }
}

export default new CommentService();
