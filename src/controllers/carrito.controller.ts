import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Carrito } from '../models/Carrito';
import { Productos } from '../models/Productos';
import { Usuario } from '../models/Usuario';

export const addToCart = async (req: Request, res: Response) => {
    const usuarioid = req.id; 
    const usuarionombre = req.nombre;
    const { productoId, quantity } = req.body;

    const producto = await Productos.findOneBy({ id: productoId });
    const user = await Usuario.findOneBy({id: usuarioid});

    if (!producto) {
        return res.status(404).json({ message: 'Product not found' });
    }
    if (!user) {
        return res.status(404).json({ message: 'Error finding user (you).' });
    }
    let carrito = await Carrito.findOne({
        where: { producto: productoId},
    });

    if (carrito) {
        carrito.quantity += quantity;
    } else {
        carrito = new Carrito();
        carrito.producto = producto;
        carrito.quantity = quantity;
        carrito.usuario = user;
    }
    await carrito.save();

    return res.json(carrito);
};

export const updateCartProduct = async (req: Request, res: Response) => {
    const { carritoId, quantity } = req.body;

    const carritoRepository = getRepository(Carrito);
    const carrito = await carritoRepository.findOneBy({ id: carritoId });

    if (!carrito) {
        return res.status(404).json({ message: 'Carrito not found' });
    }

    carrito.quantity = quantity;
    await carritoRepository.save(carrito);

    return res.json(carrito);
};

export const removeFromCart = async (req: Request, res: Response) => {
    const { carritoId } = req.params;

    const carritoRepository = getRepository(Carrito);
    const carrito = await carritoRepository.findOneBy({ id: parseInt(carritoId) });

    if (!carrito) {
        return res.status(404).json({ message: 'Carrito not found' });
    }

    await carritoRepository.remove(carrito);

    return res.status(204).send();
};

export const getCarritos = async (req: Request, res: Response) => {
    const userId = req.id; // Get the user ID from the request
    const carritoRepository = getRepository(Carrito);
    const carritos = await carritoRepository.find({
        where: { /* user: userId */ },
    });

    return res.json(carritos);
}