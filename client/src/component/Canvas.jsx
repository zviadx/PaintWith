import React, {useCallback, useEffect, useRef, useState} from 'react';
import '../style/canvas.scss'
import {observer} from "mobx-react-lite";
import canvasState from "../store/canvasState";
import {useParams} from 'react-router-dom'
import Brush from "../tools/Brush";
import Circle from "../tools/Circle";
import Rect from "../tools/Rect";
import ModalWindow from "./Modal"
import {CANVAS_CONFIG, WS_ENDPOINT} from "../config/constants.js";


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
            } else {
                console.log("No CANVAS")
            }
        }, [])

        useEffect(() => {
            let socket
            if (canvasState.clientName) {
                console.log(`იუსერის სახელი -- ${canvasState.clientName}`)
                socket = new WebSocket(WS_ENDPOINT)
                console.log("სოკეტი -- ", socket)

                socket.onerror = (error) => {
                    console.error("WebSocket Error:", error)
                }
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

            return () => {
                if (socket) {
                    socket.close()
                }
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

        const mouseDownHandler = useCallback(() => {
            canvasState.pushToUndo(canvReference.current.toDataURL())
        },[canvReference])


    return (
        <div>
            <div className='canvas'>

    <canvas
        ref={canvReference}
        width={CANVAS_CONFIG.width}
        height={CANVAS_CONFIG.height}

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

