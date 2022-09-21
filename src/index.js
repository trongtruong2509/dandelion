import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./app/App";
import { store } from "./app/store";
import { Provider } from "react-redux";

import { ThemeProvider } from "@material-tailwind/react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
   <Provider store={store}>
      {/* <React.StrictMode> */}

      <ThemeProvider>
         <App />
      </ThemeProvider>
      {/* </React.StrictMode> */}
   </Provider>
);
