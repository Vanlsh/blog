import { Router } from "express";
import { registerValidator, loginValidator } from "../validations/auth.js";
import {
  handleValidationErrors,
  checkAuth,
  upload,
} from "../middleware/index.js";
import {
  UserController,
  PostController,
  CommentController,
} from "../controllers/index.js";
import { postCreateValidator } from "../validations/post.js";
import { commentCreateValidator } from "../validations/comment.js";

export const router = new Router();

router.post(
  "/auth/login",
  loginValidator,
  handleValidationErrors,
  UserController.login
);
router.post(
  "/auth/register",
  upload.single("image"),
  registerValidator,
  handleValidationErrors,
  UserController.register
);
router.get("/auth/me", checkAuth, UserController.getMe);

// post`s routes
router.get("/posts", PostController.getAll);
router.get("/tags", PostController.getLastTags);
router.get("/post/:id", PostController.getOne);
router.get("/post/comment/:id", PostController.getPostComments);
router.post(
  "/post",
  checkAuth,
  upload.single("image"),
  postCreateValidator,
  handleValidationErrors,
  PostController.create
);

router.delete("/post/:id", checkAuth, PostController.remove);
router.patch(
  "/post/:id",
  checkAuth,
  upload.single("image"),
  postCreateValidator,
  handleValidationErrors,
  PostController.update
);

router.post("/uploads", checkAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});
router.patch(
  "/uploads/:id",
  checkAuth,
  upload.single("image"),
  PostController.updateImage
);
router.post(
  "/comment",
  checkAuth,
  commentCreateValidator,
  handleValidationErrors,
  CommentController.create
);
router.get("/comments", CommentController.getComments);
router.patch("/comments/:id", CommentController.updateComment);
router.patch("/comments/delete/:commentId", CommentController.removeComment);
