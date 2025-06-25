// backend/src/config/database.ts
import "reflect-metadata"; // Importante para TypeORM
import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { Cart, CartItem, Order, OrderItem, Product, User } from "../entities";
/**
 * ! Arriba cambios junto con entities, más abajo.
 */

dotenv.config();

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT || "3306"),
    username: process.env.DATABASE_USERNAME,
    //password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    synchronize: true, // ¡ATENCIÓN! Usar `true` solo en desarrollo para que TypeORM cree las tablas automáticamente. En producción, usa migraciones.
    logging: false, // Puedes cambiar a true para ver las queries SQL en la consola
    //entities: ['src/entities/*.ts'],
    entities: [Cart, CartItem, Order, OrderItem, Product, User],
    migrations: ['src/migrations/*.ts'], // Aquí irían tus migraciones en producción
    subscribers: [],
});