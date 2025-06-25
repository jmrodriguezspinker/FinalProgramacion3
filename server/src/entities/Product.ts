// backend/src/entities/Product.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { CartItem, OrderItem } from './';
import { ProductCategory, ProductGenre } from "../enums";

@Entity("products")
export class Product {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 50 })
    title!: string;

    @Column("decimal", { precision: 10, scale: 2, nullable: false })
    price!: number;

    @Column({ type: "tinytext", nullable: true })
    description?: string; // Nuevo campo opcional

    @Column({ type: 'varchar', length: 50 })
    brand!: string;

    @Column({ type: 'varchar', length: 200 })
    img!: string;

    @Column({
        type: "enum",
        enum: ProductCategory,
    })
    category!: ProductCategory;

    @Column({ type: "int", default: 0 })
    inStock!: number; // Control de inventario

    /* @Column({
        type: "enum",
        enum: ProductGenre,
    })
    genre!: ProductGenre; */

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @OneToMany(() => CartItem, item => item.product)
    cartItems!: CartItem[];

    @OneToMany(() => OrderItem, item => item.product)
    orderItems!: OrderItem[];
}