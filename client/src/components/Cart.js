import React from "react";
import { useContext, useState } from "react";
import { Cartcontext } from "../context/Context";
import "./Cart.css"

const Cart = () => {
  const Globalstate = useContext(Cartcontext);
  const state = Globalstate.state;
  const dispatch = Globalstate.dispatch;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);


  const total = state.reduce((total, product) => {
    return total + product.price * product.quantity;
  }, 0);

  const handleCheckout = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
        const res = await fetch('http://127.0.0.1:5555/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                total: total,
                items: state.map(item => ({ id: item.id, quantity: item.quantity })),
            }),
        });

        if (res.ok) {
            setSuccess(true);
            // Clear the cart after successful order placement
            dispatch({ type: 'CLEAR_CART' });
        } else {
            setError('Failed to place order');
        }
    } catch (error) {
        console.error('Error:', error);
        setError('An error occurred while processing your request');
    } finally {
        setLoading(false);
    }
};

  
  return (
    <div className="cart">
      {state.map((product, index) => {
        return (
          <div className="card" key={index}>
            <img src={product.image_url} alt="" />
            <p>{product.name}</p>
            <p>{product.quantity * product.price}</p>
            <div className="quantity">
              <button
                onClick={() => dispatch({ type: "INCREASE", payload: product })}>
                +
              </button>
              <p>{product.quantity}</p>
              <button
                onClick={() => {
                  if (product.quantity > 1) {
                    dispatch({ type: "DECREASE", payload: product });
                  } else {
                    dispatch({ type: "REMOVE", payload: product });
                  }
                }}>
                -
              </button>
            </div>
            <h2 onClick={() => dispatch({ type: "REMOVE", payload: product })}>
              x
            </h2>
          </div>
        );
      })}
      {state.length > 0 && (
        <div className="total">
          <h2>{total}</h2>
        </div>
      )}
      {error && <p className="error">{error}</p>}
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="checkout-button">
                    <button onClick={handleCheckout}>Checkout</button>
                </div>
            )}
            {success && <p className="success">Order placed successfully!</p>}
    </div>
  );
};

export default Cart;