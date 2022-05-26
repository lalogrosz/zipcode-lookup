import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import fetch from "isomorphic-fetch";

const httpLink = new HttpLink({
  uri: "/api/graphql",
  fetch
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: httpLink
});

export default client;
