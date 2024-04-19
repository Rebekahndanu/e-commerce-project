import React from "react";
import { useContext } from "react";
import { Cartcontext } from "../context/Context";
import "./Cart.css"

const Cart = () => {
  const Globalstate = useContext(Cartcontext);
  const state = Globalstate.state;
  const dispatch = Globalstate.dispatch;

  const total = state.reduce((total, product) => {
    return total + product.price * product.quantity;
  }, 0);
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
    </div>
  );
};

export default Cart
