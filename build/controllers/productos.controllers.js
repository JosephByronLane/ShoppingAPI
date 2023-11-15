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
exports.createProducto = exports.deleteProducto = exports.updateProducto = exports.getProductoById = exports.getProductos = void 0;
const Productos_1 = require("../models/Productos");
// obtener productos pero falta la cosa de querys
const getProductos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productos = yield Productos_1.Productos.find();
        return res.json(productos);
    }
    catch (error) {
        if (error instanceof Error)
            return res.status(500).json({ message: error.message });
    }
});
exports.getProductos = getProductos;
const getProductoById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const producto = yield Productos_1.Productos.findOneBy({ id: parseInt(req.params.id) });
        return res.json(producto);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.getProductoById = getProductoById;
const updateProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const producto = yield Productos_1.Productos.findOneBy({ id: parseInt(req.params.id) });
    console.log(producto);
    if (!producto)
        return res.status(404).json({ message: 'Producto does not exist' });
    yield Productos_1.Productos.update({ id: parseInt(id) }, req.body);
    return res.sendStatus(204);
});
exports.updateProducto = updateProducto;
// borrar el producto 
const deleteProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield Productos_1.Productos.delete({ id: parseInt(id) });
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
exports.deleteProducto = deleteProducto;
const createProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombre } = req.body;
        console.log(req.body);
        const producto = new Productos_1.Productos();
        producto.nombre = nombre;
        yield producto.save();
        return res.json(producto);
    }
    catch (error) {
        if (error instanceof Error)
            return res.status(500).json({ message: error.message });
    }
});
exports.createProducto = createProducto;
