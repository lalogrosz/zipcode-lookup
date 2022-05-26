import { gql } from "apollo-server-micro";

const typeDefs = gql`
  type ZipcodeResult {
    zipcode: String!
    city: String!
    state: String!
    country: String!
  }

  type Query {
    lookupZipcode(zipCode: String!, country: String!): ZipcodeResult!
  }
`;

export default typeDefs;
