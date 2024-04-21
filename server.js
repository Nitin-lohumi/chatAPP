const path = require("path")
const express = require('express')
const { Socket } = require('socket.io')
const app = express()
const http = require('http').createServer(app)
const PORT = process.env.PORT || 3000
const static_path = path.join(__dirname,'/public')
app.use(express.static(static_path))
http.listen(PORT,()=>{
    console.log(`listining at port number  ${PORT}`)
})
app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/index.html')
})

// socket.io 
const io = require('socket.io')(http)
io.on('connection',(socket)=>{
    console.log("connencted ...");
    socket.on('message',(msg)=>{
        socket.broadcast.emit('message', msg)
        // console.log(msg);
    })
})

