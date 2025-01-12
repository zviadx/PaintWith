
import Tool from "./Tool";


export default class Rect extends Tool {
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
        this.mouseDown = true
        this.ctx.beginPath()
        this.startX = e.pageX - e.target.offsetLeft
        this.startY = e.pageY - e.target.offsetTop
        this.savedImg = this.canvas.toDataURL()
    }

    onMouseMoveHandler(e){
        if (this.mouseDown){
            let width = e.pageX - e.target.offsetLeft - this.startX
            let height = e.pageY - e.target.offsetTop - this.startY
            // this.draw(this.startX, this.startY, width, height)

            this.socket.send(JSON.stringify({
                method: 'draw',
                id: this.id,
                figure: {
                    name: "rect",
                    x: this.startX,
                    y: this.startY,
                    width: width,
                    height: height,
                    img: this.savedImg,
                }
            }))

        }
    }

    onMouseUpHandler(){
        this.mouseDown = false

        this.socket.send(JSON.stringify({
                method: 'draw',
                id: this.id,
                // ctx: canvasState.canvas.getContext("2d"),
                figure: {
                    name: "stop drawing",

                }
            }
        ))
    }

    static draw(ctx, canvas, x, y, w, h, image){
        let img = new Image()
        img.src = image
        img.onload = () => {
            ctx.clearRect(0,0 , canvas.width, canvas.height)
            ctx.drawImage(img, 0, 0 , canvas.width, canvas.height)
            ctx.beginPath()
            ctx.rect(x, y, w, h)
            ctx.stroke()
        }

    }

}