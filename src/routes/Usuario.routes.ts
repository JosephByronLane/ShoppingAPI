import {Router} from 'express'
import { createUser } from '../controllers/usuario.controllers'
import { getUsers } from '../controllers/usuario.controllers'

import { create } from 'domain'


const router = Router()

router.post('/usuario',createUser)
router.get('/usuario', getUsers)

export default router