import {Router} from 'express'
import { addToCart, cancelarPedido, finalizarCompra, getCartItems, removeFromCart, updateCartItem, getCartItem} from '../controllers/compras.controller';
import { verifyToken } from '../middleware/auth.middleware';

const router = Router();


router.post('/equipo-2/purchases', verifyToken, addToCart)
router.get('/equipo-2/purchases', verifyToken, getCartItems)
router.get('/equipo-2/purchases/:id', verifyToken, getCartItem)
router.delete('/equipo-2/purchases', verifyToken, removeFromCart)
router.put('/equipo-2/purchases/:id', verifyToken, updateCartItem)

router.post('/equipo-2/purchases/finalize', verifyToken, finalizarCompra)
router.delete('/equipo-2/purchases/finalize/:id', verifyToken, cancelarPedido)


export default router