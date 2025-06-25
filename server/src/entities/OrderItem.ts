import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne
} from "typeorm";
import { Order } from "./Order";
import { Product } from "./Product";

@Entity("order_items")
export class OrderItem {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Order, order => order.items, { onDelete: "CASCADE" })
  order!: Order;

  @ManyToOne(() => Product, product => product.orderItems)
  product!: Product;

  @Column({ type: "tinyint" })
  quantity!: number;

  @Column({ type: "decimal", precision: 10, scale: 2, transformer: {
    to: (value: number) => value,
    from: (value: string) => parseFloat(value),
  } })
  priceAtPurchase!: number;
}


