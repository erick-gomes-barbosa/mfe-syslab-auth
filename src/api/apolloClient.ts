import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { nhostConfig } from "./nhost";

// Montagem da URL manualmente com base no subdomínio e região
const graphqlUrl = `https://${nhostConfig.subdomain}.hasura.${nhostConfig.region}.nhost.run/v1/graphql`;

export const apolloPublicClient = new ApolloClient({
  link: new HttpLink({
    uri: graphqlUrl,
    headers: {
      "x-hasura-role": "anon",
      "x-hasura-admin-secret": "6QcQljD@@0-86A#th6@H5OWkc25,y6oG",
      "X-hasura-user-id": null,
    },
  }),
  cache: new InMemoryCache(),
});
