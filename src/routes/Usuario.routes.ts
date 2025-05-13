import {Router} from 'express'
import { createUser, deleteUser, getUser, updateUser, getUsers } from '../controllers/usuario.controllers'
import {verifyToken} from '../middleware/auth.middleware'

const router = Router()

router.post('/equipo-2/user', verifyToken, createUser)
router.get('/equipo-2/users', verifyToken, getUsers)
router.put('/equipo-2/user/:id',verifyToken, updateUser)
router.delete('/equipo-2/user/:id',verifyToken, deleteUser)
router.get('/equipo-2/user/:id',  verifyToken, getUser)


export default router