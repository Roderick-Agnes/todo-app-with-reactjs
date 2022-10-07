import { randomColor } from "randomcolor";
import React, { useEffect, useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import productApi from "./api/productApi";
import "./App.css";
import NotFound from "./components/NotFound";
import CounterFeature from "./features/Counter";
import HomeDetail from "./features/Home";
import Todo from "./features/Todo";
import logo from "./logo.svg";

function App() {
  useEffect(() => {
    const fetchProducts = async () => {
      const params = {
        _limit: 10,
      };
      const productList = await productApi.getAll(params);
      console.log(productList);
    };

    fetchProducts();
  }, []);

  const [color, setColor] = useState("green");
  useEffect(() => {
    const intervalRef = setInterval(() => {
      const newColor = randomColor();
      setColor(newColor);
    }, 2000);

    return () => {
      clearInterval(intervalRef);
    };
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" />
        <p style={{ color: color }}>
          Edit <code>src/App.js</code> and save to reload.
        </p> */}
        <Switch>
          <Redirect from="/home" to="/" exact />

          {/* <Route path="/" component={HomeDetail} exact /> */}
          <Route path="/" component={CounterFeature} exact />
          <Route path="/todo" component={Todo} exact />
          <Route component={NotFound} />
        </Switch>
      </header>
    </div>
  );
}

export default App;
