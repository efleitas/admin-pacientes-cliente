import React, { Component } from 'react';
import Content from './Content.js';

class App extends Component {
  render() {
    const {children}=this.props;
    return (
      <div>
        <Content body={children} />
      </div>
    );
  }
}

export default App;
