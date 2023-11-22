import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { ProductosEnPromocion } from "../models/ProductosEnPromocion"
import { ResumeOptions } from "typeorm";
const Joi = require('joi')

const productosEPSchema = Joi.object({
    nombre: Joi.string(),
    descripcion: Joi.string(),
    precio_en_promocion: Joi.number()
});

export const getProductoEPs = async (req: Request, res: Response) => {
    try{
        const { error, value } = productosEPSchema.validate(req.query);

        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const filtro = value;

        const productos = await ProductosEnPromocion.find({where: filtro});

        return res.json(productos);
    }
    catch(error){
        if(error instanceof Error) return res.status(500).json({message: error.message})
    }
};

export const getProductoEPById = async (req: Request, res: Response) => {
    try{
        const productoEP = await ProductosEnPromocion.findOneBy({id:parseInt(req.params.id)})
        return res.json(productoEP)
    }
    catch(error){
    if(error instanceof Error){
        return res.status(500).json({message: error.message})
        }
    }
};

export const updateProductoEP = async (req: Request, res: Response) =>{
    const {id} = req.params
    const producto = await ProductosEnPromocion.findOneBy({id: parseInt(req.params.id)})
    console.log(producto)

    if (!producto) return res.status(404).json({message:'Producto does not exist'})

    await ProductosEnPromocion.update({id: parseInt(id)}, req.body)
    return res.sendStatus(204)
}

export const deleteProductoEP = async (req: Request, res: Response) => {
    try{
        const{id} = req.params

        const result = await ProductosEnPromocion.delete({id:parseInt(id)})
        if (result.affected ===0){
            return res.status(404).json({message: "Producto not found"})
        }
        return res.sendStatus(204)
    }
    catch(error){
        if(error instanceof Error) return res.status(500).json({message:error.message})
    }
};

export const createProductoEP = async (req: Request, res: Response) => {
    try{
        const {nombre} = req.body
        console.log(req.body)
        const producto = new ProductosEnPromocion();
        producto.nombre = nombre
        await producto.save()
        return res.json(producto)
    }
    catch(error){
        if(error instanceof Error)  return res.status(500).json({message: error.message})
    }
};