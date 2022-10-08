import React from "react";
import PropTypes from "prop-types";
import { Box } from "@material-ui/core";
import FilterByCategory from "./Filters/FilterByCategory";
import FilterBySalePrice from "./Filters/FilterBySalePrice";

ProductFilters.propTypes = {
  filters: PropTypes.object,
  onChange: PropTypes.func,
};

function ProductFilters({ filters, onChange }) {
  const handleChooseCategory = (categoryId) => {
    if (!onChange) return;
    const newFilters = {
      ...filters,
      "category.id": categoryId,
    };
    onChange(newFilters);
  };
  const handleSalePriceChange = (values) => {
    if (!onChange) return;
    onChange(values);
  };
  return (
    <Box>
      <FilterByCategory onChange={handleChooseCategory} />
      <FilterBySalePrice onChange={handleSalePriceChange} />
    </Box>
  );
}

export default ProductFilters;
