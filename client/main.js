import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import React from 'react';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
const theme = createMuiTheme();
import ApolloClient from 'apollo-client';
import { meteorClientConfig } from 'meteor/apollo';
import { ApolloProvider } from 'react-apollo';

import App from '/imports/ui/App';

const client = new ApolloClient(meteorClientConfig());



Meteor.startup(() => {
  render(
    <ApolloProvider client={client}>
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </ApolloProvider>,
    document.getElementById('app')
  );
});
