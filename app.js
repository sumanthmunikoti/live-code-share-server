const express = require('express')
const http = require('http')
const socketIo = require('socket.io')

const port = process.env.PORT || 8080
const index = require('./routes/index') 

const app = express()
app.use(index)

const server = http.createServer(app)

const io = socketIo(server)

let interval;

//connection event returns socket object which is passed here to the callback
io.on('connection', (socket) => {
    console.log("Socket connected")
    if(interval) {
        clearInterval(interval)
    }
    interval = setInterval(() => getApiAndEmit(socket), 1000)
    socket.on('disconnect', () => {
        console.log("Socket disconnected")
        clearInterval(interval)
    })
})

const getApiAndEmit = socket => {
    const response = new Date()
    socket.emit("From server", response)
}

server.listen(port, () => console.log(`Listening on port ${port}`))