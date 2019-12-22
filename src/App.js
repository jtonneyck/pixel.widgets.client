import React from 'react';
import logo from './logo.svg';
import './App.scss';
import ApolloClient from 'apollo-boost';
import { gql } from "apollo-boost";
import { ApolloProvider } from '@apollo/react-hooks';
import {Search} from "./components";

const client = new ApolloClient({
  uri: process.env.REACT_APP_base_url,
});

function App() {
  return (
      <ApolloProvider client={client}>
        <Search />
      </ApolloProvider>
    );
}

export default App;
