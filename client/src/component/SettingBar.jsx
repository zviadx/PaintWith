import React from 'react';
import "../style/toolbar.scss"
import toolState from "../store/toolState";



const SettingBar = () => {

    return (
        <div className='settingBar'>
            <label htmlFor="line-width">ხაზის სისქე</label>
            <input
                onChange={e => toolState.setLineWidth(e.target.value)}
                style={{margin: '0 10px'}}
                id="line-width"
                type='number' min={1} max={50} defaultValue={1}
            />
        </div>
    );
};

export default SettingBar;