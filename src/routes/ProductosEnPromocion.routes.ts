import {Router} from 'express'
// import {getProducts, getProductById, createProduct, updateProduct, deleteProduct} from '../controllers/productos.controllers';
import * as productosEP from '../controllers/productosenpromocion';
import { verifyToken } from '../middleware/auth.middleware';

const router2 = Router();


router2.get('/equipo-2/promotionalproducts',verifyToken, productosEP.getProductoEPs);
router2.get('/equipo-2/promotionalproducts/:id',verifyToken, productosEP.getProductoEPById);
router2.post('/equipo-2/promotionalproducts', verifyToken,productosEP.createProductoEP);
router2.put('/equipo-2/promotionalproducts/:id', verifyToken,productosEP.updateProductoEP);
router2.delete('/equipo-2/promotionalproducts/:id', verifyToken,productosEP.deleteProductoEP);

export default router2