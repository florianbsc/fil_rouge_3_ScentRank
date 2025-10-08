import { body } from "express-validator";

export const validateCreatePerfume = [
  body("name").notEmpty().withMessage("Le nom est obligatoire"),
  body("brand").notEmpty().withMessage("La marque est obligatoire"),
  body("price").optional().isNumeric().withMessage("Le prix doit être un nombre"),
];
