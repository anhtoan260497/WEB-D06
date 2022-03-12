const express = require('express')
const userRouter =  require('./router/userRouter')
const app = express()
app.use(express.json())

app.use('/api/users',userRouter)


app.listen(3000)