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
        compraActiva.usuario_de_creacion = usuarionombre as string
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
        detallePedido.usuario_de_creacion = usuarionombre as string;
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


    compraActiva = await Compras.findOne({
        where: { id: compraActiva.id },
        relations: ['detalladoCompras', 'detalladoCompras.producto']
    });


    if (!compraActiva){
        return res.status(404).json({ message: `Error retrieving purchase. Try again or call tech support, lmao.` });
    }
    const formattedCompra = formatPurchaseLimited(compraActiva);

    return res.json(
        {
            status: "Success",
            messagE:"Added Item to purchase succesfully.",
            data: formattedCompra
        });
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

    const formattedCompra = formatPurchaseFull(compra);

    return res.json({
        status: "Success",
        message: `Found purchase with id: ${purchaseId}`,
        data: {
            formattedCompra
        }
    });};

export const removeFromCart = async (req: Request, res: Response) => {
    const { detalladoCompraId } = req.body;
    const usuarioId = req.id; 


    if(typeof detalladoCompraId != 'number'){
        return res.status(404).json({ message: 'Error processing ID.Please make sure its a number.' });
    }
    console.log("------------------------------------------------")
    console.log("attempting to find cart item. ID: " + detalladoCompraId);
    console.log("------------------------------------------------")

    
    const detalladoCompra = await DetalladoCompras.findOne({
        where: { id: detalladoCompraId },
        relations: ['producto', 'compra', 'compra.usuario'],
    });
    console.log("------------------------------------------------")
    console.log("found corresponding cart item");
    console.log("------------------------------------------------")

    if (!detalladoCompra) {
        return res.status(404).json({ message: 'Cart item not found' });
    }

    if (detalladoCompra.compra.status !== 'Activo' || detalladoCompra.compra.usuario.id !== req.id) {
        return res.status(403).json({ message: 'You do not have permission to remove this item.' });
    }
    detalladoCompra.compra.total_de_productos -= detalladoCompra.cantidad
    detalladoCompra.producto.cantidad_en_existencia+=detalladoCompra.cantidad
    await DetalladoCompras.remove(detalladoCompra);

    return res.json({ 
        status:"Success",
        message:"Succesfully removed item from cart",
        data: {
            "detalladoCompraId":detalladoCompraId,
            "productoNombre": detalladoCompra.producto.nombre
        }
       }); 
};

export const updateCartItem = async (req: Request, res: Response) => {
    const {id} = req.params
    const {nombre} = req.params

    const {nuevaCantidad } = req.body;

    let cartItem = await DetalladoCompras.findOne({
        where: {
             id: parseInt(id) 
            },
        relations: ['producto', 'compra'], 
    });


    if (!cartItem) {
        return res.status(404).json({ message: 'detalleProducto found, make sure its an active purchase.' });
    }

    if (nuevaCantidad <= 0) {
        return res.status(400).json({ message: 'Quantity must be greater than zero' });
    }
    if(cartItem.compra.activo != true){
        return res.status(400).json({message:"You must be modifying an active purchase."})
    }

    const priceToRemove = (cartItem.producto.precio * cartItem.cantidad);
    cartItem.compra.precio_total -= priceToRemove;
    cartItem.compra.total_de_productos -= cartItem.cantidad
    cartItem.producto.cantidad_en_existencia += cartItem.cantidad

    const priceToAdd = (cartItem.producto.precio*parseInt(nuevaCantidad))
    cartItem.producto.cantidad_en_existencia-=parseInt(nuevaCantidad)

    cartItem.compra.precio_total += priceToAdd
    cartItem.compra.total_de_productos += parseInt(nuevaCantidad)
    cartItem.compra.usuario_de_actualizacion = nombre as string

    cartItem.cantidad = parseInt(nuevaCantidad);

    await Productos.save(cartItem.producto); 
    await DetalladoCompras.save(cartItem);
    await Compras.save(cartItem.compra);

    const updatedCompra = await Compras.findOne({
        where: { id: cartItem.compra.id },
        relations: ['detalladoCompras', 'detalladoCompras.producto'], 
    });
    
    if (!updatedCompra) {
        return res.status(404).json({ message: 'Error finding updated Compra, please contact tech support.' });
    }

    const formattedCompra = formatPurchaseLimited(updatedCompra);

    return res.json({
        status:"Success",
        message:"Succesfuly updated item in detalladoProducto",
        data:{
            formattedCompra
        }
    });
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
    compraActiva.status="Finalizado"
    compraActiva.activo=false;
    Compras.save(compraActiva)
    return res.json({ 
        status:"Success",
        message:"Succesfully finalized purchase",
        data: {
            "purchaseId": compraActiva.id,
            "detalladoPedido": compraActiva.detalladoCompras             
        }
       }); 
};

export const cancelarPedido = async (req: Request, res: Response) => {
    const usuarioid = req.id;
    const compraId = parseInt(req.params.id);

    console.log(compraId)

    if (isNaN(compraId)) {
        return res.status(400).json({ message: "Invalid Compra ID." });
    }

    const compraActiva = await Compras.findOne({
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
    await compraActiva.save();

    return res.json({
        status: "Success",
        message: `Compra with ID: ${compraId} has been canceled.`
    });
};
const formatPurchaseLimited = (compra: Compras) => {//even though theres an error it seems to work lmao
    return {
        compraId: compra.id,
        descripcion: compra.descripcion,
        nombre_del_cliente: compra.nombre_del_cliente,
        precio_total: compra.precio_total,
        total_de_productos: compra.total_de_productos,
        status: compra.status,
        detalladoCompras: compra.detalladoCompras ? compra.detalladoCompras.map(dc => ({
            detalladoCompraId: dc.id,
            productoId: dc.producto?.id,
            productoNombre: dc.producto?.nombre,
            cantidad: dc.cantidad,
        })) : ["ERROR RETRIEVING DETALLADOCOMPRAS BUT DONT WORRY, THE DATA WAS UPDATED/SET/PUT/WHATEVER CORRECTLY."]
    };
};

const formatPurchaseFull = (compra: Compras) => {//even though theres an error it seems to work lmao
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