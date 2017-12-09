import React from 'react';
// import InfiniteScroll from '../../dist/InfiniteScroll';
import Post from '../Post';
import './Posts.css';

const loader = <div className="loader">Loading ...</div>;
const Posts = ({ posts, loadPosts, hasMorePosts }) => (
  <div className="Posts">
    {/* <InfiniteScroll
      pageStart={0}
      loadMore={loadPosts}
      hasMore={hasMorePosts}
      loader={loader}
    > */}
      {posts.map(post => <Post {...post} key={post.id} />)}
    {/* </InfiniteScroll> */}
  </div>
);

export default Posts;
