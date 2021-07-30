import React from "react";
import Icon from "@material-ui/core/Icon";
import { imageUrlMapping } from "../../constants/imageUrlMapping";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div>
      <LandingTop />
      <LandingMiddle />
      <LandingBottom />
      <PriceSection />
    </div>
  );
}

function LandingTop() {
  return (
    <div className="landing-header top-landing-bg">
      <div className="flexbox-row">
        <div className="header-content">
          <h1>Welcome to FreshStart</h1>
          <p className="intro-title-content">
            A bad breakup, unexpected farewell and toxic partner can always
            interfere your everyday life.
          </p>
          <p className="intro-title-content">
            FreshStart is here as your helping hands and listening ears.
          </p>
          <div className="buttonList">
            <Link to="/login-user" className="menu-nav-link">
              <Button variant="contained" color="primary">
                Log in
              </Button>
            </Link>
            <Link to="/signup-new-user" className="menu-nav-link">
              <Button variant="outlined" color="primary">
                Sign up
              </Button>
            </Link>
          </div>
        </div>
        <img
          src={imageUrlMapping.landingPageDiamondRing}
          alt="welcome_image"
          className="header-title-image"
        />
      </div>
    </div>
  );
}

function LandingMiddle() {
  return (
    <div className="middle-landing-bg">
      <div className="flexbox-row">
        <div className="landing-subcontext">
          <h1>Introducing FreshStart</h1>
          <p className="extra-spacing">
            Life must goes on even after a bad heartbreak from work, lover or
            health. We understand that everyone might fail one day, we help you
            to move-on with:
          </p>

          <div className="flexbox-row">
            <SmallCardDetail
              icon="local_shipping"
              content="Returning sentimental items to your ex-lover or enemy"
            />
            <SmallCardDetail
              icon="forum"
              content="Listening your story anonymously"
            />
          </div>
        </div>
        <div>
          <img
            src={imageUrlMapping.landingPagePictureFour}
            alt="couple-having-different-roads"
            className="landing-page-picture"
          />
        </div>
      </div>
    </div>
  );
}
function LandingBottom() {
  return (
    <div className="middle-landing-bg">
      <div className="flexbox-row">
        <div>
          <img
            src={imageUrlMapping.landingPagePictureTwo}
            alt="lighter-move-on"
            className="landing-page-picture"
          />
        </div>
        <div className="landing-subcontext">
          <h1>Have a lighter move on</h1>
          <p>
            Let us do the unfinished business and allow you to build a better
            future with lighter heart.
          </p>
          <p>Start by loving yourself in order to love other people</p>
        </div>
      </div>
    </div>
  );
}

function SmallCardDetail({ icon, content }) {
  return (
    <div style={{ margin: 10 }}>
      <Icon style={{ fontSize: 40 }} color="primary">
        {icon}
      </Icon>
      <p>{content}</p>
    </div>
  );
}

function PriceSection() {
  return (
    <div className="price-section-bg flexbox-column" style={{ paddingTop: 50 }}>
      <h1>A Price To Suit Everyone</h1>
      <p>
        We understand that you are in tough situation. To help moving-on easier,
        all type of products will be charged in same price
      </p>
      <h2>$20/item</h2>
      <Link to="/login-user">
        <Button
          variant="contained"
          color="primary"
          style={{ textDecoration: "none" }}
        >
          Log-in Now
        </Button>
      </Link>
    </div>
  );
}

export default LandingPage;
