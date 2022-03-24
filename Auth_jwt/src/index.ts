import express, {Request, Response} from 'express';
import bodyParser from "body-parser";
import User from './module/User';

const app = express()

// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// application/json
app.use(bodyParser.json());

app.get('/', (req : Request, res : Response) => {
  res.send('Hello World!')
})

const port = 4000
const mongoose = require('mongoose') // mongodb Connect
const config = require('./config/key');

mongoose.connect(config.mongoURI, {
}).then(() => console.log('MongoDB connected')).catch((err: Error) => console.log(err))


// 회원가입
app.post('/api/users/register', (req: Request, res: Response) => {
  // 회원가입을 할 떄 필요한 정보를 client에서 가져오면 그것들을 데이터베이스에 넣어준다.
  const user = new User(req.body)
  user.save((err: Error, user: any) => {
    if (err) return res.json({ success: false, err })
    return res.status(200).json({
      success: true,
    })
  })
})

// login
app.post('/api/users/login', (req: Request, res: Response) => {
  // 요청된 이메일이 DB에 있는지 확인. 자체 findOne 메소드 활용
  User.findOne({email: req.body.email}, (err:Error, user: typeof User) => {
    if (!user){
      return res.json({
        loginSuccess: false,
        message: "작성한 이메일에 해당하는 유저가 없습니다."
      })
    }
    
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
