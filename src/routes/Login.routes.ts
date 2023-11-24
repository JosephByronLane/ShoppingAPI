import {Router} from 'express'
import { tryLogin} from '../controllers/auth.controllers'


const router = Router()


router.post('/equipo-2/login', tryLogin)




export default router