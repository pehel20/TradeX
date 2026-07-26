import React from 'react';
import Hero from './Hero.js';
import Awards from './Awards';
import Stats from './Stats';
import Pricing from './Pricing';
import Education from './Education';

import OpenAccount from '../OpenAccount';


function Homepage() {
    return ( 
        <>
            <Hero/>
            <Awards/>
            <Stats/>
            <Pricing/>
            <Education/>
            <OpenAccount/>
        </>
     );
}

export default Homepage;