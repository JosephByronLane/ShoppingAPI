import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Productos } from "../models/Productos"
import { ResumeOptions } from "typeorm";
const Joi = require('joi')

const productosSchema = Joi.object({
    nombre: Joi.string(),
    descripcion: Joi.string(),
    precio: Joi.number(),
    categoria: Joi.string(),
    fabricante: Joi.string(),
    cantidad_en_existencia: Joi.number(),
    unidad_de_medida: Joi.string(),
});

// obtener productos pero falta la cosa de querys
export const getProductos = async (req: Request, res: Response) => {
    try{
        const { error, value } = productosSchema.validate(req.query);

        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const filtro = value;

        const productos = await Productos.find({where: filtro});

        return res.json(productos);
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
    try{
        const {nombre} = req.body
        console.log(req.body)
        const producto = new Productos();
        producto.nombre = nombre
        await producto.save()
        return res.json(producto)
    }
    catch(error){
        if(error instanceof Error)  return res.status(500).json({message: error.message})
    }
};
