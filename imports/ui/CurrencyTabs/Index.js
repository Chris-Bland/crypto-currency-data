

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Tabs, { Tab } from 'material-ui/Tabs';
import Bitcoin from './Bitcoin';
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
    console.log("VALUE: ", value)
    return (
      <Paper >
        <Tabs
          value={this.value}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Bitcoin" />
          <Tab label="Ethereum" />
          <Tab label="Litecoin" />
        </Tabs>
        {value === 0 && <TabContainer>{<Bitcoin />}</TabContainer>}
        {value === 1 && <TabContainer>{'Ethereum'}</TabContainer>}
        {value === 2 && <TabContainer>{'Litecoin'}</TabContainer>}
      </Paper>
    );
  }
}



export default CurrencyTabs;