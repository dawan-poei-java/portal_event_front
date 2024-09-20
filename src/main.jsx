import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { setupAuthInterceptor } from "./middlewares/authMiddleware.js";

//Config interceptor
setupAuthInterceptor();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
