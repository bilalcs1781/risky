import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loader from '../Loader/Loader';
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import CartAnimation from "../Animations/CartAnimation.json"
import "./OrderDetail.css"
import axios from 'axios';

const OrderDetail = () => {

    // useEffect(() => {
    //     window.scrollTo({
    //         top: 0,
    //         behavior: 'smooth'
    //     });
    // }, []);

    const { OrderId } = useParams();
    const cu = useSelector(store => store.userSection.cu);
    const move = useNavigate();
    const [order, setOrder] = useState({});
    const [loading, setLoading] = useState(true);
    const [expandedItems, setExpandedItems] = useState({});

    useEffect(() => {
        setLoading(true);
        try {
            const fetchData = async () => {
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/orderDetail?id=${OrderId}`);
                setOrder(response.data);
                setLoading(false);
            };
            fetchData();
        } catch (error) {
        }
    }, [OrderId]);

    const formatDateTime = (dateStr) => {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        };
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-GB', options);
    };

    const toggleDetails = (index) => {
        setExpandedItems((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };



    // if (cu._id === undefined || order.length === 0 || order.orderItems?.length === 0) {
    //     return <div className='py-0 mb-5 d-flex flex-column align-items-center justify-content-center' style={{ height: '70vh' }}>
    //         <Lottie animationData={CartAnimation} loop={true} style={{ width: "100%", height: "100%" }} />
    //         <button className='btn review_btn' style={{ width: "fit-content" }} onClick={() => move('/Products/all')}>
    //             Browse Products <FaArrowRight />
    //         </button>
    //     </div>
    // }

    return <>
        {loading ? (
            <div className='col-lg-12 col-sm-12 d-flex align-items-center justify-content-center' style={{ height: "50vh" }} >
                <Loader />
            </div >
        ) : (
            <div className='container my-5'>
                <div className='row'>
                    <div className='col'>
                        <center className='font' >
                            <p className='fw-bolder fs-3'
                                style={{ textDecoration: "underline black", fontFamily: "Times New Roman" }}
                            >Order Detail</p>
                            <p ><b >Tracking ID: </b>{order?.orderId}</p>
                        <p className='text-left fs-' F><b >Date: </b>{formatDateTime(order?.date)}</p >
                        </center>
                    </div>
                </div>
                <div className='row' id="orderDetail">
                    <div className='col-12 font' >
                        <p ><b style={{ }}>Name:</b> {order?.name1} {order?.name2}</p>
                        {order?.email && <p ><b style={{  }}>E-mail: </b>{order?.email}</p>}
                        <p ><b style={{  }}>Mobile Number: </b>{order?.number1}</p>
                        {order?.country && <p ><b style={{  }}>Country: </b>{order?.country}</p>}
                        {order?.city && <p ><b style={{  }}>City: </b>{order?.city}</p>}
                        <p ><b style={{  }}>Street & House Number: </b>{order?.street}</p>
                        {order?.appartment && <p ><b style={{  }}>Appartment: </b>{order?.appartment}</p>}
                        {order?.postal && <p ><b style={{  }}>Postcode: </b>{order?.postal}</p>}
                        {/* <p><b style={{  }}>TOTAL ITEMS: </b>{order?.orderItems?.length}</p > */}
                        {order?.note && <p ><b style={{  }}>Note: </b>{order?.note}</p >}
                    </div>
                </div>
                <div className='col-12'>
                    {loading ? (
                        <div className='col-lg-12 col-sm-12 d-flex align-items-center justify-content-center' style={{ height: "50vh" }}>
                            <Loader />
                        </div>
                    ) : (
                        <>
                            <div className='cart_display_layout1'>
                                {order?.orderItems?.map((item, index) => {
                                    return <div className='d-flex gap-4 my-3 border py-3' style={{
                                        marginBottom: "1px solid lightgray"
                                    }} key={index}>
                                        <div className='row'>
                                            <div className='col-4'>
                                                <a href={`/product/${item.title.replace(/ /g, '-')}/${item.productId}`}>
                                                    <div className='text-center' style={{ position: "relative" }}>
                                                        <img
                                                            src={item?.image}
                                                            className="img-fluid rounded-3"
                                                            alt="No Internet"
                                                            style={{ width: "150px" }}
                                                        />
                                                        {item?.discount > 1 &&
                                                            <div className='p-1'
                                                                style={{
                                                                    position: "absolute", top: "-5px", right: "2px",
                                                                    backgroundColor: "red", color: "white",
                                                                    borderRadius: "40px",
                                                                }}>
                                                                <p className='m-0' style={{ fontSize: "10px" }}>
                                                                    {`-${item?.discount}%`}
                                                                </p>
                                                            </div>
                                                        }
                                                    </div>
                                                </a>
                                            </div>
                                            <div className='col-8'>
                                                <div className='w-100 px-2'>
                                                    <div className='py-2 d-flex justify-content-between 
                                                    align-items-center'>
                                                        <p className='m-0 fw-bolder'>
                                                            {item?.title}
                                                        </p>
                                                    </div>
                                                    <hr className='m-0 p-0' />
                                                    <div
                                                     className='py-2 d-flex justify-content-between align-items-center'>
                                                        <p className='m-0 fs-6'>
                                                            Category
                                                        </p>
                                                        <p className='m-0 fs-6'>
                                                            {item?.category}
                                                        </p>
                                                    </div>
                                                    <hr className='m-0 p-0' />
                                                    <div className='py-2 d-flex justify-content-between align-items-center'>
                                                        <p className='m-0 fs-6'>
                                                            Size
                                                        </p>
                                                        <p className='m-0 fs-6'>
                                                            {item.size? item.size:"Not Selected"}
                                                        </p>
                                                    </div>
                                                    <hr className='m-0 p-0' />
                                                    <div className='py-2 d-flex justify-content-between align-items-center'>
                                                        <p className='m-0 fs-6'>
                                                            Color
                                                        </p>
                                                        <p className='m-0 fs-6'>
                                                            {item.color? item.color:"Not Selected"}
                                                        </p>
                                                    </div>
                                                    <hr className='m-0 p-0' />

                                                    <div className='py-2 d-flex justify-content-between align-items-center'>
                                                        <p className='m-0 fs-6'>
                                                            Price
                                                        </p>
                                                        <p className='m-0 fs-6'>
                                                            &pound;{item?.price}
                                                        </p>
                                                    </div>
                                                    <hr className='m-0 p-0' />

                                                    <div className='py-2 d-flex justify-content-between align-items-center'>
                                                        <p className='m-0 fs-6'>
                                                            Quantity
                                                        </p>
                                                        <p className='m-0  fs-6'>
                                                            {item?.quantity}
                                                        </p>
                                                    </div>
                                                    <hr className='m-0 p-0' />


                                                    <div className='py-2 d-flex justify-content-between align-items-center'>
                                                        <p className='m-0 fs-6'>
                                                            Total Price
                                                        </p>
                                                        <p className='m-0 fs-6'>
                                                            &pound;{item?.total.toFixed()}.00
                                                        </p>
                                                    </div>
                                                    <hr className='m-0 p-0' />


                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                })
                                }
                            </div>
                            {/*For Large screen */}
                            <div className='table_display1'>
                                <div className="table-responsive">
                                    <table className="table table-bordered" style={{ tableLayout: 'auto' }}>
                                        <thead>
                                            <tr>
                                                <th>Sr#</th>
                                                {/* <th>Code</th> */}
                                                <th>Picture</th>
                                                <th>Title</th>
                                                <th>Category</th>
                                                <th>Size</th>
                                                <th>Color</th>
                                                <th>Price</th>
                                                <th>Quantity</th>
                                                <th>Discount</th>
                                                <th>Final Price</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {order?.orderItems ? (
                                                order?.orderItems?.map((data, index) => (
                                                    <tr key={index} >
                                                        <td>{index + 1}</td>
                                                        {/* <td>{data?.sn}</td> */}
                                                        <td>
                                                            <a href={`/product/${data.title.replace(/ /g, '-')}/${data.productId}`}>
                                                                <img src={data?.image} alt="No network" style={{ maxWidth: '80px', height: '80px' }} />
                                                            </a>
                                                        </td>
                                                        <td >
                                                            <p className='m-0' style={{ fontSize: "14px" }}>
                                                                {data?.title}
                                                            </p>
                                                        </td>
                                                        <td className='text-center'>{data?.category}</td>
                                                        
                                                        <td className='text-center'>{data.size? data.size:"Not Selected"}</td>
                                                        <td className='text-center'>{data.color? data.color :"Not Selected"}</td>
                                                        {/* <td className='text-center'>{data?.subCategory ? data?.subCategory : "No subcategory"}</td> */}
                                                        <td className='text-center'>{`£${parseFloat(data?.price)?.toFixed()}`}.00</td>
                                                        <td className='text-center'>{`${parseInt(data?.quantity)}`}</td>
                                                        <td className='text-center'>{`${parseFloat(data?.discount || 0).toFixed()}%`}</td>
                                                        <td className='text-center'>{`£${parseFloat(data?.total)?.toFixed()}`}.00</td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="10">No order items available.</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </>
                    )}
                </div>

                <div className='col-lg-12 col-md-12 col-sm-12 d-flex justify-content-end'>
                    <div className='update mb-3 p-3 border' >
                        <div className='d-flex justify-content-between'>
                            <p className='fw-bolder fs-4' >Summary</p>
                        </div>
                        <div className='fw-normal d-flex justify-content-between'>
                            <p >Items:</p>
                            <p>{order?.orderItems?.length}</p>
                        </div>
                        <div className='fw-normal d-flex justify-content-between'>
                            <p >Shipping Fee</p>
                            <p>&pound;{order?.shipping}.00</p>
                        </div>
                        <div className='fw-bold d-flex justify-content-between'>
                            <p >Net Total:</p>
                            <p>&pound;{order?.total.toFixed()}.00</p>
                        </div>
                        {/* <div className=''>
                        <a href="https://wa.me/+447392608087">
                            <button className='btn review_btn'>
                                Cancel Order
                            </button>
                        </a>
                    </div> */}
                    </div>
                </div>
                <div>
                    {cu.role === "admin" &&
                        <a href={`/admin-dashboard`}>
                            <button className='button-submit px-5'>
                                Dashboard
                            </button>
                        </a>
                    }
                    {cu.role != "admin" &&
                        <a href={`/`} >
                            <button className='button-submit px-5' >
                                Back to Home Page
                            </button>
                        </a>
                    }
                </div>
            </div>
        )}
    </>
};

export default OrderDetail;
