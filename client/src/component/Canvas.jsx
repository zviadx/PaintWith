import React, {useState} from 'react';
import {useRef, useEffect} from 'react'
import '../style/canvas.scss'
import {observer} from "mobx-react-lite";
import canvasState from "../store/canvasState";
// import toolState from "../store/toolState";
import {useParams} from 'react-router-dom'
import Brush from "../tools/Brush";
import Circle from "../tools/Circle";
import Rect from "../tools/Rect";
// import Button from 'react-bootstrap/Button';
import ModalWindow from "./Modal"



const Canvas = observer(() => {
        const canvReference = useRef()
        const params = useParams()
        console.log("ქვეჯგუფი -", params.id)
        const [show, setShow] = useState(true);


        useEffect(() => {
            if (canvReference.current) {
                console.log(canvReference.current)
                canvasState.setCanvasState(canvReference.current)
                canvasState.setCtx(canvReference.current.getContext('2d'))
                canvasState.setImage(canvReference.current.toDataURL())
                console.log(canvReference.current.toDataURL())
            } else {
                console.log("No CANVAS")
            }
        }, [])

        useEffect(() => {
            if (canvasState.clientName) {
                console.log(`იუსერის სახელი -- ${canvasState.clientName}`)
                const socket = new WebSocket('ws://localhost:5050/')
                console.log("სოკეტი -- ", socket)
                socket.onopen = () => {
                    console.log("Socket is OPEN")
                        socket.send(JSON.stringify({
                          id: params.id,
                          method: 'connection',
                          clientName: canvasState.clientName
                        }))
                    canvasState.setSocket(socket)
                    console.log(`სოკეტი -- ${canvasState.socket}`)
                    canvasState.setSessionId(params.id)
                }

                socket.onmessage = ((event) => {
                    let msg = JSON.parse(event.data)
                    switch (msg.method) {
                        case 'connection':
                            console.log(`სესიას შემოუერთდა ${msg.clientName}`)
                            break
                        case 'draw':
                            // console.log("ვხატავთ")
                            drawHandler(msg)
                            break
                    }

                })
            } else {
                console.log("იუსერის სახელი არ ფიქსირდება")
            }
        }, [canvasState.clientName, params.id])

        const drawHandler = (msg) => {
            // const ctx = canvasState.canvas.getContext('2d')
            switch (msg.figure.name) {
                case 'brush':
                    console.log(msg.figure.x, msg.figure.y)
                    Brush.draw(canvasState.ctx, msg.figure.x, msg.figure.y)
                    break
                case 'circle':
                    Circle.draw(canvasState.ctx, canvasState.canvas, +msg.figure.x, +msg.figure.y,
                        msg.figure.width, msg.figure.height, msg.figure.img)
                    break
                case 'rect':
                    Rect.draw(canvasState.ctx, canvasState.canvas, +msg.figure.x, +msg.figure.y,
                        msg.figure.width, msg.figure.height, msg.figure.img)
                    break
                case 'stop drawing':
                    canvasState.ctx.beginPath()
                    break
            }

        }


        const mouseDownHandler = () => {
        canvasState.pushToUndo(canvReference.current.toDataURL())
    }


    return (
        <div>
            <div className='canvas'>

    <canvas
        ref={canvReference} width='600px' height='400px'
        onMouseDown={() => mouseDownHandler()}
    />

            </div>

            {/*<Button variant="primary" onClick={handleShow}>*/}
            {/*    Launch demo modal*/}
            {/*</Button>*/}

            <ModalWindow show={show} setShow={setShow} />

        </div>
    );
}
)
export default Canvas;