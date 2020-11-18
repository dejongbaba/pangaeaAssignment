import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query getProducts {
    products {
      id
      title
      image_url
      price(currency: USD)
    }
  }
`;

export const GET_PRODUCTS_CURRENCY = gql`
  query getProducts($currency: Currency!) {
    products {
      id
      title
      image_url
      price(currency: $currency)
    }
  }
`;
export const GET_CURRENCIES = gql`
  query getCurrencies {
    currency: currency
  }
`;
