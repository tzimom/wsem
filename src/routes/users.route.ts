import { Router } from "express";
import usersController from "../controllers/users.controller";
import { authenticateToken, requireClearance } from "../middleware/auth.middleware";

const router = Router();

router.post('/', requireClearance(2), usersController.create);
router.get('/me', authenticateToken, usersController.getSelf);

export default { router };
