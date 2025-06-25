// src/controllers/orderController.ts
import { Request, Response } from "express";
import { AppDataSource } from "../config/database";
import { Cart, Order, OrderItem } from "../entities";
import { OrderStatus } from "../enums";

export const createOrderFromCart = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const cartRepo = AppDataSource.getRepository(Cart);
    const orderRepo = AppDataSource.getRepository(Order);
    const orderItemRepo = AppDataSource.getRepository(OrderItem);

    const cart = await cartRepo.findOne({
      where: { user: { id: userId }, isActive: true },
      relations: ["items", "items.product"],
    });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Carrito vacío." });
    }

    const total = cart.items.reduce((sum, item) => sum + item.quantity * item.product.price, 0);

    const order = orderRepo.create({ user: { id: userId }, total, status: OrderStatus.Pendiente });
    await orderRepo.save(order);

    const orderItems = cart.items.map(item =>
      orderItemRepo.create({
        order,
        product: item.product,
        quantity: item.quantity,
        priceAtPurchase: item.product.price,
      })
    );

    await orderItemRepo.save(orderItems);

    // ✅ Desactivar el carrito usado
    cart.isActive = false;
    await cartRepo.save(cart);

    // ✅ Crear nuevo carrito activo
    const newCart = cartRepo.create({
      user: { id: userId },
      isActive: true,
    });
    await cartRepo.save(newCart);

    const savedOrder = await orderRepo.findOne({
  where: { id: order.id },
  relations: ["items", "items.product"]
});

    return res.status(201).json({ order: savedOrder });
  } catch (error) {
    console.error("Create order error:", error);
    return res.status(500).json({ message: "Error al crear la orden." });
  }
};

export const getOrdersByUser = async (req: Request, res: Response) => {
  try {
    const user = req.user; // viene del middleware authenticateToken
    if (!user) return res.status(401).json({ message: "Usuario no autenticado" });

    const orderRepository = AppDataSource.getRepository(Order);

    const orders = await orderRepository.find({
      where: { user: { id: user.id } },
      relations: ["items", "items.product"],
      order: { createdAt: "DESC" },
    });

    res.json({ orders });
  } catch (error) {
    console.error("Error al obtener órdenes:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Obtener una orden específica por su ID (del usuario autenticado)
export const getOrderById = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    const orderId = parseInt(req.params.orderId);

    if (!user) return res.status(401).json({ message: "Usuario no autenticado" });

    const orderRepository = AppDataSource.getRepository(Order);

    const order = await orderRepository.findOne({
      where: { id: orderId, user: { id: user.id } },
      relations: ["items", "items.product"],
    });

    if (!order) {
      return res.status(404).json({ message: "Orden no encontrada" });
    }

    res.json({ order });
  } catch (error) {
    console.error("Error al obtener la orden:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};


