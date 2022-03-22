import express, {Request, Response} from 'express';
const app = express()

app.get('/', (req : Request, res : Response) => {
  res.send('Hello World!')
})

const port = 3000
const mongoose = require('mongoose')

mongoose.connect("mongoURI", {
}).then(() => console.log('MongoDB connected')).catch((err: Error) => console.log(err))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
