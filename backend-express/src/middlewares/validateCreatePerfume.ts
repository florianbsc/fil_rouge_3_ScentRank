import { body } from "express-validator";

export const validateCreatePerfume = [
  body("name")
    .notEmpty().withMessage("Name is required")
    .isString().withMessage("Name must be a string"),

  body("brand")
    .optional()
    .isString().withMessage("Brand must be a string"),

  body("price")
    .optional()
    .isFloat({ min: 0 }).withMessage("Price must be a positive number"),

  body("releaseDate")
    .optional()
    .isISO8601().withMessage("Release date must be a valid date"),

  body("gender")
    .isIn(["male", "female", "unisex"]).withMessage("Gender must be male, female, or unisex"),

  body("imageUrl")
    .optional()
    .isURL().withMessage("Image must be a valid URL"),

  body("olfactoryFam")
    .optional()
    .isArray().withMessage("OlfactoryFam must be an array of strings"),

  body("olfactoryNotes.top")
    .optional()
    .isArray().withMessage("Top notes must be an array"),

  body("olfactoryNotes.heart")
    .optional()
    .isArray().withMessage("Heart notes must be an array"),

  body("olfactoryNotes.base")
    .optional()
    .isArray().withMessage("Base notes must be an array"),
];
