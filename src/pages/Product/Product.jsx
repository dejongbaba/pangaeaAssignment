import React, { useState, useEffect } from "react";
import "./Product.scss";
import ProductItem from "../../components/ProductItem/ProductItem";
import imageOne from "../../assets/images/png/classic-maintenance_1024x1024_1_1024x1024.png";
import imageTwo from "../../assets/images/png/moisturizing-balm_32075bd4-6502-4898-bafc-7972d6bb_1024x1024.png";
import Cart from "../../components/Cart/Cart";
import CartItem from "../../components/CartItem/CartItem";
import useCart from "../../hooks/useCart";
import { useMutation, useQuery } from "@apollo/client";
import {
  GET_CURRENCIES,
  GET_PRODUCTS,
  GET_PRODUCTS_CURRENCY,
} from "../../queries/queries";
import Spinner from "../../components/Spinner/Spinner";

function Product(props) {
  //fetch products

  const [currency, setCurrency] = useState("USD");
  const { loading, error, data, refetch } = useQuery(GET_PRODUCTS_CURRENCY, {
    variables: {
      currency,
    },
  });

  const { loading: currLoading, error: currError, data: currencies } = useQuery(
    GET_CURRENCIES
  );

  const {
    onPlus,
    onMinus,
    showCart,
    setShowCart,
    onAdd,
    onRemove,
    reCalcCartItems,
    cartItems,
    cartTotal,
  } = useCart();

  useEffect(() => {
    reCalcCartItems(data && data.products);
  }, [data]);

  const onCurrencyChange = (e) => {
    setCurrency(e.target.value);
    refetch();
  };

  const onShowCart = (product) => {
    onAdd(product);
    setShowCart(!showCart);
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="product__page">
      <div className="product__header">
        <h4 className="product__title">All Products</h4>
        <p className="product__description">A 360&#176; look at lumin</p>
      </div>
      <div className="product__grid">
        {data && data.products && data.products.length
          ? data.products.map((prod, i) => (
              <ProductItem
                key={i}
                selectedCurrency={currency}
                price={prod.price}
                title={prod.title}
                onClick={(e) => onShowCart(prod)}
                image={prod.image_url}
              />
            ))
          : ""}
      </div>

      {showCart ? (
        <Cart
          currencies={currencies.currency}
          onCurrencyChange={onCurrencyChange}
          total={cartTotal}
          selected={currency}
          onClick={() => setShowCart(!onShowCart)}
          onNullClick={(e) => e.stopPropagation()}
        >
          {cartItems && cartItems.length
            ? cartItems.map((prod, i) => (
                <CartItem
                  key={i}
                  selectedCurrency={currency}
                  onRemove={() => onRemove(prod)}
                  image={imageOne}
                  quantity={prod.quantity}
                  price={prod.price}
                  title={prod.title}
                  onMinus={() => onMinus(prod)}
                  onAdd={() => onPlus(prod)}
                />
              ))
            : ""}
        </Cart>
      ) : (
        ""
      )}
    </div>
  );
}

export default Product;
