// backend/src/routes/authRoutes.ts
import { Router } from "express";
import { login, createUser, readUser, updateUser, deleteUser } from "../controllers/authController";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = Router();

router.post("/login", login);
router.post("/signup", createUser);
/**
 * * Se agregaron las siguinetes rutas.
 */
router.get("/profile", authenticateToken, readUser);
router.put("/profile", authenticateToken, updateUser);
router.delete("/profile", authenticateToken, deleteUser);

export const authRouter = router; 

export default router;