import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
// import { BrowserRouter } from "react-router-dom";
// import UserLayout from "./components/layout/layout.tsx";
import { AuthContextProvider } from "./context/auth-context.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthContextProvider>
      {/* <BrowserRouter>
        <UserLayout> */}
          <App />
        {/* </UserLayout>
      </BrowserRouter> */}
    </AuthContextProvider>
  </React.StrictMode>
);
