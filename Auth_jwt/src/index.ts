import express, {Request, Response} from 'express';
import bodyParser from "body-parser";
import User from './models/User';

const app = express(); // express.js
const mongoose = require('mongoose'); // mongodb Connect
const config = require('./config/key'); // mongoDB URI key
const cookieParser = require('cookie-parser'); // cookie


// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// application/json
app.use(bodyParser.json());
app.use(cookieParser());

// port 
const port = 4000

// mondoDB connection
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
    // 비밀번호까지 같다면 토큰을 생성
    user.generateToken((err: Error, user: typeof User) => {
      if (err) return res.status(400).send(err);

      // 토큰을 저장한다. 어디에? - 캐쉬, 로컬스토리지, 세션, 쿠키 등 저장을 할 수 있다. - 그중 쿠키로 저장
      res.cookie("x_auth", user.token).status(200).json({ loginSuccess: true, userId: user._id })
    })
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
