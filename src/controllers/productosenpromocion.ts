import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { ProductosEnPromocion } from "../models/ProductosEnPromocion"
import { ResumeOptions } from "typeorm";
import { Productos } from "../models/Productos";

export const getProductoEPs = async (req: Request, res: Response) => {
    try{
        const productoEPs = await ProductosEnPromocion.find();
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
        const {nombre, descripcion, precio_en_promocion, fecha_de_inicio, fecha_de_finalizacion, idproducto} = req.body
        const promoProduct = new ProductosEnPromocion();
        promoProduct.nombre = nombre
        promoProduct.descripcion = descripcion;
        promoProduct.precio_en_promocion = precio_en_promocion;
        promoProduct.fecha_de_inicio = new Date(fecha_de_inicio);
        promoProduct.fecha_de_finalizacion = new Date(fecha_de_finalizacion);

        const producto = await Productos.findOne({
            where: {
                id: idproducto, 
            },
            relations: ['usuario', 'detalladoCompras', 'detalladoCompras.producto'] 
        });

        if (!producto) {
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