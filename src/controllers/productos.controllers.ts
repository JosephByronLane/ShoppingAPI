import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Productos } from "../entities/Productos"
import { ResumeOptions } from "typeorm";


export const getProducts = async (req: Request, res: Response) => {
    try{
        const productos = await Productos.find();
        return res.json(productos)
    }
    catch(error){
        if(error instanceof Error) return res.status(500).json({message: error.message})
    }
};




export const getProductById = async (req: Request, res: Response) => {
   





    };

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const productRepository = getRepository(Productos);
        const deleteResult = await productRepository.delete(req.params.id);

        if (deleteResult.affected === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }

        return res.sendStatus(204);
    } catch (error) {
        if(error instanceof Error) return res.status(500).json({ message: error.message });
    }
};
