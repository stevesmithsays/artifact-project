//Foreign imports
import React from 'react';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';

const CURRENCY = 'USD';

const fromDollarToCent = amount => {
    return amount * 100;
};

const successPayment = (data) => {
    alert('Payment Successful');
};

const errorPayment = (data) => {
    alert('Payment Error');
};

const onToken = (amount, description) => token => axios.post(process.env.REACT_APP_PAYMENT_SERVER_URL_TEST, 
    {
    description,
    source: token.id,
    currency: CURRENCY,
    amount: fromDollarToCent(amount)
}).then(successPayment).catch(errorPayment);

//actual Checkout Component
const Checkout = ({ name, description, amount}) => {
    console.log(process.env);
return(<StripeCheckout name = {name} description ={description} amount = {fromDollarToCent(amount)} token = {onToken(amount, description)} currency = {CURRENCY} stripeKey = {process.env.REACT_APP_STRIPE_PUBLIC_KEY} />);
};

export default Checkout;

