import {Router} from 'express'
import { createUser, updateUser } from '../controllers/usuario.controllers'
import { getUsers } from '../controllers/usuario.controllers'

import { create } from 'domain'


const router = Router()

router.post('/usuario',createUser)
router.get('/usuario', getUsers)
router.put('/usuario/:id', updateUser)

export default router