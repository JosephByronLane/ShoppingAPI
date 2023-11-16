import {Router} from 'express'
// import {getProducts, getProductById, createProduct, updateProduct, deleteProduct} from '../controllers/productos.controllers';
import * as productosController from '../controllers/productos.controllers';

const router2 = Router();


import {needlogin} from '../index'
import { verify } from 'crypto';
import { verifyToken } from '../middleware/auth.middleware';




router2.get('/productos',verifyToken,productosController.getProductos);
router2.get('/productos/:id', verifyToken,productosController.getProductoById);
router2.post('/productos', verifyToken,productosController.createProducto);
router2.put('/productos/:id', verifyToken,productosController.updateProducto);
router2.delete('/productos/:id', verifyToken,productosController.deleteProducto);





export default router2