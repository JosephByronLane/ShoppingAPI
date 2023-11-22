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
const getProductoEPs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productoEPs = yield ProductosEnPromocion_1.ProductosEnPromocion.find();
        return res.json(productoEPs);
    }
    catch (error) {
        if (error instanceof Error)
            return res.status(500).json({ message: error.message });
    }
});
exports.getProductoEPs = getProductoEPs;
const getProductoEPById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productoEP = yield ProductosEnPromocion_1.ProductosEnPromocion.findOneBy({ id: parseInt(req.params.id) });
        return res.json(productoEP);
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
    const producto = yield ProductosEnPromocion_1.ProductosEnPromocion.findOneBy({ id: parseInt(req.params.id) });
    console.log(producto);
    if (!producto)
        return res.status(404).json({ message: 'Producto does not exist' });
    yield ProductosEnPromocion_1.ProductosEnPromocion.update({ id: parseInt(id) }, req.body);
    return res.sendStatus(204);
});
exports.updateProductoEP = updateProductoEP;
const deleteProductoEP = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield ProductosEnPromocion_1.ProductosEnPromocion.delete({ id: parseInt(id) });
        if (result.affected === 0) {
            return res.status(404).json({ message: "Producto not found" });
        }
        return res.sendStatus(204);
    }
    catch (error) {
        if (error instanceof Error)
            return res.status(500).json({ message: error.message });
    }
});
exports.deleteProductoEP = deleteProductoEP;
const createProductoEP = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombre } = req.body;
        console.log(req.body);
        const producto = new ProductosEnPromocion_1.ProductosEnPromocion();
        producto.nombre = nombre;
        yield producto.save();
        return res.json(producto);
    }
    catch (error) {
        if (error instanceof Error)
            return res.status(500).json({ message: error.message });
    }
});
exports.createProductoEP = createProductoEP;
