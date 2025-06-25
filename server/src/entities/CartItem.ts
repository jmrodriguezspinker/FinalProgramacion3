import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Unique } from "typeorm";
import { Cart, Product } from "./";


@Entity("cart_items")
@Unique(["cart", "product"]) // Para reflejar el índice único cart_id + product_id
export class CartItem {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Cart, cart => cart.items, { onDelete: "CASCADE" })
  cart!: Cart;

  @ManyToOne(() => Product, product => product.cartItems)
  product!: Product;

  @Column({ type: "tinyint" })
  quantity!: number;
}
