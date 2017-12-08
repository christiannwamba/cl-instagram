import React, { Component } from 'react';
import cloudinary from 'cloudinary-core';
import 'cloudinary-video-player';
import { Image, Transformation } from 'cloudinary-react';

import './Post.css';
import '../../node_modules/cloudinary-video-player/dist/cld-video-player.min.css';

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vDom: null
    };
    this.cl = cloudinary.Cloudinary.new({ cloud_name: 'christekh' });
    this.vDom = null;
    this.vPlayer = null;
  }

  componentDidMount() {
    if (this.vDom) {
      this.vPlayer = this.cl.videoPlayer(this.vDom, {
        transformation: {
          width: 687,
          height: 687,
          crop: 'pad'
        }
      });
      this.vPlayer.source(this.fetchPublicId(this.props.post.image));
    }
  }

  componentWillReceiveProps;

  isVideo = url => url.split('.')[url.split('.').length - 1] === 'mp4';

  fetchPublicId = url =>
    url.split('/')[url.split('/').length - 1].split('.')[0];

  render() {
    const { user: { nickname, avatar }, post: { image, caption } } = this.props;
    return (
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
            {this.isVideo(image) ? (
              <video
                controls
                // autoPlay
                loop
                id={this.vId}
                className="cld-video-player"
                ref={vDom => (this.vDom = vDom)}
              />
            ) : (
              <Image publicId={this.fetchPublicId(image)}>
                <Transformation
                  width="687"
                  height="687"
                  background="black"
                  crop="pad"
                  flags="progressive:steep"
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
  }
}

export default Post;
