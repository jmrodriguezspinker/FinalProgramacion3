import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn,
  UpdateDateColumn, ManyToOne, OneToMany
} from "typeorm";
import { OrderItem, User } from "./";
import { OrderStatus } from "../enums";


@Entity("orders")
export class Order {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, user => user.orders)
  user!: User;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true, transformer: {
    to: (value: number) => value,
    from: (value: string) => parseFloat(value),
  }, })
  total?: number;

  @Column({ type: "enum", enum: OrderStatus, default: OrderStatus.Pendiente })
  status?: OrderStatus;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToMany(() => OrderItem, items => items.order)
  items!: OrderItem[];
}
