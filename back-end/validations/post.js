import { body } from "express-validator";

export const postCreateValidator = [
  body("title", "Write title").isLength({ min: 3 }).isString(),
  body("text", "Write text").isLength({ min: 1 }).isString(),
  body("tags", "Wrong format of tags").optional().isString(),
  body("imageUrl", "Ops").optional().isString(),
];
