import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay } from 'swiper/modules';
import "./hero.css"

const Hero = () => {
  return <>
    <div className='container-fluid'>
      <div className='row p-0'>
        <div className='col p-0'>
          <div className='d-flex flex-wrap justify-content-center align-items-center '>
            <Swiper
              className="mySwiper hero_swiper"
              slidesPerView={1}
              modules={[Autoplay]}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false
              }}
            >

              <SwiperSlide className='hero_slide'><img src="/hero.jpeg" className='img-fluid' alt="" /></SwiperSlide>
              <SwiperSlide className='hero_slide'><img src="/hero1.jpeg" className='img-fluid' alt="" /></SwiperSlide>
              <SwiperSlide className='hero_slide'><img src="/hero2.jpeg" className='img-fluid' alt="" /></SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>
    </div>

    {/* <div className='container-fluid ' style={{ backgroundColor: "#F2F0F1" }}>
            <div className='row '>
                <div className='col-lg-6 col-md-6 col-sm-12 px-lg-5 px-md-5 px-sm-3 pt-5 hero_container'>
                    <h1 className='home_heading'>FIND CLOTHES <br />THAT MATCHES <br /> YOUR STYLE</h1>
                    <p className=''>Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.</p>
                    <button class="hero_btn learn-more">
                        <span class="circle" aria-hidden="true">
                            <span class="icon arrow"></span>
                        </span>
                        <span class="button-text">Shop Now</span>
                    </button>
                    <div className='home_card row row-cols-lg-3 row-cols-md-2 row-cols-2' >
                        <div className='col mt-5'>
                            <h1 className='m-0'>200+</h1>
                            <p >Internation Brands</p>
                        </div>
                        <div className='col mt-5'>
                            <h1 className='m-0'>2,000+</h1>
                            <p>High Quality Products</p>
                        </div>
                        <div className='col mt-5'>
                            <h1 className='m-0'>30,000+</h1>
                            <p>Happy Customers</p>
                        </div>
                    </div>


                </div>
                <div className='col-lg-6 col-md-6 col-sm-12 px-5'>
                    <div>
                        <img src="/home.png" className='home_img img-fluid' alt="" />
                    </div>
                </div>
            </div>
        </div> */}
  </>
}

export default Hero