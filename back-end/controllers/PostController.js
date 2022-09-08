import { PostService } from "../services/index.js";
import { PostController } from "./index.js";

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
    const posts = await PostService.getAll(req.query);
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json("Error");
  }
};

export const getOne = async (req, res) => {
  try {
    const post = await PostService.getOne(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json("Error");
  }
};

export const remove = async (req, res) => {
  try {
    const test = await PostService.remove(req.params.id);
    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json("Error");
  }
};

export const update = async (req, res) => {
  try {
    await PostService.update(req.params.id, req.body, req.userId);
    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json("Error");
  }
};

export const getLastTags = async (req, res) => {
  try {
    const tags = await PostService.getLastTags();
    res.status(200).json(tags);
  } catch (error) {
    console.log(error);
    res.status(500).json("Error");
  }
};
export const getPostComments = async (req, res) => {
  try {
    const comments = await PostService.getPostComments(req.params.id);
    res.status(200).json(comments);
  } catch (error) {
    console.log(error);
    res.status(500).json("Error");
  }
};
