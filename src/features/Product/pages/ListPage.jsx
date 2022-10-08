import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Box, Container, Grid, makeStyles, Paper } from "@material-ui/core";
import productApi from "api/productApi";
import ProductSkeletonItem from "../components/ProductSkeletonItem";
import ProductList from "../components/ProductList";
import Pagination from "@material-ui/lab/Pagination";

ListPage.propTypes = {};

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "10px 0",
  },
  left: {
    maxWidth: "250px",
    width: "250px",
    position: "sticky",
  },
  right: {
    flex: "1 1 0",
  },
  pagination: {
    marginTop: "10px",
    paddingBottom: "10px",
    display: "flex",
    justifyContent: "center",
  },
}));
function ListPage(props) {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [productList, setProductList] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 9,
    total: 9,
  });
  const [filters, setFilters] = useState({ _page: 1, _limit: 9 });

  const handleChangePage = (event, page) => {
    setFilters((preState) => ({
      ...preState,
      _page: page,
    }));
  };

  useEffect(() => {
    try {
      (async () => {
        const { data, pagination } = await productApi.getAll(filters);
        setProductList(data);
        setLoading(false);
        setPagination(pagination);
      })();
    } catch (error) {
      console.log("Failed to fecth product list: ", error);
    }
  }, [filters]);
  return (
    <Box className={classes.root}>
      <Container>
        <Grid container spacing={1}>
          <Grid item className={classes.left}>
            <Paper>Left</Paper>
          </Grid>
          <Grid item className={classes.right}>
            <Paper>
              {loading ? (
                <ProductSkeletonItem />
              ) : (
                <ProductList data={productList} />
              )}
              <Pagination
                count={Math.ceil(pagination.total / pagination.limit)}
                page={pagination.page}
                onChange={handleChangePage}
                color="primary"
                className={classes.pagination}
              />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ListPage;
