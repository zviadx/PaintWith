import Tool from "./Tool";
import canvasState from "../store/canvasState";


export default class Brush extends Tool {
    constructor(canvas, socket, id) {
        super(canvas, socket, id);
        this.mouseDown = false
        this.makeEvents()
    }

    makeEvents(){
        this.canvas.onmousedown = this.onMouseDownHandler.bind(this)
        this.canvas.onmousemove = this.onMouseMoveHandler.bind(this)
        this.canvas.onmouseup = this.onMouseUpHandler.bind(this)

    }



    onMouseDownHandler(e){
        this.mouseDown = true
        this.ctx.beginPath()
        this.ctx.moveTo(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop)
        // console.log(this.mouseDown)
        console.log(this.socket)
        this.savedImg = this.canvas.toDataURL()
    }

    onMouseMoveHandler(e){
        if (this.mouseDown){
            console.log("Move...")
            this.socket.send(JSON.stringify({
                    method: 'draw',
                    id: this.id,
                    client: canvasState.clientName,
                    figure: {
                        name: "brush",
                        x: e.pageX - e.target.offsetLeft,
                        y: e.pageY - e.target.offsetTop,
                    }
                }
            ))
        }
    }

    onMouseUpHandler(){
        this.mouseDown = false
        this.socket.send(JSON.stringify({
                method: 'draw',
                id: this.id,
                figure: {
                    name: "stop drawing",

                }
            }
        ))
    }

    static draw(ctx, x, y){
        ctx.lineTo(x, y)
        ctx.stroke()

    }

}