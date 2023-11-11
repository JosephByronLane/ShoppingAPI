import {Router} from 'express'
// import {getProducts, getProductById, createProduct, updateProduct, deleteProduct} from '../controllers/productos.controllers';
import * as productosEP from '../controllers/productosenpromocion';

const router2 = Router();


router2.get('/productosenpromocion', productosEP.getProductoEPs);
router2.get('/productosenpromocion/:id', productosEP.getProductoEPById);
router2.post('/productosenpromocion', productosEP.createProductoEP);
router2.put('/productosenpromocion/:id', productosEP.updateProductoEP);
router2.delete('/productosenpromocion/:id', productosEP.deleteProductoEP);

export default router2