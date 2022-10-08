import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import categoryApi from "api/categoryApi";
import { Box, makeStyles, Typography } from "@material-ui/core";
import { MicNone } from "@material-ui/icons";
import { Skeleton } from "@material-ui/lab";

FilterByCategory.propTypes = {
  onChange: PropTypes.func,
};
const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  menu: {
    listStyleType: "none",
    padding: 0,
    margin: 0,
    "& > li": {
      marginTop: theme.spacing(1),
      transition: "all 0.25s",
      "&:hover": {
        color: theme.palette.secondary.dark,
        cursor: "pointer",
      },
    },
  },
}));

function FilterByCategory({ onChange }) {
  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(true);
  const classes = useStyles();

  useEffect(() => {
    (async () => {
      try {
        const response = await categoryApi.getAll();
        setCategoryList(
          response.map((item) => ({
            id: item.id,
            name: item.name,
          }))
        );
        setLoading(false);
      } catch (error) {
        console.log("Failed to fetch category list");
      }
    })();
  }, []);

  const handleCategoryItemClick = (categoryId) => {
    if (onChange) onChange(categoryId);
  };
  return (
    <Box className={classes.root}>
      <Typography variant="subtitle2" fontWeight="bold">
        DANH MỤC SẢM PHẨM
      </Typography>
      <ul className={classes.menu}>
        {loading &&
          Array.from(new Array(6)).map((item, idx) => (
            <li key={idx}>
              <Skeleton />
            </li>
          ))}
        {!loading &&
          categoryList.map((item) => (
            <li
              key={item.id}
              onClick={() => {
                handleCategoryItemClick(item.id);
              }}
            >
              <Typography variant="body2">{item.name}</Typography>
            </li>
          ))}
      </ul>
    </Box>
  );
}

export default FilterByCategory;
