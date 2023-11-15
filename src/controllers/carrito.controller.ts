import { Request, Response } from 'express';
import { CarritoItem } from '../models/CarritoItem';
import { Productos } from '../models/Productos';
import { Usuario } from '../models/Usuario';

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
    let carritoitem = await CarritoItem.findOne({
        where: {
            producto: { id: productoId }, 
            usuario: { id: usuarioid } 
        }
    });

    if (carritoitem) {
        carritoitem.quantity += parseInt(cantidad);
    } else {
        carritoitem = new CarritoItem();
        carritoitem.producto = producto;
        carritoitem.quantity = parseInt(cantidad);
        carritoitem.usuario = user;         
    }
    await CarritoItem.save(carritoitem);
    return res.json(carritoitem);
};


export const getCartItems = async (req: Request, res: Response) => {
    const userId = req.id;

    const cartItems = await CarritoItem.find({
        where: {
            usuario: { id: userId }
        },
        relations: ['producto'] 
    });

    return res.json(cartItems);
};

export const removeFromCart = async (req: Request, res: Response) => {
    const { cartItemId } = req.body;
    console.log(req.params)
    console.log("attempting to find cart item. ID: " + cartItemId);
    
    const cartItem = await CarritoItem.findOneBy({ id: parseInt(cartItemId) });
    console.log("found corresponding cart item");

    if (!cartItem) {
        return res.status(404).json({ message: 'Cart item not found' });
    }

    await CarritoItem.remove(cartItem);

    return res.status(204).send();
};

export const updateCartItem = async (req: Request, res: Response) => {
    const { carritoItemId, nuevaCantidad } = req.body;

    const cartItem = await CarritoItem.findOneBy({ id: carritoItemId });

    if (!cartItem) {
        return res.status(404).json({ message: 'Cart item not found' });
    }

    if (nuevaCantidad <= 0) {
        return res.status(400).json({ message: 'Quantity must be greater than zero' });
    }

    cartItem.quantity = parseInt(nuevaCantidad);
    await CarritoItem.save(cartItem);

    return res.json(cartItem);
};