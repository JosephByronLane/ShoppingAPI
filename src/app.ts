import express from 'express'
import morgan from 'morgan'
import  cors from 'cors'
import userRoutes from './routes/Usuario.routes'
import loginRoutes from './routes/Login.routes'
import productosRoutes from './routes/Productos.routes'
import productosEPRoutes from './routes/ProductosEnPromocion.routes'
import carritoRoutes from './routes/Carrito.routes'

const app =express()
app.disable('x-powered-by');

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

app.use(userRoutes)
app.use(loginRoutes)
app.use(carritoRoutes)
app.use(productosRoutes)
app.use(productosEPRoutes)


export default app