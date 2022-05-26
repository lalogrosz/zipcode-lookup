import { gql } from "apollo-server-micro";

export const GET_ZIPCODE = gql`
  query lookupZipcode($zipCode: String!, $country: String!) {
    lookupZipcode(zipCode: $zipCode, country: $country) {
      zipcode
      city
      state
      country
    }
  }
`;
