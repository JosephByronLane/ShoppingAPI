import {Router} from 'express'
import { createUser, deleteUser, getUser, updateUser } from '../controllers/usuario.controllers'
import { getUsers } from '../controllers/usuario.controllers'

const router = Router()

router.post('/usuario', createUser)
router.get('/usuario', getUsers)
router.put('/usuario/:id',verifyToken, updateUser)
router.delete('/usuario/:id',verifyToken, deleteUser)
router.get('/usuario/:id', verifyToken, getUser)



export default router