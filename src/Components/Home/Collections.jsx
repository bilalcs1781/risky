import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../Loader/Loader';
import axios from 'axios';
import "./collection.css"

const Collections = () => {

    const [collection, setCollection] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [search, setSearch] = useState('');

    let move = useNavigate()

    useEffect(() => {
        setIsLoading(true)
        axios
            .get(`${process.env.REACT_APP_BASE_URL}/collection/ActiveStatus`)
            .then((res) => {
                setCollection(res?.data);
                setIsLoading(false);
                // console.log(res.data, "Collection Here")
            })
            .catch((error) => {
            });
    }, []);
    // /Product/byCategory/:category
    return <>
        <div className="container mt-5">
            <div className="row">
                <div className="col-12"><h1 className='home_heading text-center mb-1 text-capitalize fs-3'>Premium 1st</h1></div>
            </div>
            <div className='d-flex flex-wrap align-center justify-content-center'>
                {isLoading ? (
                    <Loader />
                ) : (
                    collection.map((data, index) => {
                        return (
                            <Link
                                to={`/Products/${data.category}`}
                                className="cursor px-3 my-3 "
                                key={index}
                            >
                                    <div className="image_wrapper collection_card border">
                                        <img src={data.image} alt="" className="collection_image" />
                                    </div>
                                            <p className="mt-2 text-center fw-bolder fs-3">{data.category}</p>
                            </Link>
                        );
                    })
                )}
            </div>
        </div>
    </>
}

export default Collections