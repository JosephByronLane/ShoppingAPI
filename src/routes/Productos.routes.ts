import {Router} from 'express'
// import {getProducts, getProductById, createProduct, updateProduct, deleteProduct} from '../controllers/productos.controllers';
import * as productosController from '../controllers/productos.controllers';

const router2 = Router();


import {needlogin} from '../index'
import { verify } from 'crypto';
import { verifyToken } from '../middleware/auth.middleware';




router2.get('/equipo-2/product',verifyToken,productosController.getProductos);
router2.get('/equipo-2/product/:id', verifyToken,productosController.getProductoById);
router2.post('/equipo-2/product', verifyToken,productosController.createProducto);
router2.put('/equipo-2/product/:id', verifyToken,productosController.updateProducto);
router2.delete('/equipo-2/product/:id', verifyToken,productosController.deleteProducto);





export default router2