import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

interface JwtPayload {
  id: string;
  roles: string[];
  permissions: string[];
}

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).json({ message: "No token provided" });

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    (req as any).user = decoded;
    next();
  } catch {
    res.status(403).json({ message: "Invalid or expired token" });
  }
};

export const authorize = (options: {
  roles?: string[];
  permissions?: string[];
}) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    if (options.roles && !options.roles.some((r) => user.roles.includes(r))) {
      return res.status(403).json({ message: "Insufficient role" });
    }

    if (
      options.permissions &&
      !options.permissions.some((p) => user.permissions.includes(p))
    ) {
      return res.status(403).json({ message: "Insufficient permission" });
    }

    next();
  };
};
