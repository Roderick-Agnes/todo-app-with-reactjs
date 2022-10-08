import React from "react";
import PropTypes from "prop-types";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import ListPage from "./pages/ListPage";

ProductFeature.propTypes = {};

function ProductFeature(props) {
  const match = useRouteMatch();
  return (
    <div>
      {/*  sub routing */}
      <Switch>
        <Route path={match.url} component={ListPage}></Route>
      </Switch>
    </div>
  );
}

export default ProductFeature;
