

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Tabs, { Tab } from 'material-ui/Tabs';
import Currency from './Currency';
function TabContainer(props) {
    return <div style={{ padding: 20 }}>{props.children}</div>;
  }

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
  };

class CurrencyTabs extends React.Component {
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
      <Paper style={{backgroundColor: '#EAEBEC', width: '90%', margin:'auto'}}>
        <Tabs
          value={value}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Bitcoin" />
          <Tab label="Ethereum" />
          <Tab label="Litecoin" />
        </Tabs>
        {value === 0 && <TabContainer>{<Currency currencyType="BTC-USD"/>}</TabContainer>}
        {value === 1 && <TabContainer>{<Currency currencyType="ETH-USD"/>}</TabContainer>}
        {value === 2 && <TabContainer>{<Currency currencyType="LTC-USD" />}</TabContainer>}
      </Paper>
    );
  }
}



export default CurrencyTabs;