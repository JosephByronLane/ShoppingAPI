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
const validation_controller_1 = require("./validation.controller");
const Joi = require('joi');
const productosSchema = Joi.object({
    nombre: Joi.string(),
    precio: Joi.number(),
    categoria: Joi.string(),
    fabricante: Joi.string(),
    cantidad_en_existencia: Joi.number(),
    unidad_de_medida: Joi.string(),
});
const getProductos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error, value } = productosSchema.validate(req.query);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const filtro = value;
        const products = yield Productos_1.Productos.find({
            where: Object.assign(Object.assign({}, filtro), { activo: 1 }),
            select: ['id', 'nombre', 'precio', 'descripcion', 'categoria', 'fabricante', 'cantidad_en_existencia', 'unidad_de_medida'],
        });
        return res.status(200).json({
            status: "Success",
            message: "Retrieved all users.",
            data: {
                products
            }
        });
    }
    catch (error) {
        if (error instanceof Error)
            return res.status(500).json({ message: error.message });
    }
});
exports.getProductos = getProductos;
const getProductoById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var id = req.params.id;
        let producto = yield Productos_1.Productos.findOne({
            where: {
                id: parseInt(id),
                activo: 1
            },
            select: ['id', 'nombre', 'precio', 'descripcion', 'categoria', 'fabricante', 'cantidad_en_existencia', 'unidad_de_medida'],
        });
        if (!producto) {
            console.log('-----------------------------------');
            console.log(`producto with id ${id} was not found.`);
            console.log('-----------------------------------');
            return res.status(404).json({ message: `producto with id: ${id} not found.` });
        }
        return res.status(200).json({
            status: "Success",
            message: "Succesfully found producto.",
            data: producto
        });
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
    const { nombre } = req.params;
    const allowedUpdateFields = ['nombre', 'precio', 'descripcion', 'categoria', 'fabricante', 'cantidad_en_existencia', 'unidad_de_medida'];
    if ((0, validation_controller_1.hasUnallowedFields)(req.body, allowedUpdateFields)) {
        return res.status(400).json({ message: 'Request contains unallowed fields' });
    }
    let producto = yield Productos_1.Productos.findOneBy({ id: parseInt(req.params.id) });
    if (!producto)
        return res.status(404).json({ message: 'Producto does not exist' });
    producto.usuario_de_actualizacion = nombre;
    yield Productos_1.Productos.update({ id: parseInt(id) }, req.body);
    producto = yield Productos_1.Productos.findOneBy({ id: parseInt(req.params.id) });
    if (!producto) {
        return res.status(404).json({ message: "Error finding product. Please try again or contact tech support." });
    }
    return res.status(200).json({
        status: "Success",
        message: "Succesfully updated product",
        data: {
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            descripcion: producto.descripcion,
            categoria: producto.categoria,
            fabricante: producto.fabricante,
            cantidad_en_existencia: producto.cantidad_en_existencia,
            unidad_de_medida: producto.unidad_de_medida
        }
    });
});
exports.updateProducto = updateProducto;
const deleteProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(404).json({ message: `Error recieving User ID.` });
        }
        console.log('-----------------------------------');
        console.log(`Found ID: ${id} to delete.`);
        console.log('-----------------------------------');
        let producto = yield Productos_1.Productos.findOne({
            where: {
                id: parseInt(id),
                activo: 1
            }
        });
        console.log('-----------------------------------');
        console.log(`Succesfully attempted to find the Producto.`);
        console.log('-----------------------------------');
        if (!producto) {
            console.log('-----------------------------------');
            console.log(`Producto with id ${id} was not found.`);
            console.log('-----------------------------------');
            return res.status(404).json({ message: `Producto with id: ${id} not found.` });
        }
        producto.activo = 0;
        console.log('-----------------------------------');
        console.log(`Producto with id ${id} active succesfully set to 0.`);
        console.log('-----------------------------------');
        Productos_1.Productos.save(producto);
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
exports.deleteProducto = deleteProducto;
const createProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const producto = new Productos_1.Productos();
        const errors = yield (0, validation_controller_1.validateEntity)(producto, req.body);
        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }
        yield producto.save();
        return res.status(200).json({
            status: "Success",
            message: "Succesfully created Product",
            data: {
                id: producto.id,
                nombre: producto.nombre
            }
        });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.createProducto = createProducto;
