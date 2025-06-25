// backend/src/controllers/productController.ts
import { Request, Response } from "express";
import { AppDataSource } from "../config/database";
import { Product } from "../entities/Product";
import { User } from "../entities/User";
import { In } from "typeorm";


const productRepository = AppDataSource.getRepository(Product);

/**
 * ! Lo comentado a continuación sirve para otra extructura de datos.
 */
/* export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await productRepository.find({
            relations: ["imgs", "specs", "reviews"], // Cargar relaciones
        });
        // Formatear las imágenes y specs para que coincidan con ProductType del frontend
        const formattedProducts = products.map(product => ({
            ...product,
            // Asegura que imgs sea un array de strings
            imgs: Array.isArray(product.imgs) ? product.imgs.map(img => img.url) : [],
            specs: product.specs?.map(spec => spec.spec) || [],
        }));
        res.status(200).json({products: formattedProducts});
    } catch (error) {
        console.error("Get products error:", error);
        res.status(500).json({ message: "Failed to fetch products." });
    }
}; */

export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await productRepository.find({
        });
        // Formatear las imágenes y specs para que coincidan con ProductType del frontend
        const formattedProducts = products.map(product => ({
            ...product,
            // Asegura que imgs sea un array de strings
        }));
        res.status(200).json({products: formattedProducts});
    } catch (error) {
        console.error("Get products error:", error);
        res.status(500).json({ message: "Failed to fetch products." });
    }
};

/**
 * ? Comenté lo que sigue que no estaba usando.
 */

/* export const getProductById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const product = await productRepository.findOne({
            where: { id: parseInt(id) },
            relations: ["imgs", "specs", "reviews"],
        });
        if (!product) {
            return res.status(404).json({ message: "Product not found." });
        }
        // Formatear las imágenes y specs
        const formattedProduct = {
            ...product,
            // Asegura que imgs sea un array de strings
            imgs: Array.isArray(product.imgs) ? product.imgs.map(img => img.url) : [],
            specs: product.specs?.map(spec => spec.spec) || [],
        };
        res.status(200).json(formattedProduct);
    } catch (error) {
        console.error("Error fetching product by ID:", error);
        res.status(500).json({ message: "Failed to fetch product." });
    }
};

export const createProduct = async (req: Request, res: Response) => {
    const { title, category, price, inStock, imgs, specs, Brand, RAM, Language, Genre, eta } = req.body;

    try {
        const newProduct = new Product();
        newProduct.title = title;
        newProduct.category = category;
        newProduct.price = price;
        newProduct.inStock = inStock;
        newProduct.brand = Brand;
        //newProduct.ram = RAM;
        //newProduct.language = Language;
        newProduct.genre = Genre;
        //newProduct.eta = eta;

        // Guardar el producto principal primero
        await productRepository.save(newProduct);

        // Guardar imágenes
        if (imgs && Array.isArray(imgs)) {
            const productImages = imgs.map((url: string) => {
                const img = new ProductImage();
                img.url = url;
                img.product = newProduct;
                return img;
            });
            await productImageRepository.save(productImages);
            newProduct.imgs = productImages; // Asignar al producto
        }

        // Guardar especificaciones
        if (specs && Array.isArray(specs)) {
            const productSpecs = specs.map((specStr: string) => {
                const spec = new ProductSpec();
                spec.spec = specStr;
                spec.product = newProduct;
                return spec;
            });
            await productSpecRepository.save(productSpecs);
            newProduct.specs = productSpecs; // Asignar al producto
        }

        // Cargar las relaciones recién guardadas para la respuesta
        const savedProduct = await productRepository.findOne({
            where: { id: newProduct.id },
            relations: ["imgs", "specs"],
        });

        const formattedSavedProduct = {
            ...savedProduct!, // Usamos ! porque estamos seguros que savedProduct existe
            // Asegura que imgs sea un array de strings
            imgs: Array.isArray(savedProduct!.imgs) ? savedProduct!.imgs.map(img => img.url) : [],
            specs: savedProduct!.specs?.map(spec => spec.spec) || [],
        };

        res.status(201).json(formattedSavedProduct);
    } catch (error) {
        console.error("Create product error:", error);
        res.status(500).json({ message: "Failed to create product." });
    }
};

export const updateProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, category, price, inStock, imgs, specs, Brand, RAM, Language, Genre, eta } = req.body;

    try {
        const productToUpdate = await productRepository.findOne({
            where: { id: parseInt(id) },
            relations: ["imgs", "specs"],
        });

        if (!productToUpdate) {
            return res.status(404).json({ message: "Product not found." });
        }

        productToUpdate.title = title ?? productToUpdate.title;
        productToUpdate.category = category ?? productToUpdate.category;
        productToUpdate.price = price ?? productToUpdate.price;
        productToUpdate.inStock = inStock ?? productToUpdate.inStock;
        productToUpdate.brand = Brand ?? productToUpdate.brand;
        //productToUpdate.ram = RAM ?? productToUpdate.ram;
        //productToUpdate.language = Language ?? productToUpdate.language;
        productToUpdate.genre = Genre ?? productToUpdate.genre;
        //productToUpdate.eta = eta ?? productToUpdate.eta;

        await productRepository.save(productToUpdate);

        // Actualizar imágenes: borrar las viejas y guardar las nuevas
        if (imgs !== undefined) {
            await productImageRepository.delete({ product: productToUpdate });
            if (imgs && Array.isArray(imgs) && imgs.length > 0) {
                const newImages = imgs.map((url: string) => {
                    const img = new ProductImage();
                    img.url = url;
                    img.product = productToUpdate;
                    return img;
                });
                await productImageRepository.save(newImages);
            }
        }

        // Actualizar especificaciones: borrar las viejas y guardar las nuevas
        if (specs !== undefined) {
            await productSpecRepository.delete({ product: productToUpdate });
            if (specs && Array.isArray(specs) && specs.length > 0) {
                const newSpecs = specs.map((specStr: string) => {
                    const spec = new ProductSpec();
                    spec.spec = specStr;
                    spec.product = productToUpdate;
                    return spec;
                });
                await productSpecRepository.save(newSpecs);
            }
        }

        const updatedProduct = await productRepository.findOne({
            where: { id: parseInt(id) },
            relations: ["imgs", "specs"],
        });

        const formattedUpdatedProduct = {
            ...updatedProduct!,
            // Asegura que imgs sea un array de strings
            imgs: Array.isArray(updatedProduct!.imgs) ? updatedProduct!.imgs.map(img => img.url) : [],
            specs: updatedProduct!.specs?.map(spec => spec.spec) || [],
        };

        res.status(200).json(formattedUpdatedProduct);
    } catch (error) {
        console.error("Update product error:", error);
        res.status(500).json({ message: "Failed to update product." });
    }
};

export const deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const productToDelete = await productRepository.findOneBy({ id: parseInt(id) });
        if (!productToDelete) {
            return res.status(404).json({ message: "Product not found." });
        }
        await productRepository.remove(productToDelete);
        res.status(200).json({ message: "Product deleted successfully." });
    } catch (error) {
        console.error("Delete product error:", error);
        res.status(500).json({ message: "Failed to delete product." });
    }
};

export const createReview = async (req: Request, res: Response) => {
    const { productId } = req.params;
    const { title, rating, comment, reviewerName } = req.body;
    // @ts-ignore
    const userId = req.user?.id; // Obtiene el ID del usuario autenticado si existe

    try {
        const product = await productRepository.findOneBy({ id: parseInt(productId) });
        if (!product) {
            return res.status(404).json({ message: "Product not found." });
        }

        let user: User | null | undefined
        if (userId) {
            user = await AppDataSource.getRepository(User).findOneBy({ id: userId });
        }

        const reviewRepository = AppDataSource.getRepository(Review);
        const review = reviewRepository.create({
            title,
            rating,
            comment,
            reviewerName: user ? `${user.firstName} ${user.lastName}`.trim() : reviewerName, // Usar nombre del usuario si está logueado
            product,
            user,
        });

        await reviewRepository.save(review);
        res.status(201).json(review);
    } catch (error) {
        console.error("Create review error:", error);
        res.status(500).json({ message: "Failed to create review." });
    }
};

export const getReviewsByProductId = async (req: Request, res: Response) => {
    const { productId } = req.params;
    try {
        const reviewRepository = AppDataSource.getRepository(Review);
        const reviews = await reviewRepository.find({
            where: { product: { id: parseInt(productId) } },
            relations: ["user"] // Cargar la relación con el usuario si es necesario mostrar algo del usuario
        });
        res.status(200).json(reviews);
    } catch (error) {
        console.error("Get reviews by product ID error:", error);
        res.status(500).json({ message: "Failed to fetch reviews." });
    }
};

// *** FUNCIÓN DE CONTROLADOR PARA OBTENER DETALLES DE PRODUCTOS POR IDS ***
export const getProductDetailsByIds = async (req: Request, res: Response) => {
    const { ids } = req.body; // Esperamos un array de IDs en el cuerpo de la petición POST

    // 1. Validación: Asegurarse de que 'ids' exista y sea un array no vacío
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
        return res.status(400).json({ message: "Se requiere un array de IDs de productos en el cuerpo de la petición." });
    }

    try {
        // 2. Consulta a la base de datos: Usar TypeORM para encontrar productos por sus IDs
        // Cargamos la relación 'imgs' para obtener las URLs de las imágenes
        const products = await productRepository.find({
            where: { id: In(ids) },
            relations: ["imgs"]
        });

        // 3. Formatear la respuesta para que coincida con el ProductType del frontend
        const formattedProducts = products.map(product => ({
            id: product.id,
            title: product.title,
            price: product.price,
            // ASEGURA que imgs sea un array de strings.
            // Si product.imgs es null/undefined o no es un array, se convierte a [].
            // Luego, si es un array, se mapea a sus URLs.
            imgs: Array.isArray(product.imgs) ? product.imgs.map(img => img.url) : [],
            // Puedes añadir otros campos si son necesarios para la visualización del carrito
            // inStock: product.inStock,
            // category: product.category,
        }));

        // 4. Respuesta: Devolver los productos encontrados con sus imágenes formateadas
        res.status(200).json(formattedProducts);
    } catch (error) {
        console.error("Error al obtener detalles de productos por IDs:", error);
        res.status(500).json({ message: "Error interno del servidor al obtener detalles de productos." });
    }
}; */