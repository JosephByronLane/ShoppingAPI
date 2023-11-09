import { Request, Response, NextFunction } from 'express';
const jwt = require('jsonwebtoken')

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization');
    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    //req.user = decoded;

    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};