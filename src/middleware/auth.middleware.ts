import { Request, Response, NextFunction } from 'express';
const jwt = require('jsonwebtoken')

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    console.log("Attemping token verification")
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log("Decoded JWT:", decoded);

    req.id = decoded.id;
    req.nombre = decoded.nombre;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};