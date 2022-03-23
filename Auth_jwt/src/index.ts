import express, {Request, Response} from 'express';
const app = express()

app.get('/', (req : Request, res : Response) => {
  res.send('Hello World!')
})

const port = 3000
const mongoose = require('mongoose') // mongodb Connect
const config = require('./config/key'); // 


mongoose.connect(config.mongoURI, {
}).then(() => console.log('MongoDB connected')).catch((err: Error) => console.log(err))

app.post('/register', (req: Request, res: Response) => {
  // 회원가입을 할 떄 필요한 정보를 client에서 가져오면 그것들을 데이터베이스에 넣어준다.
  const user = new User(req.body)
  user.save((err: Error, user: typeof User) => {
    if (err) return res.json({ success: false, err })
    return res.status(200).json({
      success: true,
    })
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
