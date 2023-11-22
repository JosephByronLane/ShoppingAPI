import { Request, Response } from "express";
import { Productos } from "../models/Productos"
import { validate } from 'class-validator';
import { validateEntity } from "./validation.controller";


export const getProductos = async (req: Request, res: Response) => {
    try{
        const productos = await Productos.find();
        return res.json(productos)
    }
    catch(error){
        if(error instanceof Error) return res.status(500).json({message: error.message})
    }
};

export const getProductoById = async (req: Request, res: Response) => {
    try{
        const producto = await Productos.findOneBy({id:parseInt(req.params.id)})
        return res.json(producto)
    }
    catch(error){
    if(error instanceof Error){
        return res.status(500).json({message: error.message})
        }
    }
};

export const updateProducto = async (req: Request, res: Response) =>{
    const {id} = req.params
    const producto = await Productos.findOneBy({id: parseInt(req.params.id)})
    console.log(producto)

    if (!producto) return res.status(404).json({message:'Producto does not exist'})

    await Productos.update({id: parseInt(id)}, req.body)
    return res.sendStatus(204)
}


// borrar el producto 
export const deleteProducto = async (req: Request, res: Response) => {
    try{
        const{id} = req.params

        const result = await Productos.delete({id:parseInt(id)})
        if (result.affected ===0){
            return res.status(404).json({message: "Producto not found"})
        }
        return res.sendStatus(204)
    }
    catch(error){
        if(error instanceof Error) return res.status(500).json({message:error.message})
    }
};

export const createProducto = async (req: Request, res: Response) => {
    try {
        const producto = new Productos();

        const errors = await validateEntity(producto, req.body);
        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }

        await producto.save();

        return res.json({ 
            status:"Success",
            message:"Succesfully created Product",
            data: {
                id: producto.id,
                nombre: producto.nombre
            }
           });
        } catch (error) {
            if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
