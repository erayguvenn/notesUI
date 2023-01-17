import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

//Root id'li div'e bağlı react uygulamasını oluşturuyoruz.
const root = ReactDOM.createRoot(document.getElementById("root"));

// Oluşturduğumuz uygulamaya App componentini render ediyoruz.
root.render(<App />);
