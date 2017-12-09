import React from 'react';
import Post from '../Post';
import './Posts.css';

const loader = <div className="loader">Loading ...</div>;
const Posts = ({ posts, loadPosts, hasMorePosts }) => (
  <div className="Posts">
      {posts.map(post => <Post {...post} key={post.id} />)}
  </div>
);

export default Posts;
