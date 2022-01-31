const connectDB = require('./db/connect')
const express = require('express');
const bodyParser = require('body-parser');
const app = express()
const path = require('path')
const tasks = require('./routes/tasks');
require('dotenv').config()
const notFound = require('./middleware/notFound')
const errorHandlerMiddleware = require('./middleware/errorHandler')

app.use(bodyParser.json());

// middleware
const staticPath = path.join(__dirname, './public')
app.use(express.static(staticPath))
app.use(express.json())
app.get('/', (req, res) => {
        res.send("Home page")
    })
    // routes
app.use('/api/v1/tasks', tasks)
app.use(notFound)
app.use(errorHandlerMiddleware)
const port = 4444;

// function checks if DB is connected sucessfully and if yes it starts the server else throws the error.
const start = async() => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server listening on port ${port}`));
    } catch (error) {
        console.log(error)
    }
}

start()