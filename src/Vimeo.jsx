import React, { PropTypes } from 'react';
import debugFactory from 'debug';

import PlayButton from './Play-Button';
import Spinner from './Spinner';

import { get } from './ajax';

const debug = debugFactory('vimeo:player');

export default React.createClass({
  displayName: 'Vimeo',

  propTypes: {
    className: PropTypes.string,
    loading: PropTypes.element,
    onError: PropTypes.func,
    playButton: PropTypes.node,
    videoId: PropTypes.string.isRequired
  },

  getDefaultProps() {
    return {
      className: 'vimeo'
    };
  },

  getInitialState() {
    return {
      thumb: null,
      imageLoaded: false,
      showingVideo: false
    };
  },

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.className !== this.props.className ||
      nextProps.videoId !== this.props.videoId
    ) {
      this.setState({
        thumb: null,
        imageLoaded: false,
        showingVideo: false
      });
    }
  },

  componentDidMount() {
    this.fetchVimeoData();
  },

  componentDidUpdate() {
    this.fetchVimeoData();
  },

  playVideo(e) {
    e.preventDefault();
    this.setState({ showingVideo: true });
  },

  getIframeUrl() {
    return `//player.vimeo.com/video/${this.props.videoId}?autoplay=1`;
  },

  fetchVimeoData() {
    if (this.state.imageLoaded) {
      return;
    }
    const id = this.props.videoId;

    get({
      url: `//vimeo.com/api/v2/video/${id}.json`,
      onSuccess: (res) => {
        debug('ajax response', res);
        this.setState({
          thumb: res[0].thumbnail_large,
          imageLoaded: true
        });
      },
      onError: this.props.onError || (() => {})
    });
  },

  renderImage() {
    if (this.state.showingVideo || !this.state.imageLoaded) {
      return;
    }

    const style = {
      backgroundImage: `url(${this.state.thumb})`,
      display: !this.state.showingVideo ? 'block' : 'none',
      height: '100%',
      width: '100%'
    };

    return (
      <div className='vimeo-image' style={ style }>
        <PlayButton onClick={ this.playVideo } />
      </div>
    );
  },

  renderIframe() {
    if (!this.state.showingVideo) {
      return;
    }

    const embedVideoStyle = {
      display: this.state.showingVideo ? 'block' : 'none',
      height: '100%',
      width: '100%'
    };

    return (
      <div className='vimeo-embed' style={ embedVideoStyle }>
        <iframe frameBorder='0' src={ this.getIframeUrl() }></iframe>
      </div>
    );
  },

  renderLoading(imageLoaded, loadingElement) {
    if (imageLoaded) {
      return;
    }
    if (loadingElement) {
      return loadingElement;
    }
    return (
      <Spinner />
    );
  },

  render() {
    return (
      <div className={ this.props.className } >
        { this.renderLoading(this.state.imageLoaded, this.props.loading) }
        { this.renderImage() }
        { this.renderIframe() }
      </div>
    );
  }
});
