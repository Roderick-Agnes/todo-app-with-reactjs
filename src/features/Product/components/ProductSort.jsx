import React from "react";
import PropTypes from "prop-types";
import { makeStyles, Tab, Tabs } from "@material-ui/core";

ProductSort.propTypes = {
  currentSortValue: PropTypes.string.isRequired,
  onChange: PropTypes.func,
};
const useStyles = makeStyles((theme) => ({
  root: {},
  headerShort: {
    margin: theme.spacing(2),
  },
}));
function ProductSort(props) {
  const classes = useStyles();
  const { currentSortValue, onChange } = props;

  const handleShortChange = (event, newValue) => {
    if (onChange) onChange(newValue);
  };

  return (
    <Tabs
      className={classes.headerShort}
      value={currentSortValue}
      indicatorColor="primary"
      textColor="primary"
      onChange={handleShortChange}
      aria-label="disabled tabs example"
    >
      <Tab label="Min to max" value="salePrice:ASC" />

      <Tab label="Max to min" value="salePrice:DESC" />
    </Tabs>
  );
}

export default ProductSort;
