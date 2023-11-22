import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { ResumeOptions } from "typeorm";
import { Productos } from "../models/Productos"
import { validateEntity } from "./validation.controller";
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


export const getProductos = async (req: Request, res: Response) => {
    try{
        const { error, value } = productosSchema.validate(req.query);

        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const filtro = value;

        const products = await Productos.find({
            where: {
                ...filtro,
                activo: 1
            },
            select: ['id', 'nombre', 'precio', 'descripcion', 'categoria', 'fabricante', 'cantidad_en_existencia','unidad_de_medida'],
        });
        return res.json({
            status: "Success",
            message: "Retrieved all users.",
            data:{
                products
            }
        })
    }
    catch(error){
        if(error instanceof Error) return res.status(500).json({message: error.message})
    }
};

export const getProductoById = async (req: Request, res: Response) => {
    try{
        var id =  req.params.id

        let producto  =await Productos.findOne({
            where:{
                id: parseInt(id),
                activo:1
            },
            select: ['id', 'nombre', 'precio', 'descripcion', 'categoria', 'fabricante', 'cantidad_en_existencia','unidad_de_medida'],
        })

        if (!producto){
            console.log('-----------------------------------')
            console.log(`producto with id ${id} was not found.`);
            console.log('-----------------------------------')   
            return res.status(404).json({message: `producto with id: ${id} not found.`})
        }

        return res.json({ 
            status:"Success",
            message:"Succesfully found producto.",
            data: producto
        });
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


export const deleteProducto = async (req: Request, res: Response) => {
    try{
        const{id} = req.params

        if(!id){
            return res.status(404).json({message: `Error recieving User ID.`})
        }

        console.log('-----------------------------------')
        console.log(`Found ID: ${id} to delete.`);
        console.log('-----------------------------------')   

        let producto  =await Productos.findOne({
            where:{
                id: parseInt(id),
                activo:1
            }
        })

        console.log('-----------------------------------')
        console.log(`Succesfully attempted to find the Producto.`);
        console.log('-----------------------------------')   
        if (!producto){
            console.log('-----------------------------------')
            console.log(`Producto with id ${id} was not found.`);
            console.log('-----------------------------------')   
            return res.status(404).json({message: `Producto with id: ${id} not found.`})
        }

        producto.activo = 0;
        console.log('-----------------------------------')
        console.log(`Producto with id ${id} active succesfully set to 0.`);
        console.log('-----------------------------------')   

        Productos.save(producto)
        res.json({ 
            status:"Success",
            message:"Succesfully deleted.",
        });
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
