// src/controllers/cartController.ts
import { Request, Response } from "express";
import { AppDataSource } from "../config/database";
import { Cart, CartItem, Product, User } from "../entities";

export const getUserCart = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const cartRepo = AppDataSource.getRepository(Cart);

    const cart = await cartRepo.findOne({
      where: { user: { id: userId }, isActive: true },
      relations: ["items", "items.product"],
    });

    return res.json(cart ?? {});
  } catch (error) {
    console.error("Get cart error:", error);
    return res.status(500).json({ message: "Error al obtener el carrito." });
  }
};

export const addItemToCart = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { productId, quantity } = req.body;

    const productIdNum = Number(productId);
    const quantityNum = Number(quantity);

    if (isNaN(productIdNum) || isNaN(quantityNum)) {
      return res.status(400).json({ message: "Datos inválidos" });
    }

    const cartRepo = AppDataSource.getRepository(Cart);
    const itemRepo = AppDataSource.getRepository(CartItem);
    const productRepo = AppDataSource.getRepository(Product);
    const userRepo = AppDataSource.getRepository(User);

    let cart = await cartRepo.findOne({
      where: { user: { id: userId }, isActive: true },
      relations: ["user"]
    });

    if (!cart) {
      const user = await userRepo.findOneByOrFail({ id: userId });
      cart = cartRepo.create({ user, isActive: true });
      await cartRepo.save(cart);
    }

    const existingItem = await itemRepo.findOne({
      where: {
        cart: { id: cart.id },
        product: { id: productIdNum }
      },
      relations: ["product"]
    });

    if (existingItem) {
      existingItem.quantity += quantity;
      await itemRepo.save(existingItem);
    } else {
      const product = await productRepo.findOneByOrFail({ id: productIdNum });
const newItem = itemRepo.create({ cart, product, quantity: quantityNum });
      await itemRepo.save(newItem);
    }

    return res.status(200).json({ message: "Producto agregado al carrito" });
  } catch (error) {
    console.error("Add item error:", error);
    return res.status(500).json({ message: "Error al agregar al carrito." });
  }
};

export const removeItemFromCart = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { productId } = req.body;

    if (!userId || !productId) {
      return res.status(400).json({ message: "Faltan datos necesarios." });
    }

    const cartRepo = AppDataSource.getRepository(Cart);
    const itemRepo = AppDataSource.getRepository(CartItem);

    const cart = await cartRepo.findOne({
      where: { user: { id: userId }, isActive: true },
      relations: ["items", "items.product"],
    });

    if (!cart) {
      return res.status(404).json({ message: "Carrito no encontrado." });
    }

    const itemToRemove = cart.items.find(item => item.product.id === productId);

    if (!itemToRemove) {
      return res.status(404).json({ message: "Producto no encontrado en el carrito." });
    }

    await itemRepo.remove(itemToRemove);

    return res.json({ message: "Producto eliminado del carrito." });
  } catch (error) {
    console.error("❌ Error al eliminar producto del carrito:", error);
    return res.status(500).json({ message: "Error interno al eliminar producto." });
  }
};



export const updateItemQuantity = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { productId, quantity } = req.body;

    if (!userId || !productId || quantity === undefined || quantity < 1) {
      return res.status(400).json({ message: "Datos inválidos para actualizar cantidad." });
    }

    const cartRepo = AppDataSource.getRepository(Cart);
    const itemRepo = AppDataSource.getRepository(CartItem);
    const productRepo = AppDataSource.getRepository(Product); // Asegúrate de importar tu entidad Product

    const cart = await cartRepo.findOne({
      where: { user: { id: userId }, isActive: true },
      relations: ["items", "items.product"],
    });

    if (!cart) {
      return res.status(404).json({ message: "Carrito no encontrado." });
    }

    const itemToUpdate = cart.items.find(item => item.product.id === productId);
    if (!itemToUpdate) {
      return res.status(404).json({ message: "Producto no encontrado en el carrito." });
    }

    const product = await productRepo.findOneBy({ id: productId });
    if (!product) {
      return res.status(404).json({ message: "Producto no existe." });
    }

    if (quantity > product.inStock) {
      return res.status(400).json({
        message: `Solo hay ${product.inStock} unidades disponibles en stock.`,
      });
    }

    itemToUpdate.quantity = quantity;
    await itemRepo.save(itemToUpdate);

    return res.json({ message: "Cantidad actualizada correctamente." });
  } catch (error) {
    console.error("❌ Error al actualizar cantidad:", error);
    return res.status(500).json({ message: "Error interno al actualizar cantidad." });
  }
};


export const clearCart = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "No autorizado." });
    }

    const cartRepo = AppDataSource.getRepository(Cart);
    const itemRepo = AppDataSource.getRepository(CartItem);

    const cart = await cartRepo.findOne({
      where: { user: { id: userId }, isActive: true },
      relations: ["items"],
    });

    if (!cart || !cart.items.length) {
      return res.json({ message: "El carrito ya está vacío." });
    }

    await itemRepo.remove(cart.items);

    return res.json({ message: "Carrito vaciado correctamente." });
  } catch (error) {
    console.error("❌ Error al vaciar el carrito:", error);
    return res.status(500).json({ message: "Error interno al vaciar carrito." });
  }
};

/* export const updateItemQuantity = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { productId, quantity } = req.body;

    if (!userId || !productId || quantity === undefined || quantity < 1) {
      return res.status(400).json({ message: "Datos inválidos para actualizar cantidad." });
    }

    const cartRepo = AppDataSource.getRepository(Cart);
    const itemRepo = AppDataSource.getRepository(CartItem);

    const cart = await cartRepo.findOne({
      where: { user: { id: userId }, isActive: true },
      relations: ["items", "items.product"],
    });

    if (!cart) {
      return res.status(404).json({ message: "Carrito no encontrado." });
    }

    const itemToUpdate = cart.items.find(item => item.product.id === productId);

    if (!itemToUpdate) {
      return res.status(404).json({ message: "Producto no encontrado en el carrito." });
    }

    itemToUpdate.quantity = quantity;
    await itemRepo.save(itemToUpdate);

    return res.json({ message: "Cantidad actualizada correctamente." });
  } catch (error) {
    console.error("❌ Error al actualizar cantidad:", error);
    return res.status(500).json({ message: "Error interno al actualizar cantidad." });
  }
}; */
