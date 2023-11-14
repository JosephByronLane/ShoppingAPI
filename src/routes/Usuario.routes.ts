import {Router} from 'express'
import { createUser, deleteUser, getUser, updateUser, getUsers } from '../controllers/usuario.controllers'
import {verifyToken} from '../middleware/auth.middleware'
const router = Router()
import {needlogin} from '../index'



if(needlogin){
    router.post('/usuario', verifyToken, createUser)
    router.get('/usuario', verifyToken, getUsers)
    router.put('/usuario/:id',verifyToken, updateUser)
    router.delete('/usuario/:id',verifyToken, deleteUser)
    router.get('/usuario/:id', verifyToken, getUser)
}
else{
    router.post('/usuario',  createUser)
    router.get('/usuario',  getUsers)
    router.put('/usuario/:id', updateUser)
    router.delete('/usuario/:id', deleteUser)
    router.get('/usuario/:id',  getUser)
}



export default router