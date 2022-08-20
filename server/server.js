const express = require('express')
require('dotenv').config()
const app = express()
const router = express.Router()
const mongoose = require('mongoose')
let { DB } = require('./config')
const Routes = require('./routes/index')
const cors = require('cors')


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

Routes(router)

app.use('/v1/api', router)


DB = DB || process.env.DB_CONNECT
mongoose.connect(DB, {
  useUnifiedTopology: true,
  useNewUrlParser: true
}).then(() => console.log('mongo started')).catch(err => console.log({ err: err }))
app.listen(4000, () => console.log('Server running'))