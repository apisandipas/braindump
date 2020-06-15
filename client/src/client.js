import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
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
      console.log("headers", headers);
      const token = headers.get("x-token");
      const refreshToken = headers.get("x-refresh-token");

      if (token && refreshToken) {
        setTokens(token, refreshToken);
      }
    }

    return response;
  });
});

const client = new ApolloClient({
  link: ApolloLink.from([authLink, httpLink]),
  cache: new InMemoryCache()
});

export default client;
