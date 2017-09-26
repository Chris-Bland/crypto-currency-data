import React from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Tabs, { Tab } from 'material-ui/Tabs';

import CurrencyTabs from './CurrencyTabs/Index'

function TabContainer(props) {
  return <div style={{ padding: 20 }}>{props.children}</div>;
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
    }
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { value } = this.state;
    return (
      <div>
      <AppBar position="static">
      <Toolbar>
        <Typography type="title" color="inherit">
          WTF is Bitcoin at NOW?
        </Typography>
      </Toolbar>
    </AppBar>
    <AppBar position="static">
          <Tabs value={this.value} onChange={this.handleChange}>
            <Tab label="Dashboard" />
          </Tabs>
        </AppBar>
        {value === 0 && <TabContainer>{ <CurrencyTabs  />}</TabContainer>}

      </div>
    )
  }
}

export default App;
