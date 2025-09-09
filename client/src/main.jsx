import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import "./modern-theme.css";
import App from './App.jsx'
import api from "./utils/customFetch.js";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
const response = await api.get("/test");
console.log(response.data);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    <ToastContainer position="top-center" />
  </StrictMode>
);
