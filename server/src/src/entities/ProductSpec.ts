// backend/src/entities/ProductSpec.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Product } from "./Product";

@Entity()
export class ProductSpec {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ nullable: false })
    spec!: string;

    @ManyToOne(() => Product, (product) => product.specs, { onDelete: 'CASCADE' })
    product!: Product;
}