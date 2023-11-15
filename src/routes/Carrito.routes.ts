import {Router} from 'express'
import { addToCart, getCartItems, removeFromCart, updateCartItem } from '../controllers/carrito.controller';
import { verifyToken } from '../middleware/auth.middleware';

const router = Router();


router.post('/carrito', verifyToken, addToCart)
router.get('/carrito', verifyToken, getCartItems)
router.delete('/carrito', verifyToken, removeFromCart)
router.put('/carrito', verifyToken, updateCartItem)

export default router