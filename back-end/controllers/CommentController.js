import { CommentService } from "../services/index.js";
export const create = async (req, res) => {
  try {
    const comment = CommentService.create(req.body);
    res.status(200).json(comment);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Something wrong",
    });
  }
};
