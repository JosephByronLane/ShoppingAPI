import "reflect-metadata"
import app from "./app"
import {AppDataSource} from "./db"
import dotenv from 'dotenv';
import {createAdminUser} from "./admin-seed"

dotenv.config();
async function main(){
    try{
        await AppDataSource.initialize()
        console.log("Database connected")
        await createAdminUser()
        app.listen(3000)
        console.log('Server is listening on port 3000')


    } catch(error){
        console.error(error)
    }
    
}

main();

