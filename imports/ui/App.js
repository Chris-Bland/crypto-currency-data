import React from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Tabs, { Tab } from 'material-ui/Tabs';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';

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
      <div className='desktop' style={{backgroundColor: '#424242'}}>
        <AppBar position="static" style={{ backgroundColor: '#136ACD' }}>
          <Toolbar>
            <Typography type="title" style={{ backgroundColor: '#136ACD', color: "white" }}>
              crypto watch
        </Typography>
        <Button color="contrast" style={{float:'right'}}>Login</Button>
          </Toolbar>
        </AppBar>
        <AppBar position="static" style={{ backgroundColor: '#136ACD' }} >
          <Tabs value={value} >
            <Tab label="Dashboard" />
          </Tabs>
        </AppBar>
        <TabContainer style={{ backgroundColor: '#EAEBEC' }}>{<CurrencyTabs />}</TabContainer>

      </div>
    )
  }
}

export default App;
