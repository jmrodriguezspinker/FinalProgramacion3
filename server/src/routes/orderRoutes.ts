import { Router } from "express";
import {
    createOrderFromCart,
    getOrdersByUser, 
    getOrderById
} from "../controllers";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = Router();

router.use(authenticateToken);

router.post("/", createOrderFromCart);          // Crear orden desde el carrito actual
router.get("/user", getOrdersByUser);               // Obtener todas las órdenes del usuario
router.get("/:orderId", getOrderById);          // Obtener una orden específica por ID

export const orderRouter = router;

export default router;


