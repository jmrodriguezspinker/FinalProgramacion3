import { Router } from "express";
import {
  getUserCart,
  addItemToCart,
  removeItemFromCart,
  updateItemQuantity,
  clearCart,
} from "../controllers";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = Router();

router.use(authenticateToken);

router.get("/", getUserCart);
router.post("/add", addItemToCart);
router.post("/remove", removeItemFromCart);
router.put("/update", updateItemQuantity);
router.delete("/clear", clearCart);

export const cartRouter = router;

export default router;

