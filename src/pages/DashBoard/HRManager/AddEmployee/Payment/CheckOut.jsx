import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../../../hooks/useAxiosSecure";
import useAuth from "../../../../../hooks/useAuth";

const CheckoutForm = ({ selectedPackage }) => {
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  const price = selectedPackage.price;

  useEffect(() => {
    if (price > 0) {
      axiosSecure
        .post("/create-payment-intent", { price })
        .then((res) => {
          console.log(res.data.clientSecret);
          setClientSecret(res.data.clientSecret);
        })
        .catch((error) => {
          console.error("Error creating payment intent:", error);
        });
    }
  }, [axiosSecure, price]);

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!stripe || !elements) {
      return;
    }
  
    const card = elements.getElement(CardElement);
  
    if (card === null) {
      return;
    }
  
    const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card
    })

    if (error) {
        console.log('payment error', error);
        setError(error.message);
    }
    else {
        console.log('payment method', paymentMethod)
        setError('');
    }

    // confirm payment
    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
            card: card,
            billing_details: {
                email: user?.email || 'anonymous',
                name: user?.displayName || 'anonymous'
            }
        }
    })

    if (confirmError) {
        console.log('confirm error')
    }
  
      if (paymentIntent.status === "succeeded") {
        console.log("transaction id", paymentIntent.id);
        setTransactionId(paymentIntent.id);
  
        const payment = {
          email: user.email,
          price: selectedPackage.price,
          transactionId: paymentIntent.id,
          date: new Date(),
          packageMembers: selectedPackage.members,
          status: "pending",
        };
  
        const res = await axiosSecure.post("/payments", payment);
        console.log("payment saved", res.data);
  
        if (res.data?.paymentResult) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Thank you for your purchase",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/");
        }
      }
    
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button className="btn btn-sm btn-primary my-4" type="submit">
        Pay ${selectedPackage.price}
      </button>
      <p className="text-red-600">{error}</p>
      {transactionId && (
        <p className="text-green-600">Your transaction id: {transactionId}</p>
      )}
    </form>
  );
};

export default CheckoutForm;
