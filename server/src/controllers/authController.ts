// backend/src/controllers/authController.ts
import { Request, Response } from "express";
import { AppDataSource } from "../config/database";
import { User } from "../entities/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const userRepository = AppDataSource.getRepository(User);

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required." });
    }

    try {
        const user = await userRepository.findOneBy({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials." });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials." });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET!, {
            expiresIn: "1h",
        });

        // VER SI ESTÁ EL TOKEN
        console.log(`Token enviado: ${token}`);

        const response = {
            message: "Logged in successfully",
            token,
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName
            }
        };

        console.log("Response to client:", response); // Mostrar en consola

        res.status(200).json(response);
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Something went wrong during login." });
    }
};

export const createUser = async (req: Request, res: Response) => {
    const { email, password, firstName, lastName } = req.body;
    const userRepository = AppDataSource.getRepository(User);


    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required." });
    }

    try {
        const existingUser = await userRepository.findOneBy({ email });
        if (existingUser) {
            return res.status(409).json({ message: "User with this email already exists." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = userRepository.create({
            email,
            password: hashedPassword,
            firstName,
            lastName,
        });

        await userRepository.save(user);

        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET!, {
            expiresIn: "1h",
        });

        res.status(201).json({
            message: "User registered successfully",
            token,
            user: { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName },
        });


    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ message: "Something went wrong during registration." });
    }
};

export const readUser = async (req: Request, res: Response) => {
    // @ts-ignore
    const userId = req.user.id; // Asignado por el middleware de auth
    const userRepository = AppDataSource.getRepository(User);


    try {
        const user = await userRepository.findOneBy({ id: userId });
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        res.status(200).json({ id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName });
    } catch (error) {
        console.error("Get user error:", error);
        res.status(500).json({ message: "Something went wrong." });
    }
};

export const updateUser = async (req: Request, res: Response) => {
  const { firstName, lastName } = req.body;
  const userId = req.user?.id; // gracias al middleware


  if (!firstName || !lastName) {
    return res.status(400).json({ message: "Nombre y apellido son requeridos." });
  }

  try {
    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.findOneBy({ id: userId });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    user.firstName = firstName;
    user.lastName = lastName;

    await userRepo.save(user);

    return res.json({
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    });
  } catch (err) {
    console.error("Error al actualizar perfil:", err);
    return res.status(500).json({ message: "Error del servidor." });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const userRepository = AppDataSource.getRepository(User);


  try {
    const user = await userRepository.findOneBy({ id: userId });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    await userRepository.remove(user);

    return res.status(200).json({ message: "Cuenta eliminada correctamente." });
  } catch (err) {
    console.error("Error al eliminar la cuenta:", err);
    return res.status(500).json({ message: "Error del servidor." });
  }
};