// backend/src/routes/productRoutes.ts
/**
 * ? Se comentó porque no lo necesitaba.
 */
import { Router } from "express";
/* import {
    getProducts
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    createReview,
    getReviewsByProductId,
    getProductDetailsByIds // <--- ¡Asegúrate de que esta línea esté presente!
} from "../controllers/productController"; */
import { getProducts } from "../controllers/productController";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = Router();

// Rutas públicas para obtener productos
router.get("/", getProducts);
/* router.get("/:id", getProductById);

// Rutas protegidas para CRUD de productos (ej. solo para administradores)
// Aquí podrías añadir un middleware de autorización (ej. authorizeRoles(['admin']))
router.post("/", authenticateToken, createProduct); // Debería ser para admin
router.put("/:id", authenticateToken, updateProduct); // Debería ser para admin
router.delete("/:id", authenticateToken, deleteProduct); // Debería ser para admin

// Rutas para reseñas
router.get("/:productId/reviews", getReviewsByProductId);
router.post("/:productId/reviews", authenticateToken, createReview); // Asumiendo que solo usuarios logueados pueden reseñar

// *** NUEVA RUTA: Para obtener detalles de productos por una lista de IDs ***
router.post("/details-by-ids", getProductDetailsByIds); // <--- ¡Esta línea debe estar! */

export const productRouter = router;

export default router;