import { Request, Response } from "express";
import { ProductosEnPromocion } from "../models/ProductosEnPromocion";
import { hasUnallowedFields, validateEntity } from "./validation.controller";
import { Productos } from "../models/Productos";

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

        const productos = await ProductosEnPromocion.find({
            where:{
                ...filtro,
                activo:1
            },
            select: [
                'id',
                'nombre',
                'descripcion',
                'precio_en_promocion',
                'fecha_de_inicio',
                'fecha_de_finalizacion'
            ]
        });

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
    const allowedUpdateFields = ['id','nombre','descripcion','precio_en_promocion','fecha_de_inicio','fecha_de_finalizacion']; 

    if (hasUnallowedFields(req.body, allowedUpdateFields)) {
        return res.status(400).json({ message: 'Request contains unallowed fields' });
    }
    let producto = await ProductosEnPromocion.findOneBy({id: parseInt(req.params.id)})
    console.log(producto)

    if (!producto) return res.status(404).json({message:'Producto en promocion does not exist'})
    
    await ProductosEnPromocion.update({id: parseInt(id)}, req.body)

    producto =await ProductosEnPromocion.findOneBy({id: parseInt(req.params.id)})

    if(!producto){
        return res.status(404).json({message:"Error finding product. Please try again or contact tech support."})
    }

    return res.json({
        status:"Success",
        message:"Succesfully updated product en promocion",
        data:{
            id: producto.id,
            nombre: producto.nombre,
            descripcion: producto.descripcion,
            precio_en_promocion: producto.precio_en_promocion,
            fecha_de_inicio: producto.fecha_de_inicio,
            fecha_de_finalizacion: producto.fecha_de_finalizacion
        }
    })
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