import React from "react";
import Benefits from "../Benefits/Benefits";
import Blog from "../Blog/Blog";
import Review from "../Reviews/Review";
import Arrivals from "./Arrivals";
import Collections from "./Collections";
import Discover from "./Discover";
import Hero from "./Hero";

const Home = () => {
  return (
    <>
      <Hero />
      <Collections />
      <Arrivals />
      {/* <Top/>
  <Style/>
  <Category/> */}

      <Discover />
      <Review />
      <Blog />
      <Benefits />
    </>
  );
};

export default Home;
