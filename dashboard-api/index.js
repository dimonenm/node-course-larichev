import express from 'express'
import { userRouter } from './users/users.js'

const port = 8000
const app = express()

app.use((req, res, next) => {
  console.log("Время ", Date.now());
  next()
})

app.get('/hello', (req, res) => {
  // res.send('Hello!')
  throw new Error('/hello error')
})

app.use('/users', userRouter)

app.use((err, req, res, next) => {
  console.log(err.message);
  res.status(401).send(err.message)
})

app.listen(port, () => {
  console.log(`Server has been started http://localhost:${port}`)
})