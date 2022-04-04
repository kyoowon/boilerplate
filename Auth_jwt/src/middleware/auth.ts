const { User } = require('../models/User')

const auth = (req: any, res: any, next: Function) => {
    // 인증 처리를 하는 곳

    // 쿠키에서 토큰을 가져온다.
    const token = req.cookies.x_auth;
    // 토큰을 복호화 한 후 유저를 찾는다. - User model에서 진행
    User.findByToken(token, (err: Error, user: typeof User) => {
        console.log(user)
        if (err) throw err;
        if (!user) return res.json({ isAuth: false, error: true })

        // req에 넣어주는 이유는 미들웨어에서 넘겨줄 때 다음 메소드에서 req를 활용
        req.token = token;
        req.user = user;
        next()
    })
}

module.exports = { auth };