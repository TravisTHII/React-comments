const express = require('express')
const cors = require('cors')
const path = require('path')
const dotenv = require('dotenv')
const colors = require('colors')
const mongoDb = require('./config/mongo')

dotenv.config({ path: './config/config.env' })

mongoDb()

const app = express()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 5000

app.use('/api/hmd/user', require('./routes/user'))
app.use('/api/hmd/thread', require('./routes/thread'))
// app.use('/api/hmd/comment', require('./routes/comment'))

app.listen(
	PORT,
	console.log(`Server on port ${PORT}`.yellow.bold)
)