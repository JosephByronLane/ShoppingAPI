import "reflect-metadata"
import app from "./app"
import {AppDataSource} from "./db"
import {createAdminUser} from "./admin-seed"
import {seedProducts} from "./add-products"
export const needlogin = true;

import dotenv from 'dotenv';
dotenv.config();

async function main(){
    try{
        await AppDataSource.initialize()
        console.log("Database connected")

        console.log('-----------------------------------')
        console.log('Creating admin user')
        console.log('-----------------------------------')
        await createAdminUser()
        
        console.log('-----------------------------------')
        console.log('Seeding products')
        console.log('-----------------------------------')
        await seedProducts();


        app.listen(3000)
        console.log('-----------------------------------')
        console.log('Server is listening on port 3000')
        console.log('-----------------------------------')


    } catch(error){
        console.error(error)
    }
    
}

main();

