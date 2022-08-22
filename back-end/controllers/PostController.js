import PostModel from "../models/Post.js";
import { PostService, UserService } from "../services/index.js";
export const create = async (req, res) => {
  try {
    const post = await PostService.create(req.body, req.userId);
    res.status(200).json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json("Error");
  }
};

export const getAll = async (req, res) => {
  try {
    let posts;
    const type = req.query.sort;
    console.log(type);
    if (type === "popular") {
      posts = await PostModel.find()
        .populate("user")
        .sort({ viewsCount: -1 })
        .exec();

      res.json(posts);
    } else {
      posts = await PostModel.find()
        .populate("user")
        .sort({ updatedAt: -1 })
        .exec();
      res.json(posts);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json("Error");
  }
};

export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;
    PostModel.findByIdAndUpdate(
      {
        _id: postId,
      },
      {
        $inc: { viewsCount: 1 },
      },
      {
        returnDocument: "after",
      },
      (err, doc) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            message: "Failed to retrieve article",
          });
        }
        if (!doc) {
          return res.status(404).json({
            message: "Article not found",
          });
        }
        res.status(200).json(doc);
      }
    ).populate("user");
  } catch (error) {
    console.log(error);
    res.status(500).json("Error");
  }
};

export const remove = (req, res) => {
  try {
    const postId = req.params.id;
    PostModel.findByIdAndDelete(
      {
        _id: postId,
      },
      (err, doc) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            message: "Failed to delete",
          });
        }
        if (!doc) {
          return res.status(404).json({
            message: "Article not found",
          });
        }
        res.status(200).json({ success: true });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json("Error");
  }
};

export const update = async (req, res) => {
  try {
    const postId = req.params.id;
    await PostModel.updateOne(
      {
        _id: postId,
      },
      {
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        tags: req.body.tags.split(","),
        user: req.userId,
      }
    );
    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json("Error");
  }
};

export const getLastTags = async (req, res) => {
  try {
    const posts = await PostModel.find().limit(5).exec();
    const tags = posts
      .map((obj) => obj.tags)
      .flat()
      .slice(0, 5);
    res.status(200).json(tags);
  } catch (error) {
    console.log(error);
    res.status(500).json("Error");
  }
};

export const sorted = async (req, res) => {
  try {
    let posts;
    const type = req.params.sort;
    if (type === "popular") {
      posts = await PostModel.find()
        .populate("user")
        .sort({ viewsCount: -1 })
        .exec();
      res.json(posts);
    } else {
      posts = await PostModel.find()
        .populate("user")
        .sort({ updatedAt: -1 })
        .exec();
      res.json(posts);
    }
  } catch (error) {
    console.log(error);
  }
};
