import { date } from "joi";
import { Usuario } from "./models/Usuario";
import bcrypt from 'bcrypt';


const usersToAdd = [
    {
        "nombre": "Samantha Ruiz",
        "correo_electronico": "samantha.ruiz@example.com",
        "contrasenia": "admin"
    },
    {
        "nombre": "Lucia Gonzalez",
        "correo_electronico": "lucia.gonzalez@example.com",
        "contrasenia": "admin"
    },
    {
        "nombre": "Diego Martínez",
        "correo_electronico": "diego.martinez@example.com",
        "contrasenia": "admin"
    },
    {
        "nombre": "María Fernández",
        "correo_electronico": "maria.fernandez@example.com",
        "contrasenia": "admin"
    },
    {
        "nombre": "Carlos Hernandez",
        "correo_electronico": "carlos.hernandez@example.com",
        "contrasenia": "admin"
    },
    {
        "nombre": "Samantha Ruiz",
        "correo_electronico": "samantha.ruiz@example.com",
        "contrasenia": "admin"
    }
]


export async function seedUsers() {
    for (const userData of usersToAdd) {
        const existingUser = await Usuario.findOne({
            where: [
                { nombre: userData.nombre },
                { correo_electronico: userData.correo_electronico }
            ]
        });

        if (!existingUser) {
            const hashedPassword = await bcrypt.hash(userData.contrasenia, 10);

            const usuario = new Usuario();
            usuario.nombre = userData.nombre;
            usuario.correo_electronico = userData.correo_electronico;
            usuario.contrasenia = hashedPassword;
            usuario.fecha_de_creacion = new Date(); 

            await usuario.save();
            console.log(`User ${userData.nombre} created successfully.`);
        } else {
            console.log(`User ${userData.nombre} already exists. Skipping.`);
        }
    }
}