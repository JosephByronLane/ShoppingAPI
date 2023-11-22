import { Request, Response } from 'express';
import { DetalladoCompras } from '../models/DetalladoCompras';
import { Productos } from '../models/Productos';
import { Usuario } from '../models/Usuario';
import { Compras } from '../models/Compras';
import { Entity } from 'typeorm';

export const addToCart = async (req: Request, res: Response) => {
    
    const usuarioid = req.id; 
    const usuarionombre = req.nombre;

    const { productoId, cantidad } = req.body;

    const producto = await Productos.findOneBy({ id: productoId });
    const user = await Usuario.findOneBy({id: usuarioid});

    console.log("Found related data.")
    if (!producto) {
        return res.status(404).json({ message: 'Product not found' });
    }
    if (!user) {
        return res.status(404).json({ message: 'Error finding user (you).' });
    }
    if (producto.cantidad_en_existencia <  cantidad){
        return res.status(404).json({ message: `Not enough available in stock. Only ${producto.cantidad_en_existencia} available.` });
    }

    console.log("------------------------------------------------")
    console.log("Attempting to find active purchase with details:")
    console.log(`User ID: ${usuarioid}`)
    console.log("------------------------------------------------")
    let compraActiva = await Compras.findOne({
        where: {
            usuario:{id: usuarioid}, 
            activo: true
        },
        relations: ['usuario', 'detalladoCompras'] 
    });

    if (!compraActiva){
        console.log("------------------------------------------------")
        console.log("User has no active purchase, creating new one")
        console.log("------------------------------------------------")

        compraActiva = new Compras();
        compraActiva.usuario = user;
        await Compras.save(compraActiva);

    }
    else{
        console.log("------------------------------------------------")
        console.log("User has an active purchase, using that one")
        console.log(compraActiva)
        console.log("------------------------------------------------")
    }
    console.log("------------------------------------------------")
    console.log("Trying to find details for current product")
    console.log(`Producto ID: ${productoId}`)
    console.log(`Compra ID": ${compraActiva.id}`)
    console.log("------------------------------------------------")

    let detallePedido = await DetalladoCompras.findOne({
        where: {
            producto: { id: productoId }, 
            compra: { id: compraActiva.id }
        }

    });

    if (detallePedido) {
        console.log("------------------------------------------------")
        console.log(`PRODUCT FOUND: Found product in cart, adding ${cantidad} to detallePedido with id: ${detallePedido.id}`)
        console.log("------------------------------------------------")
        detallePedido.cantidad += parseInt(cantidad);
    } else {
        detallePedido = new DetalladoCompras();
        console.log("------------------------------------------------")
        console.log(`PRODUCT NOT FOUND: Making new product, adding ${cantidad} to a new detallePedido with id: ${detallePedido.id}`)
        console.log("------------------------------------------------")
        detallePedido.compra=compraActiva;
        detallePedido.producto = producto;
        detallePedido.cantidad = parseInt(cantidad);
    }

    await DetalladoCompras.save(detallePedido);
    
    producto.cantidad_en_existencia -= cantidad;
    await Productos.save(producto);

    compraActiva = await Compras.findOne({
        where: { id: compraActiva.id },
        relations: ['detalladoCompras']
    });
    
    const formattedCompra = formatPurchaseLimited(compraActiva);

    return res.json(formattedCompra);
};


export const getCartItems = async (req: Request, res: Response) => {
    const usuarioid = req.id;

    const compra = await Compras.findOne({
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

    return res.json({
        status: "Success",
        message: "Found all purchases",
        data: {
            formattedCompra
        }
    });
};

export const getCartItem = async (req: Request, res: Response) => {
    const purchaseId = parseInt(req.params.id); 

    if (isNaN(purchaseId)) {
        return res.status(400).json({ message: 'Invalid purchase ID' });
    }

    const compra = await Compras.findOne({
        where: {
            id: purchaseId, 
        },
        relations: ['usuario', 'detalladoCompras', 'detalladoCompras.producto'] 
    });

    if (!compra) {
        return res.status(404).json({ message: 'Purchase not found' });
    }

    return res.json(compra);
};

export const removeFromCart = async (req: Request, res: Response) => {
    const { cartItemId } = req.body;
    console.log(req.params)
    console.log("------------------------------------------------")
    console.log("attempting to find cart item. ID: " + cartItemId);
    console.log("------------------------------------------------")

    
    const cartItem = await DetalladoCompras.findOneBy({ id: parseInt(cartItemId) });
    console.log("------------------------------------------------")
    console.log("found corresponding cart item");
    console.log("------------------------------------------------")

    if (!cartItem) {
        return res.status(404).json({ message: 'Cart item not found' });
    }

    await DetalladoCompras.remove(cartItem);

    return res.status(204).send();
};

export const updateCartItem = async (req: Request, res: Response) => {
    const { carritoItemId, nuevaCantidad } = req.body;

    const cartItem = await DetalladoCompras.findOneBy({ id: carritoItemId });

    if (!cartItem) {
        return res.status(404).json({ message: 'Cart item not found' });
    }

    if (nuevaCantidad <= 0) {
        return res.status(400).json({ message: 'Quantity must be greater than zero' });
    }

    cartItem.cantidad = parseInt(nuevaCantidad);
    await DetalladoCompras.save(cartItem);

    return res.json(cartItem);
};

export const finalizarCompra = async (req: Request, res: Response) => {
    const usuarioid = req.id;

    const compraActiva = await Compras.findOne({
        where: {
            usuario: { id: usuarioid }, 
            activo: true
        },
        relations: ['usuario', 'detalladoCompras', 'detalladoCompras.producto'] // Add nested relation
    });
    if (!compraActiva){
        console.log("------------------------------------------------")
        console.log("User has no active purchases.")
        console.log("------------------------------------------------")
        return res.status(404).json({ message: `User with ID: ${usuarioid} has no active purchases.` });

    }

    compraActiva.status="Terminado"
    compraActiva.activo=false;
};

export const cancelarPedido = async (req: Request, res: Response) => {
    const usuarioid = req.id;

    const compraActiva = await Compras.findOne({
        where: {
            usuario: { id: usuarioid }, 
            activo: true
        },
        relations: ['usuario', 'detalladoCompras', 'detalladoCompras.producto'] 
    });
    if (!compraActiva){
        console.log("------------------------------------------------")
        console.log("User has no active purchases.")
        console.log("------------------------------------------------")
        return res.status(404).json({ message: `User with ID: ${usuarioid} has no active purchases.` });

    }

    compraActiva.status="Cancelado"
};
const formatPurchaseLimited = (compra) => {
    return {
        id: compra.id,
        descripcion: compra.descripcion,
        nombre_del_cliente: compra.nombre_del_cliente,
        precio_total: compra.precio_total,
        total_de_productos: compra.total_de_productos,
        status: compra.status,
        detalladoCompras: compra.detalladoCompras.map(dc => ({
            id: dc.id,
            cantidad: dc.cantidad
        }))
    };
};
const formatPurchaseFull = (compra) => {//even though theres an error it seems to work lmao
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