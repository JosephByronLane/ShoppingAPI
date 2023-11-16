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
exports.updateCartItem = exports.removeFromCart = exports.getCartItems = exports.addToCart = void 0;
const CarritoItem_1 = require("../models/CarritoItem");
const Productos_1 = require("../models/Productos");
const Usuario_1 = require("../models/Usuario");
const addToCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuarioid = req.id;
    const usuarionombre = req.nombre;
    const { productoId, cantidad } = req.body;
    const producto = yield Productos_1.Productos.findOneBy({ id: productoId });
    const user = yield Usuario_1.Usuario.findOneBy({ id: usuarioid });
    console.log("Found related data.");
    if (!producto) {
        return res.status(404).json({ message: 'Product not found' });
    }
    if (!user) {
        return res.status(404).json({ message: 'Error finding user (you).' });
    }
    let carritoitem = yield CarritoItem_1.CarritoItem.findOne({
        where: {
            producto: { id: productoId },
            usuario: { id: usuarioid }
        }
    });
    if (carritoitem) {
        carritoitem.quantity += parseInt(cantidad);
    }
    else {
        carritoitem = new CarritoItem_1.CarritoItem();
        carritoitem.producto = producto;
        carritoitem.quantity = parseInt(cantidad);
        carritoitem.usuario = user;
    }
    yield CarritoItem_1.CarritoItem.save(carritoitem);
    return res.json(carritoitem);
});
exports.addToCart = addToCart;
const getCartItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.id;
    const cartItems = yield CarritoItem_1.CarritoItem.find({
        where: {
            usuario: { id: userId }
        },
        relations: ['producto']
    });
    return res.json(cartItems);
});
exports.getCartItems = getCartItems;
const removeFromCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cartItemId } = req.params;
    console.log("attempting to find cart item.");
    const cartItem = yield CarritoItem_1.CarritoItem.findOneBy({ id: parseInt(cartItemId) });
    console.log("found corresponding cart item");
    if (!cartItem) {
        return res.status(404).json({ message: 'Cart item not found' });
    }
    yield CarritoItem_1.CarritoItem.remove(cartItem);
    return res.status(204).send();
});
exports.removeFromCart = removeFromCart;
const updateCartItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { carritoItemId, nuevaCantidad } = req.body;
    const cartItem = yield CarritoItem_1.CarritoItem.findOneBy({ id: carritoItemId });
    if (!cartItem) {
        return res.status(404).json({ message: 'Cart item not found' });
    }
    if (nuevaCantidad <= 0) {
        return res.status(400).json({ message: 'Quantity must be greater than zero' });
    }
    cartItem.quantity = parseInt(nuevaCantidad);
    yield CarritoItem_1.CarritoItem.save(cartItem);
    return res.json(cartItem);
});
exports.updateCartItem = updateCartItem;
