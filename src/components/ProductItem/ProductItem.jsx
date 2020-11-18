import React from "react";
import "./ProductItem.scss";
import Button from "../Button/Button";

function ProductItem({
  image,
  title,
  price,
  buttonTitle,
  selectedCurrency,
  onClick,
}) {
  return (
    <div className="product__item">
      <div className="product__item__wrapper">
        <img src={image} alt="product item" />
      </div>
      <p className="product__item__title">{title}</p>
      <p className="product__item__price">
        From:{selectedCurrency}
        {price}
      </p>

      <Button
        className="product__item__button"
        type="button"
        title={"Add to Cart"}
        onClick={onClick}
      />
    </div>
  );
}

export default ProductItem;
