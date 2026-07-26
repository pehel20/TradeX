import React from "react";

function RightSection({
  imageURL,
  productName,
  productDescription,
  learnMore
}) {
  return (
    <div className="container mt-5">
      <div className="row align-items-center">
        <div className="col-5 mt-5">
          <h2 className="mb-4" style={{marginLeft:"40px"}}>{productName}</h2>
          <p className="text-muted mb-4" style={{marginLeft:"40px"}}>
            {productDescription}
          </p>
          <div className="d-flex gap-4 mb-4">
            <a
              href={learnMore}
              className="text-decoration-none"
              style={{marginLeft:"40px"}}
            >
              Learn More <i class="fas fa-arrow-right"></i>
            </a>
          </div>
        </div>
        <div className="col-1"></div>
        <div className="col-6 text-center">
          <img src={imageURL} />
        </div>
      </div>
    </div>
  );
}

export default RightSection;
