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

  render() {
    const { value } = this.state;
    return (
      <div>
      <AppBar position="static" style={{backgroundColor: '#136ACD'}}>
      <Toolbar>
        <Typography type="title" style={{backgroundColor:'#136ACD', color:"white"}}>
          crypto watch
        </Typography>
      </Toolbar>
    </AppBar>
    <AppBar position="static" style={{backgroundColor:'#136ACD'}} >
          <Tabs  value={value} >
            <Tab label="Dashboard" />
          </Tabs>
        </AppBar>
        <TabContainer>{ <CurrencyTabs  />}</TabContainer>

      </div>
    )
  }
}

export default App;
