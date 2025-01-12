import React from 'react';
import "../style/toolbar.scss"
import toolState from "../store/toolState";
import Brush from "../tools/Brush";
import canvasState from "../store/canvasState";
import Rect from "../tools/Rect";
import Circle from "../tools/Circle";
import Eraser from "../tools/Eraser";


const Toolbar = () => {
    return (
        <div className='toolbar'>
            <button
    className='toolbar__btn brush'
    onClick={() => {
        toolState.setToolState(new Brush(canvasState.canvas, canvasState.socket, canvasState.sessionId))
    }}
    />
            <button
    className='toolbar__btn rect'
    onClick={() => {
        toolState.setToolState(new Rect(canvasState.canvas, canvasState.socket, canvasState.sessionId))
    }}
    />
            <button
    className='toolbar__btn circle'
    onClick={() => {
        toolState.setToolState(new Circle(canvasState.canvas, canvasState.socket, canvasState.sessionId))
    }}
    />
            <button
    className='toolbar__btn eraser'
    onClick={() => toolState.setToolState(new Eraser(canvasState.canvas, canvasState.socket, canvasState.sessionId))}
    />
            <button className='toolbar__btn line'/>
            <input
                type='color' style={{marginLeft: 10}}
                onChange={(e) => {
                    // console.log(e.target.value)
                    toolState.setStrokeColor(e.target.value)
                    toolState.setFillColor(e.target.value)
                }
                }
            />

            <button
    className='toolbar__btn undo'
    onClick={() => {
        console.log(canvasState.undoList.length)
        canvasState.undo()
    }}
    />
            <button
    className='toolbar__btn redo'
    onClick={() => {
        console.log(canvasState.redoList.length)
        canvasState.redo()
    }}
    />
            <button className='toolbar__btn save'></button>
        </div>
    );
};

export default Toolbar;