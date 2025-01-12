
const express = require('express')
const app = express()
const WSServer = require('express-ws')(app)
const aWss = WSServer.getWss()

const PORT = process.env.PORT || 5050


app.ws('/', (ws) => {
    console.log("შეერთება დასრულებულია")


    ws.on('message', (msg) => {
        // console.log(msg)

        msg = JSON.parse(msg)
        connectionHandler(ws, msg)
        // switch (msg.method) {
        //     case "connection":
        //         connectionHandler(ws, msg)
        //         break
        //     case "draw":
        //         connectionHandler(ws, msg)
        //         break
        // }
    })
})


const connectionHandler = (ws, msg) => {
    ws.id = msg.id
    // console.log("out")

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
            client.send(JSON.stringify(msg))
        }
    })
}


app.listen(PORT, () => console.log(`server started on PORT ${PORT}`))

