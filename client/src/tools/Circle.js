import Tool from "./Tool";
import canvasState from "../store/canvasState";


export default class Circle extends Tool{
    constructor(canvas, socket, id) {
        super(canvas, socket, id);
        this.makeEvents()
    }

    makeEvents(){
        this.canvas.onmousedown = this.onMouseDownHandler.bind(this)
        this.canvas.onmousemove = this.onMouseMoveHandler.bind(this)
        this.canvas.onmouseup = this.onMouseUpHandler.bind(this)
    }

    onMouseDownHandler(e){
        console.log("ვართ ობიექტში" + this)
        this.mouseDown = true
        this.ctx.beginPath()
        this.savedX = e.pageX - e.target.offsetLeft
        this.savedY = e.pageY - e.target.offsetTop
        this.savedImg = this.canvas.toDataURL()
    }

    onMouseMoveHandler(e){
        if (this.mouseDown){
            let radiusX = e.pageX - e.target.offsetLeft - this.savedX
            let radiusY = e.pageY - e.target.offsetTop - this.savedY
            // this.draw(this.savedX, this.savedY, radiusX, radiusY)

            this.socket.send(JSON.stringify({
                method: 'draw',
                id: this.id,
                figure: {
                    name: "circle",
                    x: e.pageX - e.target.offsetLeft,
                    y: e.pageY - e.target.offsetTop,
                    width: e.pageX - e.target.offsetLeft - this.savedX,
                    height: e.pageY - e.target.offsetTop - this.savedY,
                    img: this.savedImg,
                }
            }))
        }
    }

    onMouseUpHandler(){
        this.mouseDown = false
        canvasState.setImage(this.canvas.toDataURL())

        this.socket.send(JSON.stringify({
                method: 'draw',
                id: this.id,
                ctx: canvasState.canvas.getContext("2d"),
                figure: {
                    name: "stop drawing",

                }
            }
        ))
    }

    static draw(ctx, canvas, x, y, width, height, image){
        let img = new Image()
        img.src = image
        img.onload = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
            ctx.beginPath()
            ctx.ellipse(x, y, Math.abs(width), Math.abs(height), Math.PI/6, 0, 2 * Math.PI)
            ctx.stroke()
        }
    }

}