import {makeAutoObservable} from "mobx";


class ToolState {
    tool = null
    constructor() {
        makeAutoObservable(this)
    }

    setToolState(tool){
        this.tool = tool
        console.log(this.tool)
    }

    setLineWidth(width){
        this.tool.lineWidth = width
    }

    setStrokeColor(color){
        if (this.tool) {
            this.tool.strokeColor = String(color)
        }
    }

    setFillColor(color){
        if (this.tool) {
            this.tool.setFillColor = String(color)
        }
    }

}

export default new ToolState();