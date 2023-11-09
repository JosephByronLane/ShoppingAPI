import {Router} from 'express'
import { tryLogin} from '../controllers/auth.controllers'


const router = Router()


router.post('/usuario', tryLogin)




export default router