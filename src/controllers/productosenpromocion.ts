import { Request, Response } from "express";
import { ProductosEnPromocion } from "../models/ProductosEnPromocion"
import { Productos } from "../models/Productos";
import { validateEntity } from "./validation.controller";


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
        const{id} = req.params

        if(!id){
            return res.status(404).json({message: `Error recieving product ID.`})
        }

        console.log('-----------------------------------')
        console.log(`Found ID: ${id} to delete.`);
        console.log('-----------------------------------')   
        let promoProduct  =await ProductosEnPromocion.findOne({
            where:{
                id: parseInt(id)
            }
        })

        console.log('-----------------------------------')
        console.log(`Succesfully attempted to find product.`);
        console.log('-----------------------------------')   
        if (!promoProduct){
            console.log('-----------------------------------')
            console.log(`Product was not found.`);
            console.log('-----------------------------------')   
            return res.status(404).json({message: `Product with id: ${id} not found.`})
        }

        promoProduct.activo = 0;
        console.log('-----------------------------------')
        console.log(`Product's active succesfully set to 0.`);
        console.log('-----------------------------------')   
        res.json({ 
            status:"Success",
            message:"Succesfully deleted.",
        });
    }
    catch(error){
        if(error instanceof Error) return res.status(500).json({message:error.message})
    }
};

export const createProductoEP = async (req: Request, res: Response) => {
    try{
        const {idproducto} = req.body
        const promoProduct = new ProductosEnPromocion();

        const errors = await validateEntity(promoProduct, req.body);
        
        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }

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
        return res.json({ 
            status:"Success",
            message:"Succesfully created Promotional product",
            data: {
                "id": promoProduct.id,
                "nombre": promoProduct.nombre            
            }
           });
    }
    catch(error){
        if(error instanceof Error)  return res.status(500).json({message: error.message})
    }
};