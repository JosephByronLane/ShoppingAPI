import {Router} from 'express'
import { createUser, deleteUser, getUser, updateUser, getUsers} from '../controllers/usuario.controllers'

const router = Router()

router.post('/usuario',createUser)
router.get('/usuario', getUsers)
router.put('/usuario/:id', updateUser)
router.delete('/usuario/:id', deleteUser)
router.get('/usuario/:id', getUser)



export default router