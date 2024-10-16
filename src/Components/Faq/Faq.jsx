import React from 'react'
import { FaCheck } from 'react-icons/fa'
import "./faq.css"

const Faq = () => {
    return <>
        <section className='d-flex justify-content-center'>
            <div className='container mx-0'>
                <div className='row py-5'>
                    <div className='col-12'>
                        <h1 className='home_heading  text-center'>Frequently Asked Questions</h1>
                    </div>
                    <div className='col-12'>
                        <div className='row faq_row_direction mt-3'>
                            <div className='col-lg-6 col-md-12 col-sm-12 d-flex justify-content-center'>
                                <div className="accordion accordian_col" id="accordionExample">
                                    <div className="accordion-item mb-4">
                                        <h2 className="accordion-header custom_header">
                                            <button
                                                className="accordion-button"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#collapseOne"
                                                aria-expanded="true"
                                                aria-controls="collapseOne"
                                            >
                                                <span className='accordian_counting'>1.</span> What materials do you use for your T-shirts?
                                            </button>
                                        </h2>
                                        <div
                                            id="collapseOne"
                                            className="accordion-collapse collapse show"
                                            data-bs-parent="#accordionExample"
                                        >
                                            <div className="accordion-body">
                                                <strong>We use high-quality materials,</strong>  including 100% cotton,
                                                cotton blends, and performance fabrics, to ensure comfort and durability.
                                            </div>
                                        </div>
                                    </div>
                                    <div className="accordion-item mb-4">
                                        <h2 className="accordion-header">
                                            <button
                                                className="accordion-button collapsed"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#collapseTwo"
                                                aria-expanded="false"
                                                aria-controls="collapseTwo"
                                            >
                                                <span className='accordian_counting'>2.</span>  How do I determine my T-shirt size?
                                            </button>
                                        </h2>
                                        <div
                                            id="collapseTwo"
                                            className="accordion-collapse collapse"
                                            data-bs-parent="#accordionExample"
                                        >
                                            <div className="accordion-body">
                                                <strong>We provide a sizing chart on each product page.</strong>
                                                Measure your chest, waist, and hips to find the best fit. If you're between sizes, <code> we recommend sizing up.</code>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="accordion-item mb-4">
                                        <h2 className="accordion-header">
                                            <button
                                                className="accordion-button collapsed"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#collapseThree"
                                                aria-expanded="false"
                                                aria-controls="collapseThree"
                                            >
                                                <span className='accordian_counting'>3.</span> Can I customize my T-shirt?
                                            </button>
                                        </h2>
                                        <div
                                            id="collapseThree"
                                            className="accordion-collapse collapse"
                                            data-bs-parent="#accordionExample"
                                        >
                                            <div className="accordion-body">
                                                <strong>Yes!</strong>
                                                We offer customization options where you can add your own designs or text. 
                                            </div>
                                        </div>
                                    </div>

                                    <div className="accordion-item mb-4">
                                        <h2 className="accordion-header">
                                            <button
                                                className="accordion-button collapsed"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#collapseFour"
                                                aria-expanded="false"
                                                aria-controls="collapseFour"
                                            >
                                                <span className='accordian_counting'>4.</span> How long does shipping take?
                                            </button>
                                        </h2>
                                        <div
                                            id="collapseFour"
                                            className="accordion-collapse collapse"
                                            data-bs-parent="#accordionExample"
                                        >
                                            <div className="accordion-body">
                                            Shipping times vary based on your location. <strong>Standard shipping usually takes 3-7 business days</strong>,  
                                            while expedited options are available at checkout.
                                            </div>
                                        </div>
                                    </div>

                                    <div className="accordion-item mb-4">
                                        <h2 className="accordion-header">
                                            <button
                                                className="accordion-button collapsed"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#collapseFive"
                                                aria-expanded="false"
                                                aria-controls="collapseFive"
                                            >
                                                <span className='accordian_counting'>5.</span> What payment methods do you accept?
                                            </button>
                                        </h2>
                                        <div
                                            id="collapseFive"
                                            className="accordion-collapse collapse"
                                            data-bs-parent="#accordionExample"
                                        >
                                            <div className="accordion-body">
                                          <strong>We accept major credit cards,</strong>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="accordion-item mb-4">
                                        <h2 className="accordion-header">
                                            <button
                                                className="accordion-button collapsed"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#collapseSix"
                                                aria-expanded="false"
                                                aria-controls="collapseSix"
                                            >
                                                <span className='accordian_counting'>6.</span> How do I contact customer support?
                                            </button>
                                        </h2>
                                        <div
                                            id="collapseSix"
                                            className="accordion-collapse collapse"
                                            data-bs-parent="#accordionExample"
                                        >
                                            <div className="accordion-body">
                                            You can reach our customer support team via <strong>email, live chat, or phone.</strong>  
                                            Visit our Contact Us page for more details.
                                            </div>
                                        </div>
                                    </div>

                                    <div className="accordion-item mb-4">
                                        <h2 className="accordion-header">
                                            <button
                                                className="accordion-button collapsed"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#collapseSeven"
                                                aria-expanded="false"
                                                aria-controls="collapseSeven"
                                            >
                                                <span className='accordian_counting'>7.</span> What is your return policy?
                                            </button>
                                        </h2>
                                        <div
                                            id="collapseSeven"
                                            className="accordion-collapse collapse"
                                            data-bs-parent="#accordionExample"
                                        >
                                            <div className="accordion-body">
                                           <strong>We accept returns within 30 days of purchase.</strong>  If the T-shirt is unworn and in its original condition. 
                                            Custom orders may not be eligible for return.
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className='col-lg-6 col-md-12 col-sm-12  my-3 d-flex justify-content-around flex-wrap align-items-end gap-4'>
                                <div>
                                    <p><span className='mx-2' style={{ color: "rgba(45, 149, 253, 1)" }}><FaCheck /></span>Quality Material.</p>
                                    <p><span className='mx-2' style={{ color: "rgba(45, 149, 253, 1)" }}><FaCheck /></span>Provide Size Chart.</p>
                                    <p><span className='mx-2' style={{ color: "rgba(45, 149, 253, 1)" }}><FaCheck /></span> Customization Options Available.</p>
                                    <p><span className='mx-2' style={{ color: "rgba(45, 149, 253, 1)" }}><FaCheck /></span>Fast Delivery.</p>
                                    <p><span className='mx-2' style={{ color: "rgba(45, 149, 253, 1)" }}><FaCheck /></span>Customer Support.</p>
                                    <p><span className='mx-2' style={{ color: "rgba(45, 149, 253, 1)" }}><FaCheck /></span>Return Accepted.</p>
                                </div>
                                <div className='faq_box'>
                                    <p className='faq_box_number'>05</p>
                                    <p>Years of <br /> experience</p>
                                </div>

                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </section>

    </>
}

export default Faq
