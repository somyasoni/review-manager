import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cors from 'cors'
import reviewRoutes from './routes/reviews.js'
import { config } from './config.js'

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/reviews', reviewRoutes)

app.get('/', (req, res) => {
  res.json({ message: 'Review Manager API is running' })
})

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000')
})

app.listen(config.port, () => {
  console.log(`Server running on http://localhost:${config.port}`)
})