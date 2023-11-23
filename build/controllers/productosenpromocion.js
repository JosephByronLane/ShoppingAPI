"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProductoEP = exports.deleteProductoEP = exports.updateProductoEP = exports.getProductoEPById = exports.getProductoEPs = void 0;
const ProductosEnPromocion_1 = require("../models/ProductosEnPromocion");
const validation_controller_1 = require("./validation.controller");
const Productos_1 = require("../models/Productos");
const Joi = require('joi');
const productosEPSchema = Joi.object({
    nombre: Joi.string(),
    precio_en_promocion: Joi.number()
});
const getProductoEPs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error, value } = productosEPSchema.validate(req.query);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const filtro = value;
        const productos = yield ProductosEnPromocion_1.ProductosEnPromocion.find({
            where: Object.assign(Object.assign({}, filtro), { activo: 1 }),
            select: [
                'id',
                'nombre',
                'descripcion',
                'precio_en_promocion',
                'fecha_de_inicio',
                'fecha_de_finalizacion'
            ]
        });
        return res.status(200).json({
            status: "Success",
            message: "Successfully retrieved data.",
            data: {
                productos
            }
        });
    }
    catch (error) {
        if (error instanceof Error)
            return res.status(500).json({ message: error.message });
    }
});
exports.getProductoEPs = getProductoEPs;
const getProductoEPById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productoEP = yield ProductosEnPromocion_1.ProductosEnPromocion.findOne({
            where: {
                id: parseInt(req.params.id),
                activo: 1
            },
            select: [
                'id',
                'nombre',
                'descripcion',
                'precio_en_promocion',
                'fecha_de_inicio',
                'fecha_de_finalizacion'
            ]
        });
        return res.status(200).json({
            status: "Success",
            message: "Successfully retrieved data.",
            data: {
                productoEP
            }
        });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.getProductoEPById = getProductoEPById;
const updateProductoEP = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const allowedUpdateFields = ['id', 'nombre', 'descripcion', 'precio_en_promocion', 'fecha_de_inicio', 'fecha_de_finalizacion'];
    if ((0, validation_controller_1.hasUnallowedFields)(req.body, allowedUpdateFields)) {
        return res.status(400).json({ message: 'Request contains unallowed fields' });
    }
    let producto = yield ProductosEnPromocion_1.ProductosEnPromocion.findOneBy({ id: parseInt(req.params.id) });
    console.log(producto);
    if (!producto)
        return res.status(404).json({ message: 'Producto en promocion does not exist' });
    yield ProductosEnPromocion_1.ProductosEnPromocion.update({ id: parseInt(id) }, req.body);
    producto = yield ProductosEnPromocion_1.ProductosEnPromocion.findOneBy({ id: parseInt(req.params.id) });
    if (!producto) {
        return res.status(404).json({ message: "Error finding product. Please try again or contact tech support." });
    }
    return res.status(200).json({
        status: "Success",
        message: "Succesfully updated product en promocion",
        data: {
            id: producto.id,
            nombre: producto.nombre,
            descripcion: producto.descripcion,
            precio_en_promocion: producto.precio_en_promocion,
            fecha_de_inicio: producto.fecha_de_inicio,
            fecha_de_finalizacion: producto.fecha_de_finalizacion
        }
    });
});
exports.updateProductoEP = updateProductoEP;
const deleteProductoEP = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(404).json({ message: `Error recieving product ID.` });
        }
        console.log('-----------------------------------');
        console.log(`Found ID: ${id} to delete.`);
        console.log('-----------------------------------');
        let promoProduct = yield ProductosEnPromocion_1.ProductosEnPromocion.findOne({
            where: {
                id: parseInt(id)
            }
        });
        console.log('-----------------------------------');
        console.log(`Succesfully attempted to find product.`);
        console.log('-----------------------------------');
        if (!promoProduct) {
            console.log('-----------------------------------');
            console.log(`Product was not found.`);
            console.log('-----------------------------------');
            return res.status(404).json({ message: `Product with id: ${id} not found.` });
        }
        promoProduct.activo = 0;
        console.log('-----------------------------------');
        console.log(`Product's active succesfully set to 0.`);
        console.log('-----------------------------------');
        res.status(200).json({
            status: "Success",
            message: "Succesfully deleted.",
        });
    }
    catch (error) {
        if (error instanceof Error)
            return res.status(500).json({ message: error.message });
    }
});
exports.deleteProductoEP = deleteProductoEP;
const createProductoEP = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { idproducto } = req.body;
        const promoProduct = new ProductosEnPromocion_1.ProductosEnPromocion();
        const errors = yield (0, validation_controller_1.validateEntity)(promoProduct, req.body);
        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }
        console.log('-----------------------------------');
        console.log(`Found all base variables`);
        console.log('-----------------------------------');
        const producto = yield Productos_1.Productos.findOne({
            where: {
                id: idproducto,
            }
        });
        console.log('-----------------------------------');
        console.log(`Was able to retrieve product based on ID`);
        console.log('-----------------------------------');
        if (!producto) {
            console.log('-----------------------------------');
            console.log(`Product was not found`);
            console.log('-----------------------------------');
            return res.status(404).json({ message: `Product with id: ${idproducto} not found.` });
        }
        promoProduct.producto = producto;
        yield ProductosEnPromocion_1.ProductosEnPromocion.save(promoProduct);
        yield promoProduct.save();
        return res.status(200).json({
            status: "Success",
            message: "Succesfully created Promotional product",
            data: {
                "id": promoProduct.id,
                "nombre": promoProduct.nombre
            }
        });
    }
    catch (error) {
        if (error instanceof Error)
            return res.status(500).json({ message: error.message });
    }
});
exports.createProductoEP = createProductoEP;
