import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
// import Context from "./context/Context";
import { configureStore} from "@reduxjs/toolkit"
import { Provider } from "react-redux"
import productReducer, { productsFetch } from "./features/productSlice"
import { productsApi } from "./features/productsApi";
import cartReducer, { getTotals } from "./features/cartSlice"

const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDedaultMiddleware) => {
    return getDedaultMiddleware().concat(productsApi.middleware);
  }
});

store.dispatch(productsFetch())
store.dispatch(getTotals())

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
  <Provider store={store}>
    <App />
  </Provider>
  </BrowserRouter>
);