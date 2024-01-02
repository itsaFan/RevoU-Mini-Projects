import { Request, Response, NextFunction } from "express";

export const checkRoles = (requiredRoles: string[]) => {
  return (req: any, res: Response, next: NextFunction) => {
    const userRole = req.user?.role;

    if (!userRole || !requiredRoles.includes(userRole)) {
      return res.status(403).json({ error: "Access denied" });
    }

    next();
  };
};
