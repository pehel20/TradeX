import React from 'react';

function Stats() {
    return ( 
        <div className="container">
            <div className="row p-4">
               <div className="col-6 p-4">
                   <h1 className="fs-2 mb-5 mt-4">Trust with confidence</h1>
                   <h2 className="fs-5">Customer-first always</h2>
                   <p className="mb-4 text-muted">That's why 1.6+ crore customers trust TradeX with ~ ₹6 lakh crores of equity investments, making us India’s largest broker; contributing to 15% of daily retail exchange volumes in India.
                   </p>
                   <h2 className="fs-5">No spam or gimmicks</h2>
                   <p className="mb-4 text-muted">No gimmicks, spam, "gamification", or annoying push notifications. High quality apps that you use at your pace, the way you like. Our philosophies.
                   </p>
                   <h2 className="fs-5">The TradeX universe</h2>
                   <p className="mb-4 text-muted">Not just an app, but a whole ecosystem. Our investments in 30+ fintech startups offer you tailored services specific to your needs.
                   </p>
                   <h2 className="fs-5">Do better with money</h2>
                   <p className="mb-5 text-muted">With initiatives like Nudge and Kill Switch, we don't just facilitate transactions, but actively help you do better with your money.
                   </p>
               </div>
              <div className="col-6 p-4">
                <img src="media/ecosystem.png" style={{width:"90%"}}/>
                <div className="text-center">
                    <a href='' className="mx-5" style={{textDecoration:"none"}}>Explore our products <i class="fas fa-arrow-right"></i></a>
                    <a href='' style={{textDecoration:"none"}}>Try Kite Demo <i class="fas fa-arrow-right"></i></a>
                </div>
              </div>
            </div>
        </div>
     );
}

export default Stats;