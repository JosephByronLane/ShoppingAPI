import "reflect-metadata"
import app from "./app"
import {AppDataSource} from "./db"
import {createAdminUser} from "./admin-seed"

export const needlogin = true;

import dotenv from 'dotenv';
dotenv.config();

async function main(){
    try{
        await AppDataSource.initialize()
        console.log("Database connected")
        await createAdminUser()
        app.listen(3000)
        console.log('Server is listening on port 3000')
        console.log('-----------------------------------')


    } catch(error){
        console.error(error)
    }
    
}

main();

