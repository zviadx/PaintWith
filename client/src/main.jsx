import React from 'react';
import './index.css';
import App from './App';
import {createRoot} from "react-dom/client";

// ReactDOM.render(
//     <App />,
//     document.getElementById('root')
// );

const root = createRoot(document.getElementById('root'))
root.render(<App tab="home" />)


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

