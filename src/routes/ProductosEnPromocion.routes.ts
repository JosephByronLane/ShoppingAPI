import {Router} from 'express'
// import {getProducts, getProductById, createProduct, updateProduct, deleteProduct} from '../controllers/productos.controllers';
import * as productosEP from '../controllers/productosenpromocion';
import { verifyToken } from '../middleware/auth.middleware';

const router2 = Router();


router2.get('/productosenpromocion',verifyToken, productosEP.getProductoEPs);
router2.get('/productosenpromocion/:id',verifyToken, productosEP.getProductoEPById);
router2.post('/productosenpromocion', verifyToken,productosEP.createProductoEP);
router2.put('/productosenpromocion/:id', verifyToken,productosEP.updateProductoEP);
router2.delete('/productosenpromocion/:id', verifyToken,productosEP.deleteProductoEP);

export default router2