
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { getUserByUsername} from '../controllers/usuario.controllers'

export const tryLogin = async(req: Request, res: Response) =>{
    try {
        const { username, password } = req.body;
        // Retrieve user from the database.
        const user = await getUserByUsername(username);
        if (!user) {
          return res.status(401).json({ message: 'Authentication failed' });
        }
    
        // Check if the password is correct.
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(401).json({ message: 'Authentication failed' });
        }
    
        // User authenticated, generate a JWT token.
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
        // Send the token to the client.
        res.json({ token });
      } catch (error) {
        res.status(500).json({ message: 'Server error', error });
      }
}