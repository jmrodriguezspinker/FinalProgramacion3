import { Router } from 'express';
import { uploadImage } from '../controllers/uploadController'; // Importa el controlador de subida

const router = Router();

// Define la ruta POST para subir una imagen
// Cuando el frontend envíe un archivo a /api/uploads/image, Multer lo procesará.
router.post('/image', uploadImage);

export default router;
