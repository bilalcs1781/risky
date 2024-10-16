import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { toast } from "react-toastify";

const stripePromise = loadStripe(
  "pk_test_51Px4aqRsoQBPHlEDA15MLzUtHFbmsa9CSIidItQMaMQuNOjSsD7ywDaagl2YmlbZyq7OFOZdrSf8EESQ26voDAnI00xT47XSkh"
);

const PaymentComponent = ({ amount, onPaymentSuccess }) => {
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const cu = useSelector((store) => store.userSection.cu);
  const move = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    try {
      // First, create the payment intent on the backend
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/create-payment-intent`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: amount * 100, currency: "usd" }), // Send amount in cents
        }
      );

      const { clientSecret } = await res.json();

      const cardNumberElement = elements.getElement(CardNumberElement);
      // Confirm the payment and attach the card details
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardNumberElement,
            billing_details: {
              name: "Customer Name", // Add the customer's name dynamically
            },
          },
        }
      );
      console.log(paymentIntent.id, "id>>>>>>>");

      setLoading(false);

      if (error) {
        handleError(error);
      } else if (paymentIntent.status === "succeeded") {
        toast.success("Payment Successful!", { position: "top-center" });

        // Send payment details and status to the backend
        await fetch(
          `${process.env.REACT_APP_BASE_URL}/api/save-payment-status`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              paymentId: paymentIntent.id,
              status: "paid", // Set the status to "paid" after successful payment
            }),
          }
        );

        onPaymentSuccess(paymentIntent);
        move(`/checkout/${cu._id}`);
      }
    } catch (err) {
      setLoading(false);
      handleError(err);
    }
  };

  const handleError = (error) => {
    console.error(error);
    if (error.type === "card_error" || error.type === "validation_error") {
      toast.error(`Payment failed: ${error.message}`, {
        position: "top-center",
      });
    } else {
      toast.error("An unexpected error occurred. Please try again later.", {
        position: "top-center",
      });
    }
  };

  const inputStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  return (
    <form className="mt-4" onSubmit={handleSubmit}>
      {/* <div
      data-mdb-input-init=""
      className="form-outline form-white mb-4"
    >
      <label className="form-label" htmlFor="typeName">
        Cardholder's Name
      </label>
      <input
        type="text"
        id="typeName"
        className="form-control form-control-lg"
        siez={17}
        placeholder="Cardholder's Name"
      />
    </div> */}
      <div data-mdb-input-init="" className="form-outline form-white mb-4">
        <label className="form-label" htmlFor="typeText">
          Card Number
        </label>
        <CardNumberElement
          options={inputStyle}
          className="form-control p-3"
          id="cardNumber"
        />
      </div>
      <div className="row mb-4">
        <div className="col-6">
          <div data-mdb-input-init="" className="form-outline form-white">
            <label className="form-label" htmlFor="typeExp">
              Expiration
            </label>
            <CardExpiryElement
              options={inputStyle}
              id="cardExpiry"
              className="form-control p-3"
            />
          </div>
        </div>
        <div className="col-6">
          <div data-mdb-input-init="" className="form-outline form-white">
            <label className="form-label" htmlFor="typeText">
              Cvv
            </label>
            <CardCvcElement
              options={inputStyle}
              id="cardCvc"
              className="form-control p-3"
            />
          </div>
        </div>
        <button
          type="submit"
          className="button-submit"
          disabled={!stripe || loading}
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </div>
    </form>
  );
};

const StripePayment = ({ amount, onPaymentSuccess }) => (
  <Elements stripe={stripePromise}>
    <PaymentComponent amount={amount} onPaymentSuccess={onPaymentSuccess} />
  </Elements>
);

export default StripePayment;
