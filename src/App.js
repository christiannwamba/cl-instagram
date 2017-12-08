import React, { Component } from 'react';

import Header from './Header';
import Post from './Post/index';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <section className="App-main">
          <Post />
        </section>
      </div>
    );
  }
}

export default App;
