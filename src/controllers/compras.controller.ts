import { Request, Response } from 'express';
import { DetalladoCompras } from '../models/DetalladoCompras';
import { Productos } from '../models/Productos';
import { Usuario } from '../models/Usuario';
import { Compras } from '../models/Compras';

export const addToCart = async (req: Request, res: Response) => {
    
    const usuarioid = req.id; 
    const usuarionombre = req.nombre;

    const { productoId, cantidad } = req.body;

    const producto = await Productos.findOneBy({ id: productoId });
    const user = await Usuario.findOneBy({id: usuarioid});

    console.log("Found related data.")

    if (typeof cantidad !== 'number') {
        return res.status(404).json({ message: `Cantidad must be a number.` });

    }

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
        compraActiva = new Compras();
        compraActiva.usuario = user;
        compraActiva.nombre_del_cliente = user.nombre;
        await Compras.save(compraActiva);
        console.log(compraActiva)
        console.log("------------------------------------------------")

    }
    else{
        console.log("------------------------------------------------")
        console.log("User has an active purchase, using that one")
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
        detallePedido.cantidad += cantidad;
        console.log(`${detallePedido.cantidad}`)
        console.log("------------------------------------------------")

    } else {
        detallePedido = new DetalladoCompras();
        await DetalladoCompras.save(detallePedido);
        console.log("------------------------------------------------")
        console.log(`PRODUCT NOT FOUND: Making new product, adding ${cantidad} to a new detallePedido with id: ${detallePedido.id}`)
        console.log("------------------------------------------------")
        detallePedido.compra=compraActiva;
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
    
    compraActiva.total_de_productos += cantidad
    
    producto.cantidad_en_existencia -= cantidad;

    await Compras.save(compraActiva)
    console.log("------------------------------------------------")
    console.log(`Saved compra`)
    console.log("------------------------------------------------")
    
    await DetalladoCompras.save(detallePedido);
    console.log("------------------------------------------------")
    console.log(`Saved detallePedido`)
    console.log("------------------------------------------------")
    
    await Productos.save(producto);
    console.log("------------------------------------------------")
    console.log(`Saved producto`)
    console.log("------------------------------------------------")

    //const formattedCompra = formatPurchaseLimited(compraActiva);

    compraActiva = await Compras.findOne({
        where: { id: compraActiva.id },
        relations: ['detalladoCompras']
    });
    return res.json(compraActiva);
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

    console.log("------------------------------------------------")
    console.log("Got user ID")
    console.log("------------------------------------------------")

    const compraActiva = await Compras.findOne({
        where: {
            usuario: { id: usuarioid }, 
            activo: true
        }
    });
    if (!compraActiva){
        console.log("------------------------------------------------")
        console.log("User has no active purchases.")
        console.log("------------------------------------------------")
        return res.status(404).json({ message: `User with ID: ${usuarioid} has no active purchases.` });
    }
    compraActiva.status="Terminado"
    compraActiva.activo=false;
    Compras.save(compraActiva)
    return res.json({ 
        status:"Success",
        message:"Succesfully finalized purchase",
        data: {
            "id": compraActiva.id             
        }
       }); 
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