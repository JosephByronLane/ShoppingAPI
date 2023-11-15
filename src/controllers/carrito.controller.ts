import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
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
        relations: ['producto'] // Include related product details
    });

    return res.json(cartItems);
};