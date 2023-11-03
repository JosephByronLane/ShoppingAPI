import {Router} from 'express'
import { createUser, deleteUser, getUser, updateUser } from '../controllers/usuario.controllers'
import { getUsers } from '../controllers/usuario.controllers'

import { create } from 'domain'


const router = Router()

router.post('/usuario',createUser)
router.get('/usuario', getUsers)
router.put('/usuario/:id', updateUser)
router.delete('/usuario/:id', deleteUser)
router.get('/usuario/:id', getUser)



export default router