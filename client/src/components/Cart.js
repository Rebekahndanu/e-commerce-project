import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Cart.css";
import { removeFromCart, addToCart, decreaseCart, clearCart, getTotals } from "../features/cartSlice";
import NavBar from "./Navbar";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  const getUserId = () => {
    return 2;
  };

  const handleAddToCart = (cartItem) => {
    dispatch(addToCart(cartItem));
  };
  const handleDecreaseCart = (cartItem) => {
    dispatch(decreaseCart(cartItem));
  };
  const handleRemoveFromCart = (cartItem) => {
    dispatch(removeFromCart(cartItem));
  };
  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleCheckout = async () => {
    try {
      const userId = getUserId();
      // const token = localStorage.getItem("access_token");
      // console.log("Token:", token); 
      // if (!token) {
      //   console.error("Access token not found");
      //   return;
      // }

      const response = await fetch("http://127.0.0.1:5505/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user_id: userId,
          quantity: cart.cartItems.map((item) => item.cartQuantity),
          product_id: cart.cartItems.map((item) => item.id),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Order placed successfully:", data);
      } else {
        console.error("Failed to place order:", response.statusText);
      }

      dispatch(clearCart());
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div className="cart-container">
      <div className="cart-navbar">
        <NavBar />
        {/* Your NavBar content */}
      </div>
      <div className="cart-content">
        <h2>CART</h2>
        {cart.cartItems.length === 0 ? (
          <div className="cart-empty">
            <p>Your cart is empty</p>
            <div className="shop">
              <Link to="/products">
                <button>
                  <span>Start shopping</span>
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <div>
            <div className="titles">
              <h3 className="product-title">Products</h3>
              <h3 className="price">Price</h3>
              <h3 className="Quantity">Quantity</h3>
              <h3 className="total">Total</h3>
            </div>
            <div className="cart-items">
              {cart.cartItems.map((cartItem) => (
                <div className="cart-item" key={cartItem.id}>
                  <div className="cart-product">
                    <div>
                      <h3>{cartItem.name}</h3>
                      <p>{cartItem.desc}</p>
                    </div>
                  </div>
                  <div className="cart-product-price">${cartItem.price}</div>
                  <div className="cart-product-quantity">
                    <button onClick={() => handleDecreaseCart(cartItem)}>-</button>
                    <div className="count">{cartItem.cartQuantity}</div>
                    <button onClick={() => handleAddToCart(cartItem)}>+</button>
                  </div>
                  <div className="cart-product-total-price">${cartItem.price * cartItem.cartQuantity}</div>
                </div>
              ))}
            </div>
            <div className="cart-summary">
              <button className="clear-btn" onClick={() => handleClearCart()}>
                Clear Cart
              </button>
              <div className="cart-checkout">
                <div className="subtotal">
                  <span>Subtotal</span>
                  <span className="amount">${cart.cartTotalAmount}</span>
                </div>
                {/* <p>Taxes and shipping calculated at checkout</p> */}
                <button onClick={() => handleCheckout()}>Checkout</button>
                <div className="continue-shopping">
                  <Link to="/products">
                    <span>Continue shopping</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;