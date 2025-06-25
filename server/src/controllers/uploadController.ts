import { Request, Response } from 'express';
import multer from 'multer';
import path from 'path'; // Módulo 'path' para manejar rutas de archivos

// Configuración de Multer para el almacenamiento de archivos
// Los archivos se guardarán en la carpeta 'uploads' en la raíz de tu backend
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // La carpeta 'uploads' se creará automáticamente si no existe.
        // Asegúrate de que tu aplicación tenga permisos de escritura en esta carpeta.
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        // Genera un nombre de archivo único para evitar colisiones:
        // 'nombreoriginal-timestamp.extension'
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Filtro de archivos para aceptar solo imágenes
const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    // Aceptar solo archivos con estas extensiones o tipos MIME
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        return cb(new Error('Solo se permiten imágenes (jpeg, jpg, png, gif)'));
        
    }
};

// Configuración final de Multer: para una sola imagen con el nombre de campo 'image'
const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 }, // Límite de tamaño de archivo (5MB)
    fileFilter: fileFilter
}).single('image'); // 'image' es el nombre del campo en el formulario que contendrá el archivo

// Controlador para la subida de una imagen
export const uploadImage = (req: Request, res: Response) => {
    upload(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            // Un error específico de Multer
            return res.status(500).json({ message: err.message });
        } else if (err) {
            // Otros errores desconocidos (ej. por fileFilter)
            return res.status(500).json({ message: err.message });
        }

        // Si no hay archivo subido
        if (!req.file) {
            return res.status(400).json({ message: 'No se ha subido ningún archivo.' });
        }

        // Si la subida es exitosa, devuelve la URL de la imagen
        // La URL será algo como: http://localhost:5000/uploads/nombre-de-archivo-unico.jpg
        const imageUrl = `/uploads/${req.file.filename}`;
        res.status(200).json({
            message: 'Imagen subida exitosamente',
            imageUrl: imageUrl
        });
    });
};