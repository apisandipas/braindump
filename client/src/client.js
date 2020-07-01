import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { ApolloLink } from "apollo-link";
import { getTokens, setTokens } from "utils/auth";

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_API_URL + "/graphql"
});

const authLink = new ApolloLink((operation, forward) => {
  const { token, refreshToken } = getTokens();

  operation.setContext({
    headers: {
      "x-token": token || "",
      "x-refresh-token": refreshToken || ""
    }
  });

  return forward(operation).map(response => {
    const context = operation.getContext();
    const {
      response: { headers }
    } = context;

    if (headers) {
      const token = headers.get("x-token");
      const refreshToken = headers.get("x-refresh-token");

      if (token && refreshToken) {
        setTokens(token, refreshToken);
      }
    }

    return response;
  });
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(
          locations
        )}, Path: ${path}`
      );
    });
    if (networkError) console.log(`[Network error]: ${networkError}`);
  }
});

const cache = new InMemoryCache({
  cacheRedirects: {
    Query: {
      getNote: (parent, args, { getCacheKey }) =>
        getCacheKey({ __typename: "Note", id: args.id })
    }
  }
});

const client = new ApolloClient({
  link: ApolloLink.from([authLink, errorLink, httpLink]),
  cache
});

export default client;
