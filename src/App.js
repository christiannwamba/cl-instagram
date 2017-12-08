import React, { Component } from 'react';
import axios from 'axios';
import { CloudinaryContext } from 'cloudinary-react';
import { Events, scrollSpy } from 'react-scroll';

import Header from './Header';
import Posts from './Posts/index';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      offset: 1,
      limit: 4
    };
    this.baseUrl = 'http://localhost:8070/posts';
  }

  get constructFetchUrl() {
    const { offset, limit } = this.state;
    return `${this.baseUrl}?offset=${offset}&limit=${limit}`;
  }

  componentDidMount() {
    axios
      .get(this.constructFetchUrl)
      .then(({ data }) => this.setState({ posts: data }))
      .catch(err => console.log(err));
    Events.scrollEvent.register('end', function(to, element) {
      console.log('end', arguments);
    });
    scrollSpy.update()
  }

  componentWillUnmount() {
    Events.scrollEvent.remove('end');
  }

  render() {
    return (
      <div className="App">
        <CloudinaryContext cloudName="christekh">
          <Header />
          <section className="App-main">
            <Posts posts={this.state.posts} />
          </section>
        </CloudinaryContext>
      </div>
    );
  }
}

export default App;
