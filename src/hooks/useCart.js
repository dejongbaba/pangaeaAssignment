import { useState, useEffect } from "react";

function useCart() {
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    setCartTotal(getCartTotal());
  }, [cartItems]);

  const getCartTotal = () => {
    if (cartItems && cartItems.length) {
      return cartItems.reduce((a, b) => a + b.price * b.quantity, 0);
    }
    return 0;
  };

  const reCalcCartItems = (data) => {
    console.log("recalc items", data);
    if (data && data.length) {
      const newCart = cartItems.map((ci) => {
        console.log("c it", ci);
        const item = data.find((d) => ci.id === d.id);
        console.log("item", item);
        if (item) {
          ci.price = item.price;
        }
        console.log("ci", ci);
        return ci;
      });
      console.log("newItems", newCart);
      setCartItems([...newCart]);
    }
  };

  const onPlus = (prod) => {
    //find the product and increase its quantity
    let product = cartItems.find((p) => p.id === prod.id);
    if (product && !product.quantity) {
      const filteredItems = cartItems.filter((prd) => prd.id !== product.id);
      const data = { ...product, quantity: 1 };
      setCartItems([...filteredItems, data]);
    } else {
      const filteredItems = cartItems.filter((prd) => prd.id !== product.id);
      const data = { quantity: product.quantity++, ...product };
      setCartItems([...filteredItems, data]);
    }
  };

  const onRemove = (prod) => {
    const filtered = cartItems.filter((prd) => prd.id !== prod.id);
    setCartItems(filtered);
  };

  const onMinus = (prod) => {
    //find the product and reduce its quantity
    if (prod.quantity) {
      let product = cartItems.find((p) => p.id === prod.id);
      if (product && product.quantity) {
        const filteredItems = cartItems.filter((prd) => prd.id !== product.id);
        const data = { quantity: product.quantity--, ...product };
        setCartItems([...filteredItems, data]);
      }
    }
  };

  const onAdd = (prod) => {
    // check the list if the product exist ,if not add the product
    // else if it exist increase the quantity
    let product = cartItems.find((p) => p.id === prod.id);
    if (product) {
      const filteredData = cartItems.filter((prod) => prod.id !== product.id);
      setCartItems((prev) => [
        ...filteredData,
        { ...product, quantity: product.quantity++ },
      ]);
    } else {
      setCartItems((prev) => [...prev, { ...prod, quantity: 1 }]);
    }
  };

  return {
    cartItems,
    setCartItems,
    onAdd,
    onMinus,
    onPlus,
    onRemove,
    showCart,
    reCalcCartItems,
    setShowCart,
    cartTotal,
    setCartTotal,
  };
}

export default useCart;
