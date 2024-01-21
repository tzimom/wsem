import { Router } from "express";
import languagesController from "../controllers/languages.controller";

const router = Router();

router.get('/', languagesController.getAll);
router.get('/:languageId', languagesController.getById);

export default { router };
