import ProductFeature from "features/Product";
import { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import productApi from "./api/productApi";
import "./App.css";
import Header from "./components/Header";
import NotFound from "./components/NotFound";
import CounterFeature from "./features/Counter";
import Todo from "./features/Todo";

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

  // const [color, setColor] = useState("green");
  // useEffect(() => {
  //   const intervalRef = setInterval(() => {
  //     const newColor = randomColor();
  //     setColor(newColor);
  //   }, 2000);

  //   return () => {
  //     clearInterval(intervalRef);
  //   };
  // }, []);
  return (
    <div className="App">
      <Header />
      {/* <img src={logo} className="App-logo" alt="logo" />
        <p style={{ color: color }}>
          Edit <code>src/App.js</code> and save to reload.
        </p> */}
      <Switch>
        <Redirect from="/home" to="/" exact />

        {/* <Route path="/" component={HomeDetail} exact /> */}
        {/* <Route path="/" component={CounterFeature} exact /> */}
        <Route path="/" component={ProductFeature} exact />
        <Route path="/products" component={ProductFeature} />
        <Route path="/todos" component={Todo} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
