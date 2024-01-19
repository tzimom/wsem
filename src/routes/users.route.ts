import { Router } from "express";
import usersController from "../controllers/users.controller";
import { authenticateToken, requireClearance } from "../middleware/auth.middleware";

const router = Router();

router.post('/', requireClearance(2), usersController.createUser);
router.get('/me', authenticateToken, usersController.getSelfUser);
//router.get('/me/word-progress', authenticateToken, usersController.getWordProgress);
//router.post('/me/word-progress', authenticateToken, usersController.postWordProgress);

export default { router };
