import React, { Component } from 'react';
import axios from 'axios';
import { CloudinaryContext } from 'cloudinary-react';

import Header from './Header';
import Posts from './Posts/index';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      offset: 1,
      limit: 3,
      clientCount: 3,
      serverCount: 0,
      hasMorePosts: false
    };
    this.fetching = false;
    this.baseUrl = 'http://localhost:8070/posts';
    window.addEventListener('scroll', () => {
      if (
        this.bottomVisible &&
        this.fetching === false &&
        this.state.hasMorePosts
      ) {
        this.loadPosts(this.state.offset, this.state.limit);
      }
    });
  }

  constructFetchUrl(offset, limit) {
    return `${this.baseUrl}?offset=${offset}&limit=${limit}`;
  }

  componentDidMount() {
    this.loadPosts(this.state.offset, this.state.limit);
  }

  shouldComponentUpdate(nextProps) {
    console.log('scroll deb',this.fetching);
    return this.fetching;
  }

  get bottomVisible() {
    const scrollY = window.scrollY;
    const visible = document.documentElement.clientHeight;
    const pageHeight = document.documentElement.scrollHeight;
    const bottomOfPage = visible + scrollY >= pageHeight;
    return bottomOfPage || pageHeight < visible;
  }

  loadPosts(offset, limit) {
    this.fetching = true;
    axios
      .get(this.constructFetchUrl(offset, limit))
      .then(({ data: { posts, count } }) => {
        console.log(
          'scroll deb',
          this.state.hasMorePosts,
          count,
          this.state.clientCount
        );
        this.setState(
          {
            posts: [...this.state.posts, ...posts],
            serverCount: count,
            hasMorePosts: this.state.clientCount < count ? true : false,
            offset: this.state.offset + this.state.limit,
            clientCount: this.state.clientCount + 3
          },
          () => {
            this.fetching = false;
          }
        );
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="App">
        <CloudinaryContext cloudName="christekh">
          <Header />
          <section className="App-main">
            <Posts
              loadPosts={this.loadPosts.bind(
                this,
                this.state.offset,
                this.state.limit
              )}
              hasMorePosts={this.state.hasMorePosts}
              posts={this.state.posts}
            />
          </section>
        </CloudinaryContext>
      </div>
    );
  }
}

export default App;
