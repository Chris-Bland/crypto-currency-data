import React from 'react';
import Bitcoin from './Bitcoin'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {

    return (
      <div>Hellur
      <Bitcoin  />
      </div>
    )
  }
}

export default App;
