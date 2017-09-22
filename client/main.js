import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import ApolloClient from 'apollo-client';
import { meteorClientConfig } from 'meteor/apollo';
import { ApolloProvider } from 'react-apollo';

import App from '/imports/ui/App';

const client = new ApolloClient(meteorClientConfig());

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#36404d'
  },
})

Meteor.startup(() => {
  render(
    <ApolloProvider client={client}>
      <MuiThemeProvider muiTheme={muiTheme}>
        <App />
      </MuiThemeProvider>
    </ApolloProvider>,
    document.getElementById('app')
  );
});
