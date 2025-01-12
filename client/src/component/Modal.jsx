import React, {useRef, useState} from 'react';
import Button from "react-bootstrap/Button";
import '../style/canvas.scss'
import Modal from 'react-bootstrap/Modal';
import canvasState from "../store/canvasState";


const ModalWindow = ({show, setShow}) => {
    const inpReference = useRef()
    const [showCssClass, setShowCssClass] = useState("input closedEye")
    const [inputType, setInputType] = useState("password")

    const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);

    const addUserName = (event) => {
        if(event.key === "Enter"){
            console.log("ქსელში ჩაერთო მომხმარებელი:", inpReference.current.value)
            canvasState.setClientName(inpReference.current.value)
            inpReference.current.value = ''
        }
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input
                        className={showCssClass}
                        placeholder="USER"
                        type={inputType}
                        ref={inpReference}
                        onMouseDown={event => {
                            setShowCssClass(() => "input openEye")
                            setInputType(() => "text")
                        }}
                        onMouseUp={event => {
                            setShowCssClass(() => "input closedEye")
                            setInputType(() => "password")
                        }}
                        onKeyDown={event => {
                            addUserName(event)
                            event.key === "Enter" && setShow(() => false)
                        } }
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Save User
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalWindow;