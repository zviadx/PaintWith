import React from 'react';
import Toolbar from "./Toolbar";
import SettingBar from "./SettingBar";
import Canvas from "./Canvas";
import "../style/app.scss";
import {useLocation} from "react-router-dom";


const BasicComponent = () => {

    const location = useLocation()


    React.useEffect(() => {
        console.log(location.pathname, location.key, location.port)
    }, [location])

    return (
        <div className='app'>
            <Toolbar/>
            <SettingBar/>
            <Canvas/>
        </div>
    );
};

export default BasicComponent;