import {Router} from 'express'
import { createUser } from '../controllers/usuario.controllers'
import { create } from 'domain'


const router = Router()

router.post('/usuario',createUser)

export default router