import { Box, Container, Grid, makeStyles, Paper } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import productApi from "api/productApi";
import { useEffect, useState } from "react";
import ProductFilters from "../components/ProductFilters";
import ProductList from "../components/ProductList";
import ProductSkeletonItem from "../components/ProductSkeletonItem";
import ProductSort from "../components/ProductSort";

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
    marginTop: "20px",
    paddingBottom: "20px",
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
  const [filters, setFilters] = useState({
    _page: 1,
    _limit: 9,
    _sort: "salePrice:ASC",
  });

  const handleChangePage = (event, page) => {
    setFilters((preState) => ({
      ...preState,
      _page: page,
    }));
  };
  const handleSortChange = (newSortValue) => {
    setFilters((preState) => ({
      ...preState,
      _sort: newSortValue,
    }));
  };
  const handleFiltersChange = (newFilters) => {
    setFilters((preState) => ({
      ...preState,
      ...newFilters,
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
            <Paper>
              <ProductFilters
                filters={filters}
                onChange={handleFiltersChange}
              />
            </Paper>
          </Grid>
          <Grid item className={classes.right}>
            <Paper>
              <ProductSort
                currentSortValue={filters._sort}
                onChange={handleSortChange}
              />
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
