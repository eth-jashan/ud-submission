import React, { useState } from "react";
import "./style.scss";
import Lottie from "react-lottie";
import loaderSquishy from "../../assets/lottie/loader-quishy.json";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: loaderSquishy,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

export default function HomeScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const claimableCommunityLists = [1, 2, 3];
  return (
    <div className="home-screen-container">
      {isLoading ? (
        <div className="home-screen-lottie-wrapper">
          <Lottie
            options={defaultOptions}
            style={{ height: "150px", width: "150px" }}
          />
        </div>
      ) : (
        <div className="home-screen-content-wrapper">
          <div className="community-list-wrapper">
            {claimableCommunityLists.map((ele, index) => (
              <div key={index} className="community-list-card">
                <div className="community-list-card-image"></div>
                <div className="community-list-card-content">
                  <div className="community-list-card-title">The Catalyzer</div>
                  <div className="community-list-card-description">
                    Photo booth fam kinfolk cold-pressed sriracha leggings
                    jianbing microdosing tousled waistcoat.
                  </div>
                  <div className="community-list-card-button">
                    {/* <img src={addWhite} alt="" /> */}
                    Claim
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
