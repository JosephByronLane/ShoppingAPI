import { Request, Response } from "express"
import { Usuario } from "../entities/Usuario"
import { ResumeOptions } from "typeorm";

export const createUser = async(req : Request,res : Response) => {
    try{
        const {name} =req.body

        const usuario = new Usuario();
        usuario.nombre = name
        await usuario.save()
        return res.json(usuario)
    }
    catch(error){
        if(error instanceof Error)  return res.status(500).json({message: error.message})
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