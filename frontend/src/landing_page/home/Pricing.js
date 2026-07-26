import React from 'react';

function Pricing() {
    return ( 
        <div className="container mt-5 mb-5 pb-5">
           <div className="row ">
              <div className="col-6">
                 <h1 >Unbeatable pricing</h1>
                 <p className="mt-4">We pioneered the concept of discount broking and price transparency in India. </p>
                   <p> Flat fees and no hidden charges.</p>
                 <a href='' className=""style={{textDecoration:"none"}}>See Pricing <i class="fas fa-arrow-right"></i></a>
              </div>

              <div className="col-6 ">
                  <div className=" d-flex justify-content-between" style={{paddingTop:"30px"}}>

                     {/* ITEM 1 */}
                     <div style={{display:"flex", alignItems:"center", width:"170px"}}>
                        <img src="media/pricingEquity.svg" style={{width:"130px"}}/>
                        <p style={{
                            marginTop:"30px",
                            marginLeft:"2px",
                            fontSize:"10px",
                            color:"#666",
                            lineHeight:"1.4"
                        }}>
                           Free account opening
                        </p>
                     </div>

                     {/* ITEM 2 */}
                     <div style={{display:"flex", alignItems:"center", width:"200px"}}>
                        <img src="media/pricingEquity.svg" style={{width:"130px"}}/>
                        <p style={{
                            marginTop:"30px",
                            marginLeft:"2px",
                            fontSize:"9px",
                            color:"#666",
                            lineHeight:"1.4"
                        }}>
                           Free equity delivery and direct mutual funds
                        </p>
                     </div>

                     {/* ITEM 3 */}
                     <div style={{display:"flex", alignItems:"center", width:"180px"}}>
                        <img src="media/other-trades.svg" style={{width:"130px"}}/>
                        <p style={{
                            marginTop:"10px",
                            marginLeft:"6px",
                            fontSize:"10px",
                            color:"#666",
                            lineHeight:"1.4"
                        }}>
                           Intraday and F&amp;O
                        </p>
                     </div>

                 </div>
              </div>
           </div>
        </div>
     );
}

export default Pricing;