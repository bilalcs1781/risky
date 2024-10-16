import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import StripePayment from "./PaymentComponent";
import { RxCross1 } from "react-icons/rx";
import Loader from "../Loader/Loader";
import "./checkout.css";

const Checkout = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  const cu = useSelector((store) => store.userSection.cu);
  const allCartItems = useSelector((store) => store.Cart.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    axios.get(`${process.env.REACT_APP_BASE_URL}/addToCart`).then((res) => {
      try {
        if (res) {
          dispatch({
            type: "ADD_TO_CART",
            payload: res.data,
          });
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    });
  }, [dispatch]);

  useEffect(() => {
    if (allCartItems) {
      setCart(allCartItems);
    }
  }, [allCartItems]);

  const filterCart = cart.filter((item) => item.userId === userId);

  const subtotal = filterCart.reduce((acc, item) => acc + item.total, 0);
  const total = subtotal;

  const totalQuantity = filterCart.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  const DeleteCartItem = async (itemId) => {
    try {
      setLoading(true);
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/deleteCart?id=${itemId}`
      );
      if (response.data.status === "success") {
        dispatch({
          type: "ADD_TO_CART",
          payload: response.data.alldata,
        });
        setLoading(false);
        toast.success("Item Removed");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handlePaymentSuccess = async (paymentIntent) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/create-order`,
        {
          userId: cu._id,
          items: filterCart,
          total: total,
          paymentIntentId: paymentIntent.id,
        }
      );

      if (response.data.status === "success") {
        await axios.delete(
          `${process.env.REACT_APP_BASE_URL}/api/clear-cart/${cu._id}`
        );
        toast.success("Order placed successfully!");
        navigate("/order-confirmation", {
          state: { orderId: response.data.orderId },
        });
      }
    } catch (error) {
      console.error("Error creating order:", error);
      toast.error("Failed to create order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading ? (
        <div
          className="col-12 d-flex justify-content-center align-items-center"
          style={{ height: "80vh" }}
        >
          <Loader />
        </div>
      ) : filterCart?.length > 0 ? (
        <section
          className="min-vh-100 checkout"
          style={{ backgroundColor: "#eee" }}
        >
          <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col">
                <div className="card">
                  <div className="card-body p-4">
                    <div className="row">
                      <div className="col-lg-7">
                        <h5 className="mb-3">
                          <a href="/Products/all" className="text-body">
                            <i className="fas fa-long-arrow-alt-left me-2" />
                            Continue shopping
                          </a>
                        </h5>
                        <hr />
                        <div className="d-flex justify-content-between align-items-center mb-4">
                          <p className="mb-0">
                            You have <strong>{totalQuantity}</strong> items in
                            your cart
                          </p>
                        </div>
                        {filterCart?.map((item) => (
                          <div className="card mb-3 border" key={item._id}>
                            <div className="card-body">
                              <div className="d-flex justify-content-between">
                                <div className="d-flex flex-row align-items-center">
                                  <img
                                    src={item?.image}
                                    className="img-fluid rounded-3"
                                    alt="Shopping item"
                                    style={{ width: 65 }}
                                  />
                                  <div className="ms-3">
                                    <h5>{item?.title}</h5>
                                    {item?.size && (
                                      <p className="small mb-0">{item?.size}</p>
                                    )}
                                  </div>
                                </div>
                                <div className="d-flex flex-row align-items-center">
                                  <h5 className="fw-normal mb-0" style={{ width: 50 }}>
                                    {item?.quantity}
                                  </h5>
                                  <h5 className="mb-0" style={{ width: 80 }}>
                                    &pound;{item?.total?.toFixed()}
                                  </h5>
                                  <a
                                    href="#!"
                                    style={{ color: "#cecece" }}
                                    onClick={() => DeleteCartItem(item._id)}
                                  >
                                    <RxCross1 />
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="col-lg-5">
                        <div className="card bg-primary text-white rounded-3">
                          <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                              <h5 className="mb-0">Card details</h5>
                              <img
                                src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                                className="img-fluid rounded-3"
                                style={{ width: 45 }}
                                alt="Avatar"
                              />
                            </div>
                            <h3>Payment</h3>
                            <div className="d-flex justify-content-between">
                              <p className="mb-2">Subtotal</p>
                              <p className="mb-2">
                                &pound;{subtotal?.toFixed()}.00
                              </p>
                            </div>
                            <div className="d-flex justify-content-between">
                              <p className="mb-2">Shipping</p>
                              <p className="mb-2">Free</p>
                            </div>
                            <div className="d-flex justify-content-between mb-4">
                              <p className="mb-2">Total (Incl. taxes)</p>
                              <p className="mb-2">
                                &pound;{total?.toFixed()}.00
                              </p>
                            </div>
                            <StripePayment
                              amount={total}
                              onPaymentSuccess={handlePaymentSuccess}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <div
          className="px-4 pt-5 d-flex flex-column justify-content-center align-items-center"
          style={{ minHeight: "70vh" }}
        >
          <img src="/cart.png" alt="" style={{ width: "150px" }} />
          <p className="fw-bolder mt-3" style={{ color: "rgb(2,2,94)" }}>
            Your Cart is Empty
          </p>
          <a href="/Products/all">
            <button className="button-submit px-4">Shop our products</button>
          </a>
        </div>
      )}
    </div>
  );
};

export default Checkout;
