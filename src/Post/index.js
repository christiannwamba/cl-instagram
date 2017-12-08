import React from 'react';
import './Post.css';

const Post = () => (
  <article className="Post">
    <header>
      <div className="Post-user">
        <div className="Post-user-avatar">
          <img
            class="_rewi8"
            src="https://instagram.flos6-1.fna.fbcdn.net/t51.2885-19/s150x150/14727482_199282753814164_8390284987160592384_a.jpg"
          />
        </div>
        <div className="Post-user-nickname">
          <span>ogrant718</span>
        </div>
      </div>
    </header>
    <div className="Post-image">
      <div className="Post-image-bg">
        <img
          src="https://instagram.flos6-1.fna.fbcdn.net/t51.2885-15/e35/24845932_1757866441186546_5996861590417178624_n.jpg"
          alt=""
        />
      </div>
    </div>
    <div className="Post-caption">
      <strong>ogrant718</strong> Drops at midnight
    </div>
  </article>
);

export default Post;
