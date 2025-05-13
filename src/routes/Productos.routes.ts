import {Router} from 'express'
import * as productosController from '../controllers/productos.controllers';

const router2 = Router();

import { verifyToken } from '../middleware/auth.middleware';




router2.get('/equipo-2/products',productosController.getProductos);
router2.get('/equipo-2/products/:id', productosController.getProductoById);
router2.post('/equipo-2/products', productosController.createProducto);
router2.put('/equipo-2/products/:id', productosController.updateProducto);
router2.delete('/equipo-2/products/:id', productosController.deleteProducto);





export default router2