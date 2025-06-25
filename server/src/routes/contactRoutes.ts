// backend/src/routes/contactRoutes.ts
import { Router } from "express";
import { sendEmail } from "../controllers";

const router = Router();

router.post("/send-email", sendEmail);

export const contactRouter = router;

export default router;
