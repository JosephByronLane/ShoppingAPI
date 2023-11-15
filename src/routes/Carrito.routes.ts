import {Router} from 'express'
import { addToCart, getCartItems } from '../controllers/carrito.controller';
import { verifyToken } from '../middleware/auth.middleware';

const router = Router();


router.post('/carrito', verifyToken, addToCart)
router.get('/carrito', verifyToken, getCartItems)


export default router