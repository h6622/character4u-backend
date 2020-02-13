const express = require('express')
const bcrypt = require('bcrypt')
const db = require('../models')
const { isLoggedIn, isNotLoggedIn } = require('./middlewares')
const passport = require('passport')

const router = express.Router()

router.post('/signup', isNotLoggedIn, async (req, res) => {
    try {
        const hash = await bcrypt.hash(req.body.password, 12);
        const exUser = await db.User.findOne({
            where: {
                userid: req.body.userid
            }
        })
        if (exUser) {
            return res.status(403).json({
                errCode: 1,
                message: '이미 회원가입 되어있습니다.'
            })
        }
        const newUser = await db.User.create({
            userid: req.body.userid,
            usertype: req.body.usertype,
            password: hash,
            name:  req.body.name,
            phone: req.body.phone,
            email: req.body.email,
            company: req.body.company
        })
        return res.status(201).json(newUser);
    } catch (err) {
        console.log(err)
        return next(err)
    }   
})

router.post('/login', isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if(err) {
            console.error(err)
            return next(err)
        }
        if(info) {
            return res.status(401).send(info.reason)
        }
        return req.login(user, async (err) => {
            if(err) {
                console.error(err)
                return next(err)
            }
            return res.json(user)
        });
    })(req, res, next);
})

router.post('/logout', isLoggedIn, (req, res) => {
    if(req.isAuthenticated()) {
        req.logout()
        req.session.destroy()
        return res.status(200).send('로그아웃 되었습니다.')
    }
})

module.exports = router