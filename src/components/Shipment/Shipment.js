import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import ProcessPayment from '../ProcessPayment/ProcessPayment';
import './Shipment.css';

const Shipment = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext)
  const { register, handleSubmit, watch, errors } = useForm();
  const [ shippingData, setShippingData] = useState(null)
  const onSubmit = data => {
    setShippingData(data)
  };
  const handlePaymentSuccess = paymentId => {
    console.log('form submitted', shippingData)
    const savedCart = getDatabaseCart();
    const orderDetails = { ...loggedInUser,paymentId, products: savedCart, shipment: shippingData, orderTime: new Date() }

    fetch('http://localhost:5000/addOrder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderDetails)
    })
      .then(res => res.json())
      .then(data => {
        processOrder();
        // alert('your order placed successfully')
      })
      .catch(err => console.log(err))
  }

  console.log(watch("example"));
  return (
    <div className="row">
      <div style={{display:shippingData?'none':'block'}} className="col-md-6">
        <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
          <input name="name" defaultValue={loggedInUser.name} ref={register({ required: true })} placeholder="Your Name" />
          {errors.name && <span className="error">name is required</span>}
          <input name="email" defaultValue={loggedInUser.email} ref={register({ required: true })} placeholder="Your email" />
          {errors.email && <span className="error">email is required</span>}
          <input name="address" ref={register({ required: true })} placeholder="Your address" />
          {errors.address && <span className="error">address is required</span>}
          <input name="phone" ref={register({ required: true })} placeholder="Your phone" />
          {errors.phone && <span className="error">phone is required</span>}
          <input type="submit" />
        </form>
      </div>
      <div style={{display:shippingData?'block':'none'}} className="col-md-6">
        <h3>Please Pay for me</h3>
        <ProcessPayment handlePayment={handlePaymentSuccess}></ProcessPayment>
      </div>
    </div>
  );
};

export default Shipment;