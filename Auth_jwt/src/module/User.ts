import { Hash } from "crypto"

const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: { // user firstname
        type : String,
        maxlength : 50,
    },
    email: { // user email
        type: String,
        trim: true, // 스페이스를 지워줌
        unique: 1, // 고유 값을 가짐
    },
    password : { // user password
        type: String,
        minlength: 5,
    },
    lastname: { // user lastname
        type: String,
        maxlength: 50,
    },
    role: { // 관리자와 일반 유저를 분리 (0: user, 1: admin)
        type: Number,
        default: 0,
    },
    image: String,
    token: { // 로그인을 위한 토큰
        type: String,
    },
    tokenExp: { // 토큰의 유효기간
        type: Number,
    }
})

const bcrypt = require('bcrypt');
const saltRounds = 10;

userSchema.pre('save', function (this: typeof userSchema, next: Function) {
    const user = this;
    if (user.isModified('password')) {
        bcrypt.genSalt(saltRounds, (err: Error, salt: number) => {
            bcrypt.hash(user.password, salt, (err: Error, hash: Hash) => {
                if (err) return next(err);
                user.password = hash;
                next();
            });
        });
    }
    else {
        next();
    }
})

export default mongoose.model('User', userSchema)