const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const passport = require('passport')
const session = require('express-session')
const cookie = require('cookie-parser')

const db = require('./models')
const passportConfig = require('./passport')
const usersRouter = require('./routes/users')

const app = express()

db.sequelize.sync()
passportConfig()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev'))
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))
app.use(express.urlencoded({ extended: false }))
app.use(cookie('cookiesecret'))
app.use(session( {
    resave: false,
    saveUninitialize: false,
    secret: 'cookiesecret',
    cookie: {
        httpOnly: true,
        secure: false
    }
}))
app.use(passport.initialize())
app.use(passport.session({}))

app.get('/', (req, res) => {
    res.send('character4u backend server')
})

app.use('/users', usersRouter)

app.listen(3085, () => {
    console.log(`백엔드 서버 ${3085}번 포트에서 작동중`)
})