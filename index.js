const express = require('express')
const path = require('path')
const sequlize = require('./utils/database')
const app = express()
const PORT = process.env.PORT || 3000

//routes
const todoRoutes = require('./routes/todo')

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use('/api/todo', todoRoutes)

app.use((req, res, next) => {
  res.sendFile('/index.html')
})

async function start() {
  try {
    await sequlize.sync()
    app.listen(PORT, () => {
      console.log(`Listening on port http://localhost:${PORT}`)
    })
  } catch (e) {
    throw new Error(e)
  }
}


start()
