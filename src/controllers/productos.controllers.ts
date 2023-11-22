import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Productos } from "../models/Productos"
import { ResumeOptions } from "typeorm";

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
        const {
            nombre,
            descripcion,
            precio,
            categoria,
            fabricante,
            cantidad_en_existencia,
            unidad_de_medida,
            //activo goes here but its off by default
            extra2
        } = req.body;

        const producto = new Productos();
        producto.nombre = nombre;
        producto.descripcion = descripcion;
        producto.precio = precio;
        producto.categoria = categoria;
        producto.fabricante = fabricante;
        producto.cantidad_en_existencia = cantidad_en_existencia;
        producto.unidad_de_medida = unidad_de_medida;
        producto.extra2 = extra2;

        await producto.save();

        // Return the created product
        return res.json(producto);
        } catch (error) {
            if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
