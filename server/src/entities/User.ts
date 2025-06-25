// backend/src/entities/User.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { Cart, Order } from "./";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 100, unique: true, nullable: false })
    email!: string;
    /**
     * ! La longitud debe ser larga, pues la contraseña está hasheada
     */
    @Column({ type: 'varchar', length: 200, nullable: false })
    password!: string; // Contraseña hasheada
    /**
     * ? Nullable: true ---> Puede estar ausente.
     * ! Nullable: false ---> NO debe estar ausente.
     */
    @Column({ type: 'varchar', length: 50, nullable: true })
    firstName!: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    lastName?: string;

    @OneToMany(() => Order, (order) => order.user)
    orders!: Order[];

    @OneToMany(() => Cart, cart => cart.user)
    carts!: Cart[];

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}