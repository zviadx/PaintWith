
const express = require('express')

const mongoose = require('mongoose')
const config = require('config')

const app = express()
const WSServer = require('express-ws')(app)
const aWss = WSServer.getWss()
const PORT = process.env.PORT || config.get('ServerPort')
// const User = require('./models/User')


app.ws('/', (ws) => {
    console.log("შეერთება დასრულებულია")


    ws.on('message', (msg) => {
        // console.log(msg)

        msg = JSON.parse(msg)
        connectionHandler(ws, msg)
    })
})


const connectionHandler = (ws, msg) => {
    ws.id = msg.id
    console.log(`id --  ${ws.id}`)

    switch (msg.method) {
        case 'connection':
            console.log("IN Connection")
            broadcastConnection(ws, msg)
            break
        case 'draw':
            console.log("IN Draw")
            ws.figure = msg.figure.name
            broadcastConnectionDraw(ws, msg)
            break
    }

}

const broadcastConnection = (ws, msg) => {
    aWss.clients.forEach(client => {
        if(client.id === msg.id) {
            console.log("In broadcastConnection")
            client.send(JSON.stringify(msg))
        } else {
            console.log("broadcast connection problem")
        }
    })
}

const broadcastConnectionDraw = (ws, msg) => {
    aWss.clients.forEach(client => {
        if(client.id === msg.id){
            console.log(`USER id: ${client.id} figure name: ${client.figure} is in DRAW mode ` )
            // console.log(`Message is ... ${JSON.stringify(msg)}`)
            client.send(JSON.stringify(msg))
        }
    })
}

const start = async () => {
    try {
        await mongoose.connect(config.get("dbUrl").toString(),
            // {
            // useNewUrlParser: true,
            // useUnifiedTopology: true
        // }
        )
    } catch (e) {

    }

    app.listen(PORT, () => console.log(`server started on PORT ${PORT}`))
}

start()
