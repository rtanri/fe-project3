import React from "react";
import pictureOne from "../background-images/landing-page-girl-and-phone.jpg";
import { imageUrlMapping } from "../constants/imageUrlMapping";

function LandingPage() {
  return (
    <div>
      <LandingTop />
      <LandingMiddle />
      <LandingBottom />
    </div>
  );
}

function LandingTop() {
  return (
    <div className="top-landing-bg">
      <h1 className="top-landing-content">FreshStart</h1>
    </div>
  );
}
function LandingMiddle() {
  return (
    <div className="middle-landing-bg">
      <div className="flexbox-landing">
        <div>
          <p>lorum ipsum</p>
        </div>
        <div>
          <img src={imageUrlMapping.pictureTwo} alt="girl-with-phone" />
        </div>
      </div>
    </div>
  );
}
function LandingBottom() {
  return (
    <div className="bottom-landing-bg">
      <h1 className="bottom-landing-content">BottomPart</h1>
    </div>
  );
}

export default LandingPage;
