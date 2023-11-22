import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { ProductosEnPromocion } from "../models/ProductosEnPromocion"
import { ResumeOptions } from "typeorm";
import { Productos } from "../models/Productos";

export const getProductoEPs = async (req: Request, res: Response) => {
    try{
        const productoEPs = await ProductosEnPromocion.find({
            where:{
                activo:1
            }
        });
        return res.json(productoEPs)
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
        const{idproducto} = req.params


        var promoProduct  =await ProductosEnPromocion.findOne({
            where:{
                id: parseInt(idproducto)
            }
        })
        if (!promoProduct){
            return res.status(404).json({message: `Product with id: ${idproducto} not found.`})
        }

        promoProduct.activo = 0;

    }
    catch(error){
        if(error instanceof Error) return res.status(500).json({message:error.message})
    }
};

export const createProductoEP = async (req: Request, res: Response) => {
    try{
        const {nombre, descripcion, precio_en_promocion, fecha_de_inicio, fecha_de_finalizacion, idproducto} = req.body
        const promoProduct = new ProductosEnPromocion();
        promoProduct.nombre = nombre
        promoProduct.descripcion = descripcion;
        promoProduct.precio_en_promocion = precio_en_promocion;
        promoProduct.fecha_de_inicio = new Date(fecha_de_inicio);
        promoProduct.fecha_de_finalizacion = new Date(fecha_de_finalizacion);

        console.log('-----------------------------------')
        console.log(`Found all base variables`);
        console.log('-----------------------------------')   

        const producto = await Productos.findOne({
            where: {
                id: idproducto, 
            }           
        });

        console.log('-----------------------------------')
        console.log(`Was able to retrieve product based on ID`);
        console.log('-----------------------------------')  

        if (!producto) {
            console.log('-----------------------------------')
            console.log(`Product was not found`);
            console.log('-----------------------------------')  
            return res.status(404).json({ message: `Product with id: ${idproducto} not found.` });
        }
        promoProduct.producto = producto;
        await ProductosEnPromocion.save(promoProduct);
        await promoProduct.save()
        return res.json(promoProduct)
    }
    catch(error){
        if(error instanceof Error)  return res.status(500).json({message: error.message})
    }
};