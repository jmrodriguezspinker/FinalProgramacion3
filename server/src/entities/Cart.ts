import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn,
  UpdateDateColumn, ManyToOne, OneToMany
} from "typeorm";
import { CartItem, User } from "./";

@Entity("carts")
export class Cart {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, user => user.carts, { onDelete: "CASCADE" })
  user!: User;

  @Column({ type: "boolean", default: true })
  isActive!: boolean;

   @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToMany(() => CartItem, item => item.cart)
  items!: CartItem[];
}
