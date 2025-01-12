


export default class Tool{
    constructor(canvas, socket, id) {
        this.canvas = canvas
        this.socket = socket
        console.log(socket, canvas)
        this.id = id
        this.ctx = this.canvas.getContext("2d")
        this.destroyEvents()
    }

    destroyEvents() {
        this.canvas.onmousedown = null
        this.canvas.onmousemove = null
        this.canvas.onmouseup = null
}

    set lineWidth(width){
        this.ctx.lineWidth = width
    }

    set strokeColor(color){
        this.ctx.strokeStyle = color
    }

    set fillColor(color){
        this.ctx.fillStyle = color
    }

}