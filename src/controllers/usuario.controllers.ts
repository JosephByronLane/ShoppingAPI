import { Request, Response } from "express"
import { Usuario } from "../models/Usuario"
const Joi = require('joi')

const usuariosSchema = Joi.object({
    nombre: Joi.string(),
    correo_electronico: Joi.string()
})

export const createUser = async(req : Request,res : Response) => {
    try{
        const { error, value } = usuariosSchema.validate(req.query);

        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const filtro = value;

        const productos = await Usuario.find({where: filtro});

        return res.json(productos);
    }
    catch(error){
        
        if(error instanceof Error) return res.status(500).json({message: error.message})
    }
}

export const getUsers = async (req: Request, res: Response) =>{
    try{
        const users = await Usuario.find();
        return res.json(users)
    }
    catch(error){
        if(error instanceof Error) return res.status(500).json({message: error.message})
    }
}

export const updateUser = async (req: Request, res: Response) =>{
    const {id} = req.params
    const user = await Usuario.findOneBy({id: parseInt(req.params.id)})
    console.log(user)

    if (!user) return res.status(404).json({message:'User does not exist'})

    await Usuario.update({id: parseInt(id)}, req.body)
    return res.sendStatus(204)

}

export const deleteUser = async (req: Request, res: Response)=>{
    try{
        const{id} = req.params

        const result = await Usuario.delete({id:parseInt(id)})
        if (result.affected ===0){
            return res.status(404).json({message: "User not found"})
        }
        return res.sendStatus(204)
    }
    catch(error){
        if(error instanceof Error) return res.status(500).json({message:error.message})
    }
}

export const getUser = async(req:Request, res:Response)=>{
    
try{
        //MISSING ERROR HANDLING, IM LAZY SRY
        const user = await Usuario.findOneBy({id:parseInt(req.params.id)})
        return res.json(user)
}
catch(error){
    if(error instanceof Error){
        return res.status(500).json({message: error.message})
    }
}

}

export const getUserByUsername = async (req: Request, res: Response) => {
    try {
        const user = await findUserByUsername(req.params.usuario);
        if (user) {
            return res.json(user);
        } else {
            return res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};

export const findUserByUsername = async (nombre: string): Promise<Usuario | null> => {
    try {
        const user = await Usuario.findOneBy({ nombre });
        return user || null;
    } catch (error) {
        console.error(error);
        return null;
    }
};
