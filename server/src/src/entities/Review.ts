// backend/src/entities/Review.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from "typeorm";
import { Product } from "./Product";
import { User } from "./User"; // Asegúrate de que esta importación sea correcta

@Entity()
export class Review {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ nullable: false })
    reviewerName!: string; // Nombre del revisor (si no es usuario logueado o para mostrar)

    @Column({ nullable: false })
    title!: string; // Título de la reseña

    @Column({ type: "int", nullable: true })
    rating?: number; // Calificación de la reseña (opcional)

    @Column({ type: "text", nullable: true })
    comment?: string; // Contenido/cuerpo de la reseña (opcional)

    // Relación ManyToOne con Product: Una reseña pertenece a un producto.
    // onDelete: 'CASCADE' significa que si el producto se elimina, sus reseñas también lo harán.
    @ManyToOne(() => Product, (product) => product.reviews, { onDelete: 'CASCADE' })
    @JoinColumn() // Se usa para especificar la columna de unión en la base de datos
    product!: Product;

    // Relación ManyToOne con User: Una reseña puede ser de un usuario registrado.
    // nullable: true significa que la reseña puede no tener un usuario asociado (ej. reseña de invitado).
    // onDelete: 'SET NULL' significa que si un usuario se elimina, las reseñas que dejó no se borran,
    // sino que su campo 'user' se establece en NULL.
    //
    // CORRECCIÓN CLAVE: Permitimos que 'user' sea User, null o undefined
    // para manejar correctamente los casos donde findOneBy devuelve 'null'.
    @ManyToOne(() => User, (user) => user.reviews, { nullable: true, onDelete: 'SET NULL' })
    @JoinColumn() // Se usa para especificar la columna de unión en la base de datos
    user?: User | null; // Ahora acepta 'User', 'null' o 'undefined'
    
    @CreateDateColumn()
    createdAt!: Date; // Columna para la fecha de creación de la reseña
}