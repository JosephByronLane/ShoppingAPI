
import { Request, Response } from 'express';
 import bcrypt from 'bcrypt';
import { findUserByUsername} from '../controllers/usuario.controllers'


const jwt = require('jsonwebtoken')
export const tryLogin = async(req: Request, res: Response) =>{
    try {
        const { nombre, contrasenia } = req.body;

        const user = await findUserByUsername (nombre);
        if (!user) {
          return res.status(401).json({ message: 'Wrong Username' });
        }
    
        const isMatch = await bcrypt.compare(contrasenia, user.contrasenia);
        if (!isMatch) {
          return res.status(401).json({ message: 'Wrong password' });
        }
    
        const token = jwt.sign({ id: user.id, nombre: user.nombre }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
    
        res.json({ token });
        console.log(token)
      } 
    catch (error) {
        console.log(error )
        res.status(500).json({ message: 'Server error', error });
      }
}