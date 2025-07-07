import React, { Suspense, useEffect } from "react";
import { ApolloProvider } from "@apollo/client";
import { apolloPublicClient } from "./api/apolloClient";
import AuthPage from "./pages";

export default function App() {
  return (
    <React.StrictMode>
      <ApolloProvider client={apolloPublicClient}>
        <AuthPage />
      </ApolloProvider>
    </React.StrictMode>
  );
}
