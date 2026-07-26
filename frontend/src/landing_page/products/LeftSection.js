import React from "react";

function LeftSection({
  imageURL,
  productName,
  productDescription,
  tryDemo,
  learnMore,
  googlePlay,
  appStore,
}) {
  return (
    <div className="container ">
      <div className="row ">
        <div className="col-6 mt-4 text-center">
          <img src={imageURL} />
        </div>

        <div className="col-6 p-5 mt-5 ">
          <h2 className="mb-4">{productName}</h2>
          <p className="text-muted mb-4" style={{ marginRight: "30px" }}>{productDescription}</p>
          <div className="d-flex gap-4 mb-4">
            <a href={tryDemo} style={{textDecoration:"none"}}>
              Try Demo <i class="fas fa-arrow-right"></i>
            </a>
            <a href={learnMore} className="text-decoration-none" style={{ marginLeft: "50px"}}>
              Learn More <i class="fas fa-arrow-right"></i>
            </a>
          </div>
          <div className="mt-3">
            <a href={googlePlay} style={{ marginRight: "50px"}}>
              <img src="media/googlePlayBadge.svg" />
            </a>
            <a href={appStore}>
              <img src="media/appstoreBadge.svg" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftSection;
