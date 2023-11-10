import {Router} from 'express'
// import {getProducts, getProductById, createProduct, updateProduct, deleteProduct} from '../controllers/productos.controllers';
import * as productosController from '../controllers/productos.controllers';

const router2 = Router();


router2.get('/productos', productosController.getProductos);
router2.get('/productos/:id', productosController.getProductoById);
router2.post('/productos', productosController.createProducto);
router2.put('/productos/:id', productosController.updateProducto);
router2.delete('/productos/:id', productosController.deleteProducto);

export default router2