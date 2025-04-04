// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
// import './index.css'

import { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App";
import { persistor, store } from "./redux/store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Suspense>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ToastContainer theme="colored" autoClose={500} />
        <BrowserRouter basename="/">
          {/* <AuthWrapper client={authClient}> */}
          <App />
          {/* </AuthWrapper> */}
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </Suspense>
);
