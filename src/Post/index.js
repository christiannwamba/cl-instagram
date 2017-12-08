import React from 'react';
import './Post.css';

const isVideo = url => url.split('.')[url.split('.').length - 1] === 'mp4';

const Post = ({ user: { nickname, avatar }, post: { image, caption } }) => (
  <article className="Post">
    <header>
      <div className="Post-user">
        <div className="Post-user-avatar">
          <img src={avatar} alt={nickname} />
        </div>
        <div className="Post-user-nickname">
          <span>{nickname}</span>
        </div>
      </div>
    </header>
    <div className="Post-image">
      <div className="Post-image-bg">
        {isVideo(image) ? (
          <video
            className=""
            playsInline
            poster="http://via.placeholder.com/800x800"
            preload="none"
            controls
            src={image}
            type="video/mp4"
          />
        ) : (
          <img
            src={image}
            alt=""
          />
        )}
      </div>
    </div>
    <div className="Post-caption">
      <strong>{nickname}</strong> {caption}
    </div>
  </article>
);

export default Post;
