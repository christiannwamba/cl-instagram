import React from 'react';
import './Post.css';
import cloudinary from 'cloudinary-core';
import { Image, Transformation, Video } from 'cloudinary-react';
var cl = cloudinary.Cloudinary.new({ cloud_name: 'christekh' });

const isVideo = url => url.split('.')[url.split('.').length - 1] === 'mp4';
const fetchPublicId = url =>
  url.split('/')[url.split('/').length - 1].split('.')[0];
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
            controls
            loop
            src={cl
              .url(fetchPublicId(image), {
                width: 687,
                height: 687,
                crop: 'pad',
                background: 'black'
              })
              .replace('image', 'video')}
          />
        ) : (
          <Image publicId={fetchPublicId(image)}>
            <Transformation
              width="687"
              height="687"
              background="black"
              crop="pad"
            />
          </Image>
        )}
      </div>
    </div>
    <div className="Post-caption">
      <strong>{nickname}</strong> {caption}
    </div>
  </article>
);

export default Post;
