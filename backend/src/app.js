const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const port = "3000"
const api_routes = require('./routes/api-routes')

const app = express()

app.use(cors())
app.use(bodyParser.json())

api_routes(app)

app.listen(port, () => {
  console.log(`SERVER IS RUNNING ON PORT ${port}`)
})