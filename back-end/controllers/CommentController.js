import { CommentService } from "../services/index.js";
export const create = async (req, res) => {
  try {
    const comment = await CommentService.create(req.body, req.userId);
    res.status(200).json(comment);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Something wrong",
    });
  }
};

export const getComments = async (req, res) => {
  try {
    const comments = await CommentService.getComments();
    res.status(200).json(comments);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Something wrong",
    });
  }
};
export const updateComment = async (req, res) => {
  try {
    const comment = await CommentService.update(
      req.params.id,
      req.body.comment
    );
    res.status(200).json(comment);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Something wrong",
    });
  }
};
export const removeComment = async (req, res) => {
  try {
    const comment = await CommentService.remove(
      req.params.commentId,
      req.body.postId
    );
    res.status(200).json(comment);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Something wrong",
    });
  }
};
