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
exports.cancelarPedido = exports.finalizarCompra = exports.updateCartItem = exports.removeFromCart = exports.getCartItem = exports.getCartItems = exports.addToCart = void 0;
const DetalladoCompras_1 = require("../models/DetalladoCompras");
const Productos_1 = require("../models/Productos");
const Usuario_1 = require("../models/Usuario");
const Compras_1 = require("../models/Compras");
const addToCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuarioid = req.id;
    const usuarionombre = req.nombre;
    const { productoId, cantidad } = req.body;
    const producto = yield Productos_1.Productos.findOneBy({ id: productoId });
    const user = yield Usuario_1.Usuario.findOneBy({ id: usuarioid });
    console.log("Found related data.");
    if (productoId === undefined || cantidad === undefined) {
        return res.status(400).json({ message: 'Missing productoId and/or cantidad' });
    }
    if (typeof cantidad !== 'number') {
        return res.status(400).json({ message: `Cantidad must be a number.` });
    }
    if (!producto) {
        return res.status(404).json({ message: 'Product not found' });
    }
    if (!user) {
        return res.status(404).json({ message: 'Error finding user (you).' });
    }
    if (producto.cantidad_en_existencia < cantidad) {
        return res.status(409).json({ message: `Not enough available in stock. Only ${producto.cantidad_en_existencia} available.` });
    }
    console.log("------------------------------------------------");
    console.log("Attempting to find active purchase with details:");
    console.log(`User ID: ${usuarioid}`);
    console.log("------------------------------------------------");
    let compraActiva = yield Compras_1.Compras.findOne({
        where: {
            usuario: { id: usuarioid },
            activo: true
        },
        relations: ['usuario', 'detalladoCompras']
    });
    if (!compraActiva) {
        console.log("------------------------------------------------");
        console.log("User has no active purchase, creating new one");
        compraActiva = new Compras_1.Compras();
        compraActiva.usuario = user;
        compraActiva.nombre_del_cliente = user.nombre;
        compraActiva.usuario_de_creacion = usuarionombre;
        yield Compras_1.Compras.save(compraActiva);
        console.log(compraActiva);
        console.log("------------------------------------------------");
    }
    else {
        console.log("------------------------------------------------");
        console.log("User has an active purchase, using that one");
        console.log("------------------------------------------------");
    }
    console.log("------------------------------------------------");
    console.log("Trying to find details for current product");
    console.log(`Producto ID: ${productoId}`);
    console.log(`Compra ID": ${compraActiva.id}`);
    console.log("------------------------------------------------");
    let detallePedido = yield DetalladoCompras_1.DetalladoCompras.findOne({
        where: {
            producto: { id: productoId },
            compra: { id: compraActiva.id }
        }
    });
    if (detallePedido) {
        console.log("------------------------------------------------");
        console.log(`PRODUCT FOUND: Found product in cart, adding ${cantidad} to detallePedido with id: ${detallePedido.id}`);
        console.log("------------------------------------------------");
        detallePedido.cantidad += cantidad;
        console.log(`${detallePedido.cantidad}`);
        console.log("------------------------------------------------");
    }
    else {
        detallePedido = new DetalladoCompras_1.DetalladoCompras();
        yield DetalladoCompras_1.DetalladoCompras.save(detallePedido);
        console.log("------------------------------------------------");
        console.log(`PRODUCT NOT FOUND: Making new product, adding ${cantidad} to a new detallePedido with id: ${detallePedido.id}`);
        console.log("------------------------------------------------");
        detallePedido.compra = compraActiva;
        detallePedido.usuario_de_creacion = usuarionombre;
        detallePedido.cantidad = 0;
        detallePedido.producto = producto;
        detallePedido.cantidad += cantidad;
    }
    if (typeof compraActiva.precio_total !== 'number') {
        compraActiva.precio_total = parseFloat(compraActiva.precio_total) || 0;
    }
    let price = typeof producto.precio === 'number' ? producto.precio : parseFloat(producto.precio);
    const totalPriceForProduct = price * cantidad;
    compraActiva.precio_total += totalPriceForProduct;
    compraActiva.total_de_productos += cantidad;
    producto.cantidad_en_existencia -= cantidad;
    yield Compras_1.Compras.save(compraActiva);
    console.log("------------------------------------------------");
    console.log(`Saved compra`);
    console.log("------------------------------------------------");
    yield DetalladoCompras_1.DetalladoCompras.save(detallePedido);
    console.log("------------------------------------------------");
    console.log(`Saved detallePedido`);
    console.log("------------------------------------------------");
    yield Productos_1.Productos.save(producto);
    console.log("------------------------------------------------");
    console.log(`Saved producto`);
    console.log("------------------------------------------------");
    compraActiva = yield Compras_1.Compras.findOne({
        where: { id: compraActiva.id },
        relations: ['detalladoCompras', 'detalladoCompras.producto']
    });
    if (!compraActiva) {
        return res.status(404).json({ message: `Error retrieving purchase. Try again or call tech support, lmao.` });
    }
    const formattedCompra = formatPurchaseLimited(compraActiva);
    return res.status(200).json({
        status: "Success",
        messagE: "Added Item to purchase succesfully.",
        data: formattedCompra
    });
});
exports.addToCart = addToCart;
const getCartItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuarioid = req.id;
    const compra = yield Compras_1.Compras.findOne({
        where: {
            usuario: { id: usuarioid },
            activo: true
        },
        relations: ['usuario', 'detalladoCompras', 'detalladoCompras.producto']
    });
    if (!compra) {
        return res.status(404).json({ message: "Compra not found" });
    }
    const formattedCompra = formatPurchaseFull(compra);
    return res.status(200).json({
        status: "Success",
        message: "Found all purchases",
        data: {
            formattedCompra
        }
    });
});
exports.getCartItems = getCartItems;
const getCartItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const purchaseId = parseInt(req.params.id);
    if (isNaN(purchaseId)) {
        return res.status(400).json({ message: 'Invalid purchase ID' });
    }
    const compra = yield Compras_1.Compras.findOne({
        where: {
            id: purchaseId,
        },
        relations: ['usuario', 'detalladoCompras', 'detalladoCompras.producto']
    });
    if (!compra) {
        return res.status(404).json({ message: 'Purchase not found' });
    }
    const formattedCompra = formatPurchaseFull(compra);
    return res.status(200).json({
        status: "Success",
        message: `Found purchase with id: ${purchaseId}`,
        data: {
            formattedCompra
        }
    });
});
exports.getCartItem = getCartItem;
const removeFromCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { detalladoCompraId } = req.body;
    const usuarioId = req.id;
    if (typeof detalladoCompraId != 'number') {
        return res.status(404).json({ message: 'Error processing ID.Please make sure its a number.' });
    }
    console.log("------------------------------------------------");
    console.log("attempting to find cart item. ID: " + detalladoCompraId);
    console.log("------------------------------------------------");
    const detalladoCompra = yield DetalladoCompras_1.DetalladoCompras.findOne({
        where: { id: detalladoCompraId },
        relations: ['producto', 'compra', 'compra.usuario'],
    });
    console.log("------------------------------------------------");
    console.log("found corresponding cart item");
    console.log("------------------------------------------------");
    if (!detalladoCompra) {
        return res.status(404).json({ message: 'Cart item not found' });
    }
    if (detalladoCompra.compra.status !== 'Activo' || detalladoCompra.compra.usuario.id !== req.id) {
        return res.status(403).json({ message: 'You do not have permission to remove this item. Purchase is not active' });
    }
    detalladoCompra.compra.total_de_productos -= detalladoCompra.cantidad;
    detalladoCompra.producto.cantidad_en_existencia += detalladoCompra.cantidad;
    yield DetalladoCompras_1.DetalladoCompras.remove(detalladoCompra);
    return res.status(200).json({
        status: "Success",
        message: "Succesfully removed item from cart",
        data: {
            "detalladoCompraId": detalladoCompraId,
            "productoNombre": detalladoCompra.producto.nombre
        }
    });
});
exports.removeFromCart = removeFromCart;
const updateCartItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { nombre } = req.params;
    const { nuevaCantidad } = req.body;
    let cartItem = yield DetalladoCompras_1.DetalladoCompras.findOne({
        where: {
            id: parseInt(id)
        },
        relations: ['producto', 'compra'],
    });
    if (!nuevaCantidad) {
        return res.status(400).json({ message: 'Quantity not found.' });
    }
    if (!cartItem) {
        return res.status(404).json({ message: 'detalleProducto found, make sure its an active purchase.' });
    }
    if (nuevaCantidad <= 0) {
        return res.status(400).json({ message: 'Quantity must be greater than zero' });
    }
    if (cartItem.compra.activo != true) {
        return res.status(400).json({ message: "You must be modifying an active purchase." });
    }
    const priceToRemove = (cartItem.producto.precio * cartItem.cantidad);
    cartItem.compra.precio_total -= priceToRemove;
    cartItem.compra.total_de_productos -= cartItem.cantidad;
    cartItem.producto.cantidad_en_existencia += cartItem.cantidad;
    const priceToAdd = (cartItem.producto.precio * parseInt(nuevaCantidad));
    cartItem.producto.cantidad_en_existencia -= parseInt(nuevaCantidad);
    cartItem.compra.precio_total += priceToAdd;
    cartItem.compra.total_de_productos += parseInt(nuevaCantidad);
    cartItem.compra.usuario_de_actualizacion = nombre;
    cartItem.cantidad = parseInt(nuevaCantidad);
    yield Productos_1.Productos.save(cartItem.producto);
    yield DetalladoCompras_1.DetalladoCompras.save(cartItem);
    yield Compras_1.Compras.save(cartItem.compra);
    const updatedCompra = yield Compras_1.Compras.findOne({
        where: { id: cartItem.compra.id },
        relations: ['detalladoCompras', 'detalladoCompras.producto'],
    });
    if (!updatedCompra) {
        return res.status(404).json({ message: 'Error finding updated Compra, please contact tech support.' });
    }
    const formattedCompra = formatPurchaseLimited(updatedCompra);
    return res.status(200).json({
        status: "Success",
        message: "Succesfuly updated item in detalladoProducto",
        data: {
            formattedCompra
        }
    });
});
exports.updateCartItem = updateCartItem;
const finalizarCompra = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuarioid = req.id;
    console.log("------------------------------------------------");
    console.log("Got user ID");
    console.log("------------------------------------------------");
    const compraActiva = yield Compras_1.Compras.findOne({
        where: {
            usuario: { id: usuarioid },
            activo: true
        }
    });
    if (!compraActiva) {
        console.log("------------------------------------------------");
        console.log("User has no active purchases.");
        console.log("------------------------------------------------");
        return res.status(404).json({ message: `User with ID: ${usuarioid} has no active purchases.` });
    }
    compraActiva.status = "Finalizado";
    compraActiva.activo = false;
    Compras_1.Compras.save(compraActiva);
    return res.status(200).json({
        status: "Success",
        message: "Succesfully finalized purchase",
        data: {
            "purchaseId": compraActiva.id,
            "detalladoPedido": compraActiva.detalladoCompras
        }
    });
});
exports.finalizarCompra = finalizarCompra;
const cancelarPedido = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuarioid = req.id;
    const compraId = parseInt(req.params.id);
    console.log(compraId);
    if (isNaN(compraId)) {
        return res.status(400).json({ message: "Invalid Compra ID." });
    }
    const compraActiva = yield Compras_1.Compras.findOne({
        where: {
            id: compraId,
            usuario: { id: usuarioid },
            status: "Finalizado"
        },
        relations: ['usuario', 'detalladoCompras', 'detalladoCompras.producto']
    });
    if (!compraActiva) {
        return res.status(404).json({ message: `Compra with ID: ${compraId} not found or is not finalized.` });
    }
    if (compraActiva.status === "Cancelado") {
        return res.status(400).json({ message: `Compra with ID: ${compraId} is already canceled.` });
    }
    compraActiva.status = "Cancelado";
    compraActiva.activo = false;
    yield compraActiva.save();
    return res.status(200).json({
        status: "Success",
        message: `Compra with ID: ${compraId} has been canceled.`
    });
});
exports.cancelarPedido = cancelarPedido;
const formatPurchaseLimited = (compra) => {
    return {
        compraId: compra.id,
        descripcion: compra.descripcion,
        nombre_del_cliente: compra.nombre_del_cliente,
        precio_total: compra.precio_total,
        total_de_productos: compra.total_de_productos,
        status: compra.status,
        detalladoCompras: compra.detalladoCompras ? compra.detalladoCompras.map(dc => {
            var _a, _b;
            return ({
                detalladoCompraId: dc.id,
                productoId: (_a = dc.producto) === null || _a === void 0 ? void 0 : _a.id,
                productoNombre: (_b = dc.producto) === null || _b === void 0 ? void 0 : _b.nombre,
                cantidad: dc.cantidad,
            });
        }) : ["ERROR RETRIEVING DETALLADOCOMPRAS BUT DONT WORRY, THE DATA WAS UPDATED/SET/PUT/WHATEVER CORRECTLY."]
    };
};
const formatPurchaseFull = (compra) => {
    return {
        id: compra.id,
        descripcion: compra.descripcion,
        nombre_del_cliente: compra.nombre_del_cliente,
        precio_total: compra.precio_total,
        total_de_productos: compra.total_de_productos,
        status: compra.status,
        usuario: {
            id: compra.usuario.id,
            nombre: compra.usuario.nombre,
        },
        detalladoCompras: compra.detalladoCompras.map(dc => ({
            id: dc.id,
            cantidad: dc.cantidad,
            producto: {
                id: dc.producto.id,
                nombre: dc.producto.nombre,
                precio: dc.producto.precio,
                categoria: dc.producto.categoria,
                fabricante: dc.producto.fabricante,
                cantidad_en_existencia: dc.producto.cantidad_en_existencia
            }
        }))
    };
};
