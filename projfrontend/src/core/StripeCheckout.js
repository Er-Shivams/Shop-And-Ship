import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth/helper";
import { cartEmpty, loadCart } from "./helper/cartHelper";
import { Link } from "react-router-dom";
import StripeCheckoutButton from  "react-stripe-checkout";
import { API } from "../backend";
import { createOrder } from "./helper/orderHelper";



const StripeCheckout = ({
  products,
  setReload = f => f,
  reload = undefined
}) => {
  const [data, setData] = useState({
    loading: false,
    success: false,
    error: "",
    address: ""
  });

  const token = isAuthenticated() && isAuthenticated().token;
  const userId = isAuthenticated() && isAuthenticated().user._id;

  const getFinalAmount = () => {
    let amount = 0;
    products.map(p => {
      amount = amount + p.price;
    });
    return amount;
  };

  const makePayment = token => {
     const body = {
       token,
       products
     }
     const headers = {
       "Content-Type": "application/json"
     }

     return fetch( `${API}/stripepayment`, {
       method: "POST",
       headers,
       body: JSON.stringify(body)
     }).then(response => {
       console.log(response)
       //call further method
      //  const {status} = response or
      // console.log("STATUS",response.status);
     }).catch(error => console.log(error))
  }

  const showStripeButton = () => {
    return isAuthenticated() ? (
      <StripeCheckoutButton
        stripeKey="pk_test_51IvIwdSJ8erOVHDrZ78a2qFuyjFUNDI4Be9SvHLDZDkywMrJ4a2rJcMiMfUTnadBxJUt8prueLmaPHwE1B0E0E1B00RRpfGdF9"
        token = {makePayment}
        amount = {getFinalAmount() * 100}
        name= "Buy tshirts"
        shippingAddress
        billingAddress

      >
          <button className="btn btn-success">Pay with stripe</button>
      </StripeCheckoutButton>
      
    ) : (
      <Link to="/signin">
        <button className="btn btn-warning">Signin</button>
      </Link>
    );
  };

  return (
    <div>
      <h3 className="text-white">Stripe Checkout {getFinalAmount()}</h3>
      {showStripeButton()}
    </div>
  );
};

export default StripeCheckout;
