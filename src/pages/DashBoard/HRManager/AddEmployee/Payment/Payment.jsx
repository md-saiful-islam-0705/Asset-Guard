import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckOut from "./CheckOut";
import { useLocation } from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
const Payment = () => {
    const location = useLocation();
  const { selectedPackage } = location.state || { selectedPackage: { members: 0, price: 0 } };
    return (
        <div>
            <p>Payment</p>
            <div>
                <Elements stripe={stripePromise}>
                    <CheckOut selectedPackage={selectedPackage}></CheckOut>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;