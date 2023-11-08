import {Router} from 'express'
// import {getProducts, getProductById, createProduct, updateProduct, deleteProduct} from '../controllers/productos.controllers';
import * as productosController from '../controllers/productos.controllers';

const router = Router();


router.get('/products', productosController.getProducts);
router.get('/products/:id', productosController.getProductById);
router.post('/products', productosController.createProduct);
router.put('/products/:id', productosController.updateProduct);
router.delete('/products/:id', productosController.deleteProduct);