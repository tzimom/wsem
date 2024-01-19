import { Router } from "express";
import authController from "../controllers/auth.controller";
import { authenticateToken, requireClearance } from "../middleware/auth.middleware";

const router = Router();

router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.put('/password', authenticateToken, authController.updatePassword);
router.post('/reset-password', requireClearance(3), authController.resetPassword);

export default { router };
