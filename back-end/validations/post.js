import { body } from "express-validator";

export const postCreateValidator = [
  body("title", "Write title").isLength({ min: 3 }).isString(),
  body("text", "Write text").isLength({ min: 10 }).isString(),
  body("tags", "Wrong format of tags").optional().isString(),
  body("image", "Add correct link").optional().isString(),
];
