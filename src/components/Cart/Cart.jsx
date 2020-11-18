import * as React from "react";
import "./Cart.scss";
import PropTypes from "prop-types";
import CartItem from "../CartItem/CartItem";
import imageOne from "../../assets/images/png/classic-maintenance_1024x1024_1_1024x1024.png";
import Button from "../Button/Button";

function Cart({
  children,
  onClick,
  onNullClick,
  total,
  onSubscribe,
  onCheckout,
  onCurrencyChange,
  currencies,
  selected: selectedCurrency,
  cancel,
  className,
}) {
  return (
    <div
      className={`myModal ${className ? className : ""}`}
      onClick={(e) => onClick && onClick(e)}
    >
      <div className="modalBlock">
        <ModelContentBlock
          onClick={(e) => onClick && onClick(e)}
          onNullClick={onNullClick}
          cancel={cancel}
        >
          <div className="cart__container">
            <p>Your Cart</p>
            <div>
              <select
                className="cart__currency"
                name="currency"
                onChange={onCurrencyChange}
              >
                {currencies && currencies.length
                  ? currencies.map((c) => (
                      <option selected={c === selectedCurrency} value={c}>
                        {c}
                      </option>
                    ))
                  : ""}
              </select>
            </div>

            <div className="cart__list">{children}</div>
            <div className="cart__checkout">
              <hr />
              <div className="cart__total__detail">
                <div>Subtotal</div>
                <div>
                  {selectedCurrency} {total}
                </div>
              </div>
              <Button
                onClick={onSubscribe}
                className="cart__button button__light"
                title="Make this a subscription (save 20%)"
              />
              <Button
                onClick={onCheckout}
                className="cart__button button__green"
                title="Proceed to Checkout"
              />
            </div>
          </div>
        </ModelContentBlock>
      </div>
    </div>
  );
}

const ModelContentBlock = ({ children, onNullClick, onClick, cancel }) => {
  return (
    <div className="modalWrapper position-relative">
      <div className="closeModal position-absolute">
        {cancel ? (
          <span className="fa fa-2x fa-arrow-left" onClick={onClick} />
        ) : (
          ""
        )}
      </div>
      <div
        className="modalBlock-content"
        onClick={(e) => onNullClick && onNullClick(e)}
      >
        {children}
      </div>
    </div>
  );
};

Cart.ContentBlock = ModelContentBlock;

Cart.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  onNullClick: PropTypes.func,
  className: PropTypes.string,
};

export default Cart;
