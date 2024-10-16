import React from 'react'
import Hero from './Hero'
import Arrivals from './Arrivals'
import Top from './Top'
import Style from './Style'
import Category from './Category'
import Reviews from './Reviews'
import Discover from './Discover'
import Collections from "./Collections"
import Benefits from "../Benefits/Benefits"
import Review from "../Reviews/Review"
import Blog from "../Blog/Blog"

const Home = () => {
  return <>

  <Hero/>
  <Collections/>
  <Arrivals/>
  {/* <Top/>
  <Style/>
  <Category/> */}

  <Discover/>
  <Review/>
  <Blog/>
  <Benefits/>
  </>
}

export default Home