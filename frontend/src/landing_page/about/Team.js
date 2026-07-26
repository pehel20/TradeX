import React from 'react';

function Team() {
    return ( 
       <>
      <div className="container">
        <div className="row p-2 mt-2 mb-3">
          <h1 className="fs-2 text-center">
            People
          </h1>
        </div>

        <div className="row p-4 text-muted text-center" style={{lineHeight:"1.8",fontSize:"1em"}}>
          <div className="col-6 ">
            <img src="/media/myphoto.png" style={{borderRadius:"100%",width:"50%",marginLeft:"20px"}}></img>
            <h5 className="mt-3">Pehel Bagrecha</h5>
            <p style={{lineHeight:"1.1"}}>Founder, CEO</p>
          </div>
          <div className="col-6 p-4 mb-5">
            <p>
               Hi, I’m Pehel Bagrecha, the creator of TRadeX.</p>

<p>I’m passionate about finance and technology, and I enjoy building tools that simplify trading and make it more accessible for everyone—because trading should be smart, not stressful.</p>

<p>TRadeX is my effort to help users trade smarter, make informed decisions, and grow with confidence.</p>
<p>Connect on <a href="" style={{ textDecoration: "none" }}>Homepage </a>/ <a href="" style={{ textDecoration: "none" }}>TradingQnA</a> / <a href="" style={{ textDecoration: "none" }}>Twitter</a>
            </p>
          </div>
        </div>
      </div>
    </>
     );
}

export default Team;