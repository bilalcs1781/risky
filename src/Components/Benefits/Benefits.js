import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from 'swiper/modules';

import { FaSyncAlt, FaShuttleVan, FaRegCreditCard, FaArrowRight } from "react-icons/fa"
import { MdOutlineSupportAgent } from "react-icons/md";

import "./benefit.css"


const Benefits = () => {
    return <>
        <div className='container-fluid main_container py-lg-5 py-md-3 py-2' id='benefit' style={{backgroundColor:"#F2F0F1"}}>
            <div className='my-5 text-center'>
                <h1 className='fw-bolder home_heading text-capitalize fs-3'>100% Satisfaction is Guaranteed</h1>
                <p >Over 10,000 Happy Customers!</p>
            </div>
            <div className='row row-cols-lg-4 row-cols-md-4 benefit_main_box'>
                <div className='cols'>
                    <div className='d-flex flex-column gap-2 justify-content-center align-items-center'>
                        <div className='fs-3'><FaSyncAlt /></div>
                        <div><p className='text-center fw-bolder'>12 Months Warranty</p></div>
                        {/* <div><p className='text-center' style={{ fontSize: "15px", fontWeight: "500", marginTop: "-20px" }}>The Most of the U.K</p></div> */}
                    </div>
                </div>
                <div className='cols'>
                    <div className='d-flex flex-column gap-2  justify-content-center align-items-center '>
                        <div className='fs-3'><FaRegCreditCard /></div>
                        <div><p className='text-center fw-bolder'>Flexible Payments</p></div>
                        {/* <div><p className='text-center' style={{ fontSize: "15px", fontWeight: "500", marginTop: "-20px" }}>100% Secure Payments</p></div> */}
                    </div>
                </div>
                <div className='cols'>
                    <div className='d-flex flex-column gap-2  justify-content-center align-items-center '>
                        <div className='fs-3'><FaShuttleVan /></div>
                        <div><p className='text-center  fw-bolder'>Fast Delivery</p></div>
                        {/* <div><p className='text-center' style={{ fontSize: "15px", fontWeight: "500", marginTop: "-20px" }}>Delivery in as little as 5-7  days</p></div> */}
                    </div>
                </div>

                <div className='cols'>
                    <div className='d-flex flex-column gap-2  justify-content-center align-items-center '>
                        <div className='fs-3'><MdOutlineSupportAgent /></div>
                        <div><p className='text-center  fw-bolder'>Customer Support</p></div>
                        {/* <div><p className='text-center' style={{ fontSize: "15px", fontWeight: "500", marginTop: "-20px" }}>24/7 Customer Support Available</p></div> */}
                    </div>
                </div>

                {/* <div className='col-lg-12 my-5 d-flex justify-content-center'>
                    <a href="/Products/all">
                        <button className='button-submit px-5'>Browse Our Products</button>
                    </a>
                </div> */}

            </div>
            <div>
            <Swiper
                    className="mySwiper benefit_main_box_swiper"
                    slidesPerView={2}
                    modules={[Autoplay]}
                    autoplay={{
                        delay: 1000,
                        disableOnInteraction: false
                    }}
                >

                    <SwiperSlide>
                        <div className='d-flex justify-content-center align-items-center gap-2 flex-column'>
                            <div className='fs-2 text-dark'><FaSyncAlt /></div>
                            <div><p className='text-center fs-4 fw-bolder text-dark'>12 Months Warranty</p></div>
                            {/* <div><p className='text-center' style={{ fontSize: "15px", fontWeight: "500", marginTop: "-20px", color: "black" }}>The Most of the U.K</p></div> */}
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='d-flex justify-content-center align-items-center gap-2 flex-column'>
                            <div className='fs-2 text-dark'><FaRegCreditCard /></div>
                            <div><p className='text-center fs-4 fw-bolder text-dark'>Flexible Payments</p></div>
                            {/* <div><p className='text-center' style={{ fontSize: "15px", fontWeight: "500", marginTop: "-20px", color: "black" }}>100% Secure Payments</p></div> */}
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='d-flex justify-content-center align-items-center gap-2 flex-column'>
                            <div className='fs-2 text-dark'><FaShuttleVan /></div>
                            <div><p className='text-center fs-4 fw-bolder text-dark'>Fast Delivery</p></div>
                            {/* <div><p className='text-center' style={{ fontSize: "15px", fontWeight: "500", marginTop: "-20px", color: "black" }}>Delivery in as little as 5-7  days</p></div> */}
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='d-flex justify-content-center align-items-center gap-2 flex-column'>
                            <div className='fs-2 text-dark'><MdOutlineSupportAgent /></div>
                            <div><p className='text-center fs-4 fw-bolder text-dark'>Customer Support</p></div>
                            {/* <div><p className='text-center' style={{ fontSize: "15px", fontWeight: "500", marginTop: "-20px", color: "black" }}>24/7 Customer Support</p></div> */}
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    </>
}

export default Benefits