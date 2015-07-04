/*
 * React Video - React component to load video from Vimeo or Youtube across any device
 * @version v1.5.3
 * @link https://github.com/pedronauck/react-video
 * @license MIT
 * @author Pedro Nauck (https://github.com/pedronauck)
*/

(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["ReactVideo"] = factory(require("react"));
	else
		root["ReactVideo"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(1);
	var classSet = __webpack_require__(2);
	var ajax = __webpack_require__(3);
	var PlayButton = __webpack_require__(4);
	var Spinner = __webpack_require__(5);

	module.exports = React.createClass({
	  displayName: 'Video',
	  propTypes: {
	    from: React.PropTypes.oneOf(['youtube', 'vimeo']),
	    videoId: React.PropTypes.string.isRequired,
	    onError: React.PropTypes.func
	  },
	  getDefaultProps: function getDefaultProps() {
	    return {
	      className: 'video'
	    };
	  },
	  getInitialState: function getInitialState() {
	    return {
	      thumb: null,
	      imageLoaded: false,
	      showingVideo: false
	    };
	  },
	  isYoutube: function isYoutube() {
	    return this.props.from === 'youtube' || isNaN(this.props.videoId);
	  },
	  isVimeo: function isVimeo() {
	    return this.props.from === 'vimeo' || !isNaN(this.props.videoId);
	  },
	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    if (nextProps.className !== this.props.className || nextProps.from !== this.props.from || nextProps.videoId !== this.props.videoId) {
	      this.setState({
	        thumb: null,
	        imageLoaded: false,
	        showingVideo: false
	      });
	    }
	  },
	  componentDidMount: function componentDidMount() {
	    if (!this.state.imageLoaded) {
	      this.isYoutube() && this.fetchYoutubeData();
	      this.isVimeo() && this.fetchVimeoData();
	    }
	  },
	  componentDidUpdate: function componentDidUpdate() {
	    if (!this.state.imageLoaded) {
	      this.isYoutube() && this.fetchYoutubeData();
	      this.isVimeo() && this.fetchVimeoData();
	    }
	  },
	  render: function render() {
	    return React.createElement(
	      'div',
	      { className: this.props.className },
	      !this.state.imageLoaded && React.createElement(Spinner, null),
	      this.renderImage(),
	      this.renderIframe()
	    );
	  },
	  renderImage: function renderImage() {
	    var style = {
	      backgroundImage: 'url(' + this.state.thumb + ')'
	    };

	    if (this.state.imageLoaded && !this.state.showingVideo) {
	      return React.createElement(
	        'div',
	        { className: 'video-image', style: style },
	        React.createElement(PlayButton, { onClick: this.playVideo })
	      );
	    }
	  },
	  renderIframe: function renderIframe() {
	    var embedVideoStyle = {
	      display: this.state.showingVideo ? 'block' : 'none',
	      width: '100%',
	      height: '100%'
	    };

	    if (this.state.showingVideo) {
	      return React.createElement(
	        'div',
	        { className: 'video-embed', style: embedVideoStyle },
	        React.createElement('iframe', { frameBorder: '0', src: this.getIframeUrl() })
	      );
	    }
	  },
	  playVideo: function playVideo(ev) {
	    this.setState({ showingVideo: true });
	    ev.preventDefault();
	  },
	  getIframeUrl: function getIframeUrl() {
	    if (this.isYoutube()) {
	      return '//youtube.com/embed/' + this.props.videoId + '?autoplay=1';
	    } else if (this.isVimeo()) {
	      return '//player.vimeo.com/video/' + this.props.videoId + '?autoplay=1';
	    }
	  },
	  fetchYoutubeData: function fetchYoutubeData() {
	    var id = this.props.videoId;
	    var that = this;

	    ajax.get({
	      url: '//gdata.youtube.com/feeds/api/videos/' + id + '?v=2&alt=json',
	      onSuccess: function onSuccess(err, res) {
	        var gallery = res.entry['media$group']['media$thumbnail'];
	        var thumb = gallery.sort(function (a, b) {
	          return b.width - a.width;
	        })[0].url;

	        that.setState({
	          thumb: thumb,
	          imageLoaded: true
	        });
	      },
	      onError: that.props.onError
	    });
	  },
	  fetchVimeoData: function fetchVimeoData() {
	    var id = this.props.videoId;
	    var that = this;

	    ajax.get({
	      url: '//vimeo.com/api/v2/video/' + id + '.json',
	      onSuccess: function onSuccess(err, res) {
	        that.setState({
	          thumb: res[0].thumbnail_large,
	          imageLoaded: true
	        });
	      },
	      onError: that.props.onError
	    });
	  }
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports) {

	/**
	 * Produces the same result as React.addons.classSet
	 * @param  {object} classes
	 * @return {string}
	 *
	 * @author Ciro S. Costa <https://github.com/cirocosta>
	 */

	'use strict';

	var _arguments = arguments;
	module.exports = function (classes) {
	  return typeof classes !== 'object' ? Array.prototype.join.call(_arguments, ' ') : Object.keys(classes).filter(function (className) {
	    return classes[className];
	  }).join(' ');
	};

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	exports.get = function (opts) {
	  var url = opts.url;
	  var successCb = opts.onSuccess;
	  var errorCb = opts.onError;
	  var req = false;

	  // XDomainRequest onload
	  var _oldIE = function _oldIE() {
	    successCb(null, JSON.parse(req.responseText));
	  };

	  // XMLHttpRequest onload
	  var _onLoad = function _onLoad() {
	    if (req.readyState !== 4) return;
	    if (req.status === 200) successCb(null, JSON.parse(req.responseText));else {
	      var err = { error: 'Sorry, an error ocurred on the server' };

	      if (errorCb && typeof errorCb === 'function') return errorCb(err);
	      successCb(err, null);
	    }
	  };

	  var _onError = function _onError() {
	    var err = { error: 'Sorry, an error ocurred on the server' };

	    if (errorCb && typeof errorCb === 'function') return errorCb(err);
	    successCb(err, null);
	  };

	  try {
	    req = new XDomainRequest();
	    req.onload = _oldIE;
	  } catch (e) {
	    req = new XMLHttpRequest();
	    req.onreadystatechange = _onLoad;
	  }

	  req.onerror = _onError;
	  req.open('GET', url, true);
	  req.send();
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(1);

	module.exports = React.createClass({
	  displayName: 'exports',

	  propTypes: {
	    onClick: React.PropTypes.func
	  },
	  render: function render() {
	    return React.createElement(
	      'button',
	      { type: 'button', className: 'video-play-button', onClick: this.props.onClick },
	      React.createElement(
	        'svg',
	        { xmlns: 'http://www.w3.org/2000/svg', version: '1.1', viewBox: '0 0 100 100' },
	        React.createElement('path', { d: 'M79.674,53.719c2.59-2.046,2.59-5.392,0-7.437L22.566,1.053C19.977-0.993,18,0.035,18,3.335v93.331c0,3.3,1.977,4.326,4.566,2.281L79.674,53.719z' })
	      )
	    );
	  }
	});

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(1);

	module.exports = React.createClass({
	  displayName: 'exports',

	  render: function render() {
	    return React.createElement(
	      'div',
	      { className: 'video-loading' },
	      React.createElement(
	        'svg',
	        { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 32 32', width: '32', height: '32' },
	        React.createElement('path', { opacity: '.25', d: 'M16 0 A16 16 0 0 0 16 32 A16 16 0 0 0 16 0 M16 4 A12 12 0 0 1 16 28 A12 12 0 0 1 16 4' }),
	        React.createElement('path', { d: 'M16 0 A16 16 0 0 1 32 16 L28 16 A12 12 0 0 0 16 4z' })
	      )
	    );
	  }
	});

/***/ }
/******/ ])
});
;