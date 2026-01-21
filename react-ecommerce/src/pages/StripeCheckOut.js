import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import "../Stripe.css";
import { useSelector } from "react-redux";
import { selectCurrentOrder } from "../features/order/orderSlice";
import { axiosInstance } from "../api/apiClient";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

export default function StripeCheckOut({ children }) {
  const [clientSecret, setClientSecret] = useState("");
  const currentOrder = useSelector(selectCurrentOrder);

  useEffect(() => {
    if (currentOrder?.totalAmount) {
      axiosInstance
        .post("/create-payment-intent", {
          totalAmount: currentOrder.totalAmount,
          meta: {
            order_id: currentOrder.id,
          },
        })
        .then((response) => {
          setClientSecret(response.data.clientSecret);
        })
        .catch((err) => {
          const errorMessage =
            err.response?.data?.message ||
            err.message ||
            "Failed to create payment intent";
          console.error("Payment intent error:", errorMessage);
        });
    }
  }, [currentOrder?.totalAmount, currentOrder?.id]);

  const appearance = {
    theme: "stripe",
  };

  const loader = "auto";

  return (
    <div className="Stripe">
      {clientSecret && (
        <Elements
          options={{ clientSecret, appearance, loader }}
          stripe={stripePromise}
        >
          {children}
        </Elements>
      )}
    </div>
  );
}
