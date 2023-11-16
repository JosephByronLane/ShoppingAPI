import {Router} from 'express'
import { addToCart, cancelarPedido, finalizarCompra, getCartItems, removeFromCart, updateCartItem} from '../controllers/compras.controller';
import { verifyToken } from '../middleware/auth.middleware';

const router = Router();


router.post('/compra', verifyToken, addToCart)
router.get('/compra', verifyToken, getCartItems)
router.delete('/compra', verifyToken, removeFromCart)
router.put('/compra', verifyToken, updateCartItem)

router.post('/compra/finalizar', verifyToken, finalizarCompra)
router.post('/compra/finalizar', verifyToken, cancelarPedido)
export default router