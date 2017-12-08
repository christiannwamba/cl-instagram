import React from 'react';
import Post from '../Post';
import './Posts.css';

const Posts = () => (
  <div className="Posts">
    {([1, 2, 3]).map(v => <Post />)}
  </div>
);

export default Posts;
