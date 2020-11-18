import React from "react";
import "./index.scss";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Product from "./pages/Product/Product";
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/product" component={Product} />
      </Switch>
      <Redirect to="/product" />
    </Router>
  );
}

export default App;
