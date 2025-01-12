import {makeAutoObservable} from "mobx";


class CanvasState {
    canvas = null
    undoList = []
    redoList = []
    clientName = ''
    sessionId = null
    socket = null
    ctx = null
    image = null

    constructor() {
        makeAutoObservable(this)
    }

    setClientName(name) {
        this.clientName = name
    }

    setSessionId(id) {
        this.sessionId = id
    }

    setSocket(socket) {
        this.socket = socket
    }

    setCanvasState(canvas){
        this.canvas = canvas
    }

    pushToUndo(data){
        this.undoList.push(data)
    }

    pushToRedo(data){
        this.redoList.push(data)
    }

    setCtx(ctx){
        this.ctx = ctx
    }

    setImage(image){
        this.image = image
    }

    undo(){
        let ctx = this.canvas.getContext("2d")
        if (this.undoList.length > 0){
            let img = new Image()
            let imgData = this.undoList.pop()
            img.src = imgData
            this.redoList.push(this.canvas.toDataURL())
            img.onload = () => {
                ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
                ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
            }
        } else {
            ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        }
    }

    redo(){
        let ctx = this.canvas.getContext("2d")
        if (this.redoList.length > -1){
            let img = new Image()
            let imgData = this.redoList.pop()
            img.src = imgData
            img.onload = () => {
                // console.log(this.redoList.length)
                ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
                ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
            }
        } else {
            ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        }
    }

}

export default new CanvasState();