import Tool from "./Tool";


export default class Eraser extends Tool{
    constructor(canvas) {
        super(canvas);
        this.makeEvents()
    }

    makeEvents(){
        this.canvas.onmousedown = this.onMouseDownHandler.bind(this)
        this.canvas.onmousemove = this.onMouseMoveHandler.bind(this)
        this.canvas.onmouseup = this.onMouseUpHandler.bind(this)
    }

    onMouseDownHandler(e){
        this.mouseDown = true
        this.savedX = e.pageX - e.target.offsetLeft
        this.savedY = e.pageY - e.target.offsetTop
        this.ctx.beginPath()
        this.ctx.moveTo(this.savedX, this.savedY)
    }

    onMouseMoveHandler(e){
        if (this.mouseDown) {
            let x = e.pageX - e.target.offsetLeft
            let y = e.pageY - e.target.offsetTop
            this.draw(x, y)
        }
    }

    onMouseUpHandler(){
        this.mouseDown = false
    }

    draw(x, y){
        this.ctx.lineTo(x, y)
        this.ctx.strokeStyle = 'white'
        this.ctx.stroke()
    }

}