import React from 'react';
import logo from './logo.svg';
import './App.css';
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
        <div>
          <h2>My first Apollo app 🚀</h2>
        </div>
        <Search />
      </ApolloProvider>
    );
}

export default App;
