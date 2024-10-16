import React from 'react'
import RingLoader from "react-spinners/RingLoader";

const Loader = () => {

    return <>
    <div className='d-flex justify-content-center align-items-center' style={{minHeight:"50vh"}}>
    <div className='d-flex flex-column gap-2 px-5 py-3 align-items-center' style={{
            width: "fit-contet",
            height: "fit-content",
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            zIndex: "100"
        }}>
            <div>
                <RingLoader  color="#1b2950" />
            </div>
            <div>
                <p className='text-muted m-0'>Please Wait </p>
            </div>

        </div>
    </div>


    </>
}

export default Loader