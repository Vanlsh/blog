import { body } from "express-validator";

export const commentCreateValidator = [
  body("id", "Id can't be empty").isString(),
  body("comment", "Comment can't be empty").isString(),
];
