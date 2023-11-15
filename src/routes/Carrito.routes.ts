import {Router} from 'express'
import { addToCart } from '../controllers/carrito.controller';
import { verifyToken } from '../middleware/auth.middleware';

const router = Router();


router.post('/carrito', verifyToken,addToCart)


export default router