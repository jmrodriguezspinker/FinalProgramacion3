import "reflect-metadata"; // Importante para TypeORM
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { AppDataSource } from "./config/database";
// Importa tus rutas existentes
import * as routes from "./routes";
// *** NUEVA IMPORTACIÓN: Rutas para la subida de archivos ***
import path from 'path'; // Necesario para `express.static`

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json()); // Para parsear el body de las peticiones JSON


app.use("/images", express.static(path.join(__dirname, "images")));//?Para accdecer a imágenes

// Rutas de la API
app.use("/api/auth", routes.authRouter);
app.use("/api/products", routes.productRouter);
app.use("/api/order", routes.orderRouter);
app.use("/api/cart", routes.cartRouter);
app.use("/api", routes.contactRouter);
// *** NUEVA RUTA: Para la subida de archivos ***
//app.use("/api/uploads", uploadRoutes);

// Conectar a la base de datos y levantar el servidor
AppDataSource.initialize()
    .then(() => {
        console.log("Database connected successfully!");
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    
    .catch((error) => {
        // console.log(typeof process.env.DATABASE_PASSWORD); // debe imprimir 'string'
        // console.log(process.env.DATABASE_PASSWORD); 
        console.log("Database connection error: ", error);
    });
