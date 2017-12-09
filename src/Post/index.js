import React, { Component } from 'react';
import cloudinary from 'cloudinary-core';
import 'cloudinary-video-player';

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
        autoplayMode: 'on-scroll',
        transformation: {
          width: 687,
          height: 687,
          crop: 'pad'
        }
      });
      this.vPlayer.source(this.fetchPublicId(this.props.post.image));
      this.vPlayer.fluid(true);
    }
  }

  mutePlayer = e => this.vDom && this.vPlayer.mute();

  unMutePlayer = e => this.vDom && this.vPlayer.unmute();

  isVideo = url => url.split('.')[url.split('.').length - 1] === 'mp4';

  fetchPublicId = url =>
    url.split('/')[url.split('/').length - 1].split('.')[0];

  render() {
    const { user: { nickname, avatar }, post: { image, caption } } = this.props;
    return (
      <article className="Post" ref="Post">
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
          <div
            className="Post-image-bg"
            onMouseEnter={this.mutePlayer}
            onMouseLeave={this.unMutePlayer}
          >
            {this.isVideo(image) ? (
              <video
                controls
                loop
                id={this.vId}
                className="cld-video-player vjs-controls-disabled"
                ref={vDom => (this.vDom = vDom)}
              />
            ) : (
              <img alt={caption} src={this.cl.url(this.fetchPublicId(image), {
                width: 687,
                height: 687,
                crop: 'pad',
                flags: 'progressive:steep',
                quality: 'auto'
              })} />
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
