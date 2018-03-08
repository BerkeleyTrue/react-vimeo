import PropTypes from 'prop-types';
import React, { cloneElement } from 'react';
import keyMirror from 'keymirror';
import jsonp from 'jsonp';
import debugFactory from 'debug';

import PlayButton from './Play-Button';
import Spinner from './Spinner';

const debug = debugFactory('vimeo:player');
const noop = () => {};
const playerEvents = keyMirror({
  cueChange: null,
  ended: null,
  loaded: null,
  pause: null,
  play: null,
  progress: null,
  seeked: null,
  textTrackChange: null,
  timeUpdate: null,
  volumeChange: null
});

function capitalize(str = '') {
  return str.charAt(0).toUpperCase() + str.substring(1);
}

function getFuncForEvent(event, props) {
  return props['on' + capitalize(event)] || (() => {});
}

function post(method, value, player, playerOrigin) {
  try {
    player.contentWindow.postMessage({ method, value }, playerOrigin);
  } catch (err) {
    return err;
  }
  return null;
}

export default class extends React.Component {
  static displayName = 'Vimeo';

  static propTypes = {
    autoplay: PropTypes.bool,
    className: PropTypes.string,
    loading: PropTypes.element,
    playButton: PropTypes.node,
    playerOptions: PropTypes.object,
    videoId: PropTypes.string.isRequired,

    // event callbacks
    onCueChange: PropTypes.func,
    onEnded: PropTypes.func,
    onError: PropTypes.func,
    onLoaded: PropTypes.func,
    onPause: PropTypes.func,
    onPlay: PropTypes.func,
    onProgress: PropTypes.func,
    onReady: PropTypes.func,
    onSeeked: PropTypes.func,
    onTextTrackChanged: PropTypes.func,
    onTimeUpdate: PropTypes.func,
    onVolumeChange: PropTypes.func
  };

  static defaultProps = (function() {
    const defaults = Object.keys(playerEvents)
      .concat(['ready'])
      .reduce((defaults, event) => {
        defaults['on' + capitalize(event)] = noop;
        return defaults;
      }, {});

    defaults.className = 'vimeo';
    defaults.playerOptions = { autoplay: 1 };
    defaults.autoplay = false;
    return defaults;
  })();

  state = {
    imageLoaded: false,
    playerOrigin: '*',
    showingVideo: this.props.autoplay,
    thumb: null
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.videoId !== this.props.videoId) {
      this.setState({
        thumb: null,
        imageLoaded: false,
        showingVideo: false
      });
    }
  }

  componentDidMount() {
    this.fetchVimeoData();
  }

  componentDidUpdate() {
    this.fetchVimeoData();
  }

  componentWillUnmount() {
    const removeEventListener = typeof window !== 'undefined' ?
      ::window.removeEventListener :
      noop;

    removeEventListener('message', this.onMessage);
  }

  addMessageListener = () => {
    const addEventListener = typeof window !== 'undefined' ?
      ::window.addEventListener :
      noop;

    addEventListener('message', this.onMessage);
  };

  onError = (err) => {
    if (this.props.onError) {
      this.props.onError(err);
    }
    throw err;
  };

  onMessage = ({ origin, data }) => {
    const { onReady } = this.props;
    const { playerOrigin } = this.state;

    if (playerOrigin === '*') {
      this.setState({
        playerOrigin: origin
      });
    }

    // Handle messages from the vimeo player only
    if (!(/^https?:\/\/player.vimeo.com/).test(origin)) {
      return false;
    }

    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (err) {
        debug('error parsing message', err);
        data = { event: '' };
      }
    }

    if (data.event === 'ready') {
      debug('player ready');
      this.onReady(
        this._player,
        playerOrigin === '*' ? origin : playerOrigin
      );
      return onReady(data);
    }
    if (!data.event) {
      // we get messages when the first event callbacks are added to the frame
      return;
    }
    debug('firing event: ', data.event);
    getFuncForEvent(data.event, this.props)(data);
  };

  onReady = (player, playerOrigin) => {
    Object.keys(playerEvents).forEach(event => {
      var err = post(
        'addEventListener',
        event.toLowerCase(),
        player,
        playerOrigin
      );
      if (err) {
        this.onError(err);
      }
    });
  };

  playVideo = (e) => {
    e.preventDefault();
    this.setState({ showingVideo: true });
  };

  getIframeUrl = () => {
    const { videoId } = this.props;
    const query = this.getIframeUrlQuery();
    return `//player.vimeo.com/video/${videoId}?${query}`;
  };

  getIframeUrlQuery = () => {
    let str = [];
    Object.keys(this.props.playerOptions).forEach(key => {
      str.push(`${key}=${this.props.playerOptions[key]}`);
    });

    return str.join('&');
  };

  fetchVimeoData = () => {
    if (this.state.imageLoaded) {
      return;
    }
    const id = this.props.videoId;

    jsonp(
      `//vimeo.com/api/v2/video/${id}.json`,
      {
        prefix: 'vimeo'
      },
      (err, res) => {
        if (err) {
          debug('jsonp err: ', err.message);
          this.onError(err);
        }
        debug('jsonp response', res);
        this.setState({
          thumb: res[0].thumbnail_large,
          imageLoaded: true
        });
      }
    );
  };

  renderImage = () => {
    if (this.state.showingVideo || !this.state.imageLoaded) {
      return;
    }

    const style = {
      backgroundImage: `url(${this.state.thumb})`,
      display: !this.state.showingVideo ? 'block' : 'none',
      height: '100%',
      width: '100%'
    };

    const playButton = this.props.playButton ?
      cloneElement(this.props.playButton, { onClick: this.playVideo }) :
      <PlayButton onClick={ this.playVideo } />;

    return (
      <div
        className='vimeo-image'
        style={ style }>
        {playButton}
      </div>
    );
  };

  renderIframe = () => {
    if (!this.state.showingVideo) {
      return;
    }

    this.addMessageListener();

    const embedVideoStyle = {
      display: this.state.showingVideo ? 'block' : 'none',
      height: '100%',
      width: '100%'
    };

    return (
      <div
        className='vimeo-embed'
        style={ embedVideoStyle }>
        <iframe
          frameBorder='0'
          ref={el => {
            this._player = el;
          }}
          src={ this.getIframeUrl() } />
      </div>
    );
  };

  renderLoading = (imageLoaded, loadingElement) => {
    if (imageLoaded) {
      return;
    }
    if (loadingElement) {
      return loadingElement;
    }
    return (
      <Spinner />
    );
  };

  render() {
    return (
      <div className={ this.props.className } >
        { this.renderLoading(this.state.imageLoaded, this.props.loading) }
        { this.renderImage() }
        { this.renderIframe() }
      </div>
    );
  }
}
