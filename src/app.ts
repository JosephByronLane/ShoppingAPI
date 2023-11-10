import express from 'express'
import morgan from 'morgan'
import  cors from 'cors'
import userRoutes from './routes/Usuario.routes'
import productosRoutes from './routes/Productos.routes'
import productosEPRoutes from './routes/ProductosEnPromocion.routes'

const app =express()

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

app.use(userRoutes)
app.use(productosRoutes)
app.use(productosEPRoutes)


export default app