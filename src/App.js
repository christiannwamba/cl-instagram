import React, { Component } from 'react';

import Header from './Header';
import Posts from './Posts/index';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <section className="App-main">
          <Posts />
        </section>
      </div>
    );
  }
}

export default App;
