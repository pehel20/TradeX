import React from 'react';
import Hero from './Hero';
import Brokerage from './Brokerage';
import OpenAccount from '../OpenAccount';
import AccountCharges from './AccountCharges';

function PricingPage() {
    return ( 
        <>
        <Hero/>
        <OpenAccount/>
        <Brokerage/>
        <AccountCharges/>
        </>
     );
}

export default PricingPage;