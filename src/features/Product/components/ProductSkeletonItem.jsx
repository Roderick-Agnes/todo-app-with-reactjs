import React from "react";
import PropTypes from "prop-types";
import { Box, Grid } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";

ProductSkeletonItem.propTypes = {
  length: PropTypes.number,
};
ProductSkeletonItem.defaultProps = {
  length: 9,
};

function ProductSkeletonItem(props) {
  const { length } = props;
  return (
    <Box>
      <Grid container>
        {Array.from(new Array(length)).map((item, idx) => (
          <Grid item key={idx} xs={12} sm={6} md={4} lg={3}>
            <Box padding={1}>
              <Skeleton variant="rect" width="100%" height={250} />
              <Skeleton />
              <Skeleton width="50%" />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ProductSkeletonItem;
