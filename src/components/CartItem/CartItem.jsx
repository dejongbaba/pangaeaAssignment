import React from "react";
import "./CartItem.scss";

function CartItem({
  image,
  title,
  price,
  onAdd,
  onRemove,
  selectedCurrency,
  onMinus,
  quantity,
}) {
  return (
    <div className="cart__item">
      <span className="remove" onClick={onRemove}>
        x
      </span>
      <div className="cart__description">
        <p>{title}</p>
        <div className="cart__bottom">
          <div className="cart__control">
            <span className="plus" onClick={onAdd}>
              +
            </span>
            <span className="number">{quantity}</span>
            <span className="minus" onClick={onMinus}>
              -
            </span>
          </div>
          <div className="price">
            {selectedCurrency}
            {price}
          </div>
        </div>
      </div>
      <div className="cart__image">
        <img src={image} alt="cart photo" />
      </div>
    </div>
  );
}

export default CartItem;
