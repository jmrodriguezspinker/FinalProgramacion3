// backend/src/middlewares/authMiddleware.ts
import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

// Extender la interfaz Request de Express para añadir el user
declare global {
    namespace Express {
        interface Request {
            user?: { id: number; email: string };
        }
    }
}

interface AuthRequest extends Request {
  user?: {
    id: number;
    email: string;
  };
}
export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Token no proporcionado' });

  jwt.verify(token, process.env.JWT_SECRET!, (err, decoded) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Token expirado' });
      }
      return res.status(403).json({ message: 'Token inválido' });
    }

    // Aquí verificamos que decoded sea un objeto (no string) y tenga id y email
    if (typeof decoded === 'object' && decoded !== null && 'id' in decoded && 'email' in decoded) {
      req.user = {
        id: (decoded as any).id,
        email: (decoded as any).email,
      };
      next();
    } else {
      return res.status(403).json({ message: 'Payload de token inválido' });
    }
  });
};

/* export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Access Denied: No token provided." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number; email: string };
        req.user = decoded; // Adjunta la información del usuario a la solicitud
        next();
    } catch (error) {
        console.error("Token verification error:", error);
        return res.status(403).json({ message: "Invalid Token." });
    }
}; */

// Middleware opcional para verificar roles (ej. admin)
export const authorizeRoles = (roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        // Aquí podrías obtener el rol del usuario desde req.user (si lo guardas en el token o lo buscas en DB)
        // Por simplicidad, este ejemplo asume que no hay roles, pero es donde lo implementarías.
        // Ej: if (req.user?.role && roles.includes(req.user.role)) { next(); } else { res.status(403).json({ message: "Forbidden" }); }
        next(); // Por ahora, pasa sin verificar roles
    };
};