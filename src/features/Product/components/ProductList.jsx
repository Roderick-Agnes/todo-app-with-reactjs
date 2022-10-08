import React from "react";
import PropTypes from "prop-types";
import { Box, Grid, makeStyles } from "@material-ui/core";
import Product from "./Product";
import { Alert } from "@material-ui/lab";

ProductList.propTypes = {
  data: PropTypes.array,
};
ProductList.defaultProps = { data: [] };

const useStyles = makeStyles((theme) => ({
  root: {},
  alert: {
    margin: theme.spacing(2),
  },
}));

function ProductList({ data }) {
  const classes = useStyles();
  return (
    <Box>
      {data.length === 0 && (
        <Alert severity="warning" className={classes.alert}>
          Not found data
        </Alert>
      )}
      <Grid container>
        {data.length > 0 &&
          data.map((product, idx) => (
            <Grid item key={idx} xs={12} sm={6} md={4} lg={3}>
              <Product product={product} />
            </Grid>
          ))}
      </Grid>
    </Box>
  );
}

export default ProductList;
