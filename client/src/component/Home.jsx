import React from 'react';
import {useLocation} from 'react-router-dom'
import {useEffect} from 'react'

const Home = () => {
const loc = useLocation()
    useEffect(() => {
        console.log(loc.pathname)
    }, [loc])

    return (
       <div>
           <button> SOS sos </button>
       </div>

    );
};

export default Home;