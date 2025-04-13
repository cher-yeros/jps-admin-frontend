import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
  split,
} from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { useSelector } from "react-redux";
import { Outlet } from "react-router";

import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),

  defaultOptions: {
    watchQuery: {
      fetchPolicy: "no-cache",
    },
  },
  connectToDevTools: true,
});

const local = "http://localhost:4000/graphql";

export default function AuthWrapper() {
  const { token } = useSelector((state) => state.auth);

  const httpLink = createHttpLink({
    uri: "https://api2.jpstvethiopia.com/graphql",
    credentials: "include",
    headers: {
      authorization: token ? `Bearer ${token}` : "",
    },
  });

  const wsLink = new GraphQLWsLink(
    createClient({
      url: "wss://api2.jpstvethiopia.com/graphql",
      connectionParams: {
        authorization: token ? `Bearer ${token}` : "",
      },
    })
  );

  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === "OperationDefinition" &&
        definition.operation === "subscription"
      );
    },
    wsLink,
    httpLink
  );

  apolloClient.setLink(splitLink);

  return (
    <ApolloProvider client={apolloClient}>
      <Outlet />
    </ApolloProvider>
  );
}
