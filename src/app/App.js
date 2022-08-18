import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import routes from "./routes";
import "./App.css";

function App() {
   return (
      <Router>
         <Routes>
            {routes.map(({ component: Component, path }) => {
               return <Route key={path} path={path} element={<Component />} />;
            })}
         </Routes>
      </Router>
   );
}

export default App;
