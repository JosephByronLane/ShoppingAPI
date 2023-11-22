import { Request, Response } from "express"
import { Usuario } from "../models/Usuario"
import { BaseEntity } from "typeorm"
import bcrypt from 'bcrypt';

export const createUser = async(req : Request,res : Response) => {
    try{
        const {name, correo_electronico, contrasenia} =req.body

        const usuario = new Usuario();
        const id = req.id;
        const nombreUsuario = req.nombre
        
        if (typeof nombreUsuario !== 'string') {
            return res.status(401).json({ message: 'User name is undefined' });
        }
        if (typeof req.nombre !== 'string') {
            return res.status(400).json({ message: 'Error retrieving Username from token. Try logging in again.' });
        }
        const contraseniaHasheada = await bcrypt.hash(contrasenia, 10);

        if(!name){
            return res.status(404).json({ message: 'Invalid usernamme.' });

        }
        if(!correo_electronico){
            return res.status(404).json({ message: 'Invalid Email.' });
        }
        if(!contrasenia){
            return res.status(404).json({ message: 'Invalid Password.' });
        }

        usuario.nombre = name;
        usuario.correo_electronico = correo_electronico;
        usuario.contrasenia = contraseniaHasheada;
        usuario.usuario_de_creacion = req.nombre;
        await setParameterFields(usuario, nombreUsuario, true);


        await usuario.save()
        res.json({ 
            status:"Success",
            message:"Succesfully created User",
            data: {
                "id": usuario.id,
                "nombre": usuario.nombre,
                "correo_electronico" : usuario.correo_electronico,                
            }
           });
    }
    catch(error){
        if(error instanceof Error)  return res.status(500).json({message: error.message})
    }

}

export const getUsers = async (req: Request, res: Response) =>{
    try{
        const users = await Usuario.find({
            where: {activo: 1},
            select: ['id', 'nombre', 'correo_electronico'],
        });
        return res.json({
            status: "Success",
            message: "Retrieved all users.",
            data:{
                users
            }
        })
    }
    catch(error){
        if(error instanceof Error) return res.status(500).json({message: error.message})
    }
}

export const updateUser = async (req: Request, res: Response) =>{
    const {id} = req.params
    const user = await Usuario.findOneBy({id: parseInt(req.params.id)})
    
    if (!user) return res.status(404).json({message:'User does not exist'})

    await Usuario.update({id: parseInt(id)}, req.body)
    return res.sendStatus(204)

}

export const deleteUser = async (req: Request, res: Response)=>{
    try{
        const{id} = req.params

        if(!id){
            return res.status(404).json({message: `Error recieving User ID.`})
        }

        console.log('-----------------------------------')
        console.log(`Found ID: ${id} to delete.`);
        console.log('-----------------------------------')   

        let user  =await Usuario.findOne({
            where:{
                id: parseInt(id),
                activo:1
            }
        })

        console.log('-----------------------------------')
        console.log(`Succesfully attempted to find the User.`);
        console.log('-----------------------------------')   
        if (!user){
            console.log('-----------------------------------')
            console.log(`User with id ${id} was not found.`);
            console.log('-----------------------------------')   
            return res.status(404).json({message: `User with id: ${id} not found.`})
        }

        user.activo = 0;
        console.log('-----------------------------------')
        console.log(`Users with id ${id} active succesfully set to 0.`);
        console.log('-----------------------------------')   
        Usuario.save(user)
        res.json({ 
            status:"Success",
            message:"Succesfully deleted.",
        });
    }
    catch(error){
        if(error instanceof Error) return res.status(500).json({message:error.message})
    }
}

export const getUser = async(req:Request, res:Response)=>{
    try{
        const{id} = req.params

        if(!id){
            return res.status(404).json({message: `Error recieving User ID.`})
        }

        console.log('-----------------------------------')
        console.log(`Found ID: ${id} to show.`);
        console.log('-----------------------------------')   

        let user  =await Usuario.findOne({
            where:{
                id: parseInt(id),
                activo:1
            },
            select: ['id', 'nombre', 'correo_electronico'],
        })

        console.log('-----------------------------------')
        console.log(`Succesfully attempted to find the User.`);
        console.log('-----------------------------------')   
        if (!user){
            console.log('-----------------------------------')
            console.log(`User with id ${id} was not found.`);
            console.log('-----------------------------------')   
            return res.status(404).json({message: `User with id: ${id} not found.`})
        }

        console.log('-----------------------------------')
        console.log(`Users with id ${id} active was succesfully found..`);
        console.log('-----------------------------------')   

        res.json({ 
            status:"Success",
            message:"Succesfully deleted.",
            data: user
        });
        
    }
    catch(error){
        if(error instanceof Error) return res.status(500).json({message:error.message})
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

async function setParameterFields(entity: Usuario, nombresIuario: string, isNew: boolean = false): Promise<BaseEntity> {
    const userField = isNew ? 'usuario_de_creacion' : 'usuario_de_actualizacion';
    entity[userField] = nombresIuario;
    await entity.save();
    return entity;
}