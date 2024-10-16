import React, { useEffect, useRef, useState } from 'react';
import { jwtDecode } from "jwt-decode";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Loader from "../Loader/Loader"
import "./card.css";
import axios from 'axios';


const Arrivals = () => {

    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    /* User */

    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/collect/products/active`);
                // console.log(response.data,"data here")
                setProducts(response.data);
            } catch (error) {
                setError("Failed to fetch products. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, []);



    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-12">
                    <h1 className="home_heading mb-5 text-capitalize fs-3">Best Sellings</h1>
                </div>
            </div>
            <div className="row row-cols-lg-4 row-cols-md-3 row-cols-sm-2 row-cols-2">
                {isLoading ? (
                    <div className='col-lg-12 col-sm-12 d-flex align-items-center justify-content-center' style={{ height: "50vh" }} >
                        <Loader />
                    </div>
                ) : error ? (
                    <p>Check your internet connection and try again!</p>
                ) : (
                    products?.map((item, index) => (
                        <div className="col card" key={index}>
                            <a href={`/product/${item.title.replace(/ /g, '-')}/${item._id}`}>
                                <div className="card_img">
                                    <img src={item?.images[0]} className="text-center" alt={item?.title} />
                                </div>
                                <p className="card_title">{item?.title}</p>
                                <p className="final_price">
                                    ${item?.Fprice.toFixed(0)}
                                    {item?.discount > 0 && (
                                        <>
                                            <span className="mx-2 text-muted discounted_price"><s>${item?.price.toFixed(0)}</s></span>
                                            <span className="mx-2 discount">-{item?.discount}%</span>
                                        </>
                                    )}
                                </p>
                            </a>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Arrivals;
