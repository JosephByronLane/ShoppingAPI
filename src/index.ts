import "reflect-metadata"
import app from "./app"
import {AppDataSource} from "./db"
import {createAdminUser} from "./admin-seed"
import {seedProducts, seedPromotionalProducts} from "./add-products"
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

        console.log('-----------------------------------')
        console.log('Seeding products on promotion')
        console.log('-----------------------------------')
        await seedPromotionalProducts();

        app.listen(3000)
        console.log('-----------------------------------')
        console.log('WebAPI')
        console.log('-----------------------------------')
        console.log('-----------------------------------')
        console.log('Server is listening on port 3000')
        console.log('-----------------------------------')


    } catch(error){
        console.error(error)
    }
    
}

main();

