import React from "react";
import { LandingFeatured, LandingHero } from "../components";

function Landing() {
  return (
    <div className="page-center">
      {/* <h2>landing page </h2> */}
      <LandingHero />
      <LandingFeatured />
    </div>
  );
}

export default Landing;
