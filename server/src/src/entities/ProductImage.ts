// backend/src/entities/ProductImage.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Product } from "./Product";

@Entity()
export class ProductImage {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ nullable: false })
    url!: string;

    @ManyToOne(() => Product, (product) => product.imgs, { onDelete: 'CASCADE' })
    product!: Product;
}