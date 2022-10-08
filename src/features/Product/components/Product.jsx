import { Box, Typography } from "@material-ui/core";
import { STATIC_HOST, THUMNAIL_DEFAULT } from "constants";
import PropTypes from "prop-types";

Product.propTypes = {
  product: PropTypes.object,
};

function Product({ product = {} }) {
  const thumbnailUrl = product.thumbnail
    ? STATIC_HOST + product.thumbnail?.url
    : THUMNAIL_DEFAULT;
  return (
    <Box padding={2}>
      <Box minHeight={"100%"}>
        <img src={thumbnailUrl} alt={product.name} width="100%" />
      </Box>
      <Typography>{product.name}</Typography>
      <Typography>
        <Box component={"span"} fontSize={"16px"} fontWeight={"bold"}>
          {new Intl.NumberFormat("vn-VN", {
            style: "currency",
            currency: "VND",
          }).format(product.salePrice)}
        </Box>
        {product.promotionPercent > 0 && ` -${product.promotionPercent}%`}
      </Typography>
    </Box>
  );
}

export default Product;
