/*
 * React-Vimeo - React component to load video from Vimeo
 * @version v0.0.3
 * @link https://github.com/freecodecamp/react-vimeo
 * @license MIT
 * @author Berkeley Martinez (https://github.com/berkeleytrue)
*/

(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["ReactVimeo"] = factory(require("react"));
	else
		root["ReactVimeo"] = factory(root["React"]);
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

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _keymirror = __webpack_require__(8);

	var _keymirror2 = _interopRequireDefault(_keymirror);

	var _debug = __webpack_require__(2);

	var _debug2 = _interopRequireDefault(_debug);

	var _PlayButton = __webpack_require__(3);

	var _PlayButton2 = _interopRequireDefault(_PlayButton);

	var _Spinner = __webpack_require__(4);

	var _Spinner2 = _interopRequireDefault(_Spinner);

	var _ajax = __webpack_require__(5);

	var debug = (0, _debug2['default'])('vimeo:player');
	var noop = function noop() {};
	var playerEvents = (0, _keymirror2['default'])({
	  cuechange: null,
	  finish: null,
	  loadProgress: null,
	  pause: null,
	  play: null,
	  playProgress: null,
	  seek: null
	});

	function capitalize(str) {
	  return str.charAt(0).toUpperCase() + str.substring(1);
	}

	function getFuncForEvent(event, props) {
	  return props['on' + capitalize(event)];
	}

	function post(method, value, player, playerOrigin) {
	  player.contentWindow.postMessage({ method: method, value: value }, playerOrigin);
	  return player;
	}

	exports['default'] = _react2['default'].createClass({
	  displayName: 'Vimeo',

	  propTypes: {
	    className: _react.PropTypes.string,
	    loading: _react.PropTypes.element,
	    onCuechange: _react.PropTypes.func,
	    onError: _react.PropTypes.func,
	    onFinish: _react.PropTypes.func,
	    onLoadProgress: _react.PropTypes.func,
	    onPause: _react.PropTypes.func,
	    onPlay: _react.PropTypes.func,
	    onPlayProgress: _react.PropTypes.func,
	    onReady: _react.PropTypes.func,
	    onSeek: _react.PropTypes.func,
	    playButton: _react.PropTypes.node,
	    videoId: _react.PropTypes.string.isRequired
	  },

	  getDefaultProps: function getDefaultProps() {
	    var defaults = Object.keys(playerEvents).concat(['ready']).reduce(function (defaults, event) {
	      defaults['on' + capitalize(event)] = noop;
	      return defaults;
	    }, {});

	    defaults.className = 'vimeo';
	    return defaults;
	  },

	  getInitialState: function getInitialState() {
	    return {
	      imageLoaded: false,
	      playerOrigin: '*',
	      showingVideo: false,
	      thumb: null
	    };
	  },

	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    if (nextProps.videoId !== this.props.videoId) {
	      this.setState({
	        thumb: null,
	        imageLoaded: false,
	        showingVideo: false
	      });
	    }
	  },

	  componentDidMount: function componentDidMount() {
	    this.fetchVimeoData();
	  },

	  componentDidUpdate: function componentDidUpdate() {
	    this.fetchVimeoData();
	  },

	  componentWillUnmount: function componentWillUnmount() {
	    var removeEventListener = typeof window !== 'undefined' ? window.removeEventListener.bind(window) : noop;

	    removeEventListener('message', this.onMessage);
	  },

	  addMessageListener: function addMessageListener() {
	    var addEventListener = typeof window !== 'undefined' ? window.addEventListener.bind(window) : noop;

	    addEventListener('message', this.onMessage);
	  },

	  onMessage: function onMessage(e) {
	    var onReady = this.props.onReady;
	    var playerOrigin = this.state.playerOrigin;

	    if (playerOrigin === '*') {
	      this.setState({
	        playerOrigin: e.origin
	      });
	    }

	    // Handle messages from the vimeo player only
	    if (!/^https?:\/\/player.vimeo.com/.test(e.origin)) {
	      return false;
	    }

	    var dats = JSON.parse(e.data);

	    if (dats.event === 'ready') {
	      var player = _react2['default'].findDOMNode(this.refs.player);
	      debug('player ready');
	      this.onReady(player, playerOrigin === '*' ? e.origin : playerOrigin);
	      return onReady(dats);
	    }

	    var potentialFunc = getFuncForEvent(dats.event, this.props);

	    if (typeof potentialFunc === 'function') {
	      potentialFunc(dats);
	    }
	  },

	  onReady: function onReady(player, playerOrigin) {
	    Object.keys(playerEvents).forEach(function (event) {
	      post('addEventListener', event, player, playerOrigin);
	    });
	  },

	  playVideo: function playVideo(e) {
	    e.preventDefault();
	    this.setState({ showingVideo: true });
	  },

	  getIframeUrl: function getIframeUrl() {
	    return '//player.vimeo.com/video/' + this.props.videoId + '?autoplay=1';
	  },

	  fetchVimeoData: function fetchVimeoData() {
	    var _this = this;

	    if (this.state.imageLoaded) {
	      return;
	    }
	    var id = this.props.videoId;

	    (0, _ajax.get)({
	      url: '//vimeo.com/api/v2/video/' + id + '.json',
	      onSuccess: function onSuccess(res) {
	        debug('ajax response', res);
	        _this.setState({
	          thumb: res[0].thumbnail_large,
	          imageLoaded: true
	        });
	      },
	      onError: this.props.onError || function () {}
	    });
	  },

	  renderImage: function renderImage() {
	    if (this.state.showingVideo || !this.state.imageLoaded) {
	      return;
	    }

	    var style = {
	      backgroundImage: 'url(' + this.state.thumb + ')',
	      display: !this.state.showingVideo ? 'block' : 'none',
	      height: '100%',
	      width: '100%'
	    };

	    return _react2['default'].createElement(
	      'div',
	      {
	        className: 'vimeo-image',
	        style: style },
	      _react2['default'].createElement(_PlayButton2['default'], { onClick: this.playVideo })
	    );
	  },

	  renderIframe: function renderIframe() {
	    if (!this.state.showingVideo) {
	      return;
	    }

	    this.addMessageListener();

	    var embedVideoStyle = {
	      display: this.state.showingVideo ? 'block' : 'none',
	      height: '100%',
	      width: '100%'
	    };

	    return _react2['default'].createElement(
	      'div',
	      {
	        className: 'vimeo-embed',
	        style: embedVideoStyle },
	      _react2['default'].createElement('iframe', {
	        frameBorder: '0',
	        ref: 'player',
	        src: this.getIframeUrl() })
	    );
	  },

	  renderLoading: function renderLoading(imageLoaded, loadingElement) {
	    if (imageLoaded) {
	      return;
	    }
	    if (loadingElement) {
	      return loadingElement;
	    }
	    return _react2['default'].createElement(_Spinner2['default'], null);
	  },

	  render: function render() {
	    return _react2['default'].createElement(
	      'div',
	      { className: this.props.className },
	      this.renderLoading(this.state.imageLoaded, this.props.loading),
	      this.renderImage(),
	      this.renderIframe()
	    );
	  }
	});
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * This is the web browser implementation of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */

	exports = module.exports = __webpack_require__(6);
	exports.log = log;
	exports.formatArgs = formatArgs;
	exports.save = save;
	exports.load = load;
	exports.useColors = useColors;
	exports.storage = 'undefined' != typeof chrome
	               && 'undefined' != typeof chrome.storage
	                  ? chrome.storage.local
	                  : localstorage();

	/**
	 * Colors.
	 */

	exports.colors = [
	  'lightseagreen',
	  'forestgreen',
	  'goldenrod',
	  'dodgerblue',
	  'darkorchid',
	  'crimson'
	];

	/**
	 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
	 * and the Firebug extension (any Firefox version) are known
	 * to support "%c" CSS customizations.
	 *
	 * TODO: add a `localStorage` variable to explicitly enable/disable colors
	 */

	function useColors() {
	  // is webkit? http://stackoverflow.com/a/16459606/376773
	  return ('WebkitAppearance' in document.documentElement.style) ||
	    // is firebug? http://stackoverflow.com/a/398120/376773
	    (window.console && (console.firebug || (console.exception && console.table))) ||
	    // is firefox >= v31?
	    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
	    (navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31);
	}

	/**
	 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
	 */

	exports.formatters.j = function(v) {
	  return JSON.stringify(v);
	};


	/**
	 * Colorize log arguments if enabled.
	 *
	 * @api public
	 */

	function formatArgs() {
	  var args = arguments;
	  var useColors = this.useColors;

	  args[0] = (useColors ? '%c' : '')
	    + this.namespace
	    + (useColors ? ' %c' : ' ')
	    + args[0]
	    + (useColors ? '%c ' : ' ')
	    + '+' + exports.humanize(this.diff);

	  if (!useColors) return args;

	  var c = 'color: ' + this.color;
	  args = [args[0], c, 'color: inherit'].concat(Array.prototype.slice.call(args, 1));

	  // the final "%c" is somewhat tricky, because there could be other
	  // arguments passed either before or after the %c, so we need to
	  // figure out the correct index to insert the CSS into
	  var index = 0;
	  var lastC = 0;
	  args[0].replace(/%[a-z%]/g, function(match) {
	    if ('%%' === match) return;
	    index++;
	    if ('%c' === match) {
	      // we only are interested in the *last* %c
	      // (the user may have provided their own)
	      lastC = index;
	    }
	  });

	  args.splice(lastC, 0, c);
	  return args;
	}

	/**
	 * Invokes `console.log()` when available.
	 * No-op when `console.log` is not a "function".
	 *
	 * @api public
	 */

	function log() {
	  // this hackery is required for IE8/9, where
	  // the `console.log` function doesn't have 'apply'
	  return 'object' === typeof console
	    && console.log
	    && Function.prototype.apply.call(console.log, console, arguments);
	}

	/**
	 * Save `namespaces`.
	 *
	 * @param {String} namespaces
	 * @api private
	 */

	function save(namespaces) {
	  try {
	    if (null == namespaces) {
	      exports.storage.removeItem('debug');
	    } else {
	      exports.storage.debug = namespaces;
	    }
	  } catch(e) {}
	}

	/**
	 * Load `namespaces`.
	 *
	 * @return {String} returns the previously persisted debug modes
	 * @api private
	 */

	function load() {
	  var r;
	  try {
	    r = exports.storage.debug;
	  } catch(e) {}
	  return r;
	}

	/**
	 * Enable namespaces listed in `localStorage.debug` initially.
	 */

	exports.enable(load());

	/**
	 * Localstorage attempts to return the localstorage.
	 *
	 * This is necessary because safari throws
	 * when a user disables cookies/localstorage
	 * and you attempt to access it.
	 *
	 * @return {LocalStorage}
	 * @api private
	 */

	function localstorage(){
	  try {
	    return window.localStorage;
	  } catch (e) {}
	}


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/* eslint-disable max-len */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	exports['default'] = _react2['default'].createClass({
	  displayName: 'PlayButton',

	  propTypes: {
	    onClick: _react2['default'].PropTypes.func
	  },

	  render: function render() {
	    return _react2['default'].createElement(
	      'button',
	      {
	        className: 'vimeo-play-button',
	        onClick: this.props.onClick,
	        type: 'button' },
	      _react2['default'].createElement(
	        'svg',
	        {
	          version: '1.1',
	          viewBox: '0 0 100 100',
	          xmlns: 'http://www.w3.org/2000/svg' },
	        _react2['default'].createElement('path', { d: 'M79.674,53.719c2.59-2.046,2.59-5.392,0-7.437L22.566,1.053C19.977-0.993,18,0.035,18,3.335v93.331c0,3.3,1.977,4.326,4.566,2.281L79.674,53.719z' })
	      )
	    );
	  }
	});
	module.exports = exports['default'];

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/* eslint-disable max-len */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	exports['default'] = _react2['default'].createClass({
	  displayName: 'Spinner',

	  render: function render() {
	    return _react2['default'].createElement(
	      'div',
	      { className: 'vimeo-loading' },
	      _react2['default'].createElement(
	        'svg',
	        {
	          height: '32',
	          viewBox: '0 0 32 32',
	          width: '32',
	          xmlns: 'http://www.w3.org/2000/svg' },
	        _react2['default'].createElement('path', {
	          d: 'M16 0 A16 16 0 0 0 16 32 A16 16 0 0 0 16 0 M16 4 A12 12 0 0 1 16 28 A12 12 0 0 1 16 4',
	          opacity: '.25' }),
	        _react2['default'].createElement('path', { d: 'M16 0 A16 16 0 0 1 32 16 L28 16 A12 12 0 0 0 16 4z' })
	      )
	    );
	  }
	});
	module.exports = exports['default'];

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.get = get;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _debug = __webpack_require__(2);

	var _debug2 = _interopRequireDefault(_debug);

	var errMessage = { error: 'Sorry, an error occurred on the server' };
	var debug = (0, _debug2['default'])('vimeo:ajax');

	function get(opts) {
	  var url = opts.url;
	  var onSuccess = opts.onSuccess;
	  var onError = opts.onError;
	  var req = undefined;

	  try {
	    req = new XMLHttpRequest();
	  } catch (e) {
	    req = new XDomainRequest();
	  }

	  // XDomainRequest onload
	  // ie 8-9 support
	  function oldIE() {
	    onSuccess(JSON.parse(req.responseText));
	  }

	  // XMLHttpRequest onload
	  function onReadyStateChange() {
	    if (req.readyState !== 4 || req.status !== 200) {
	      return;
	    }
	    return onSuccess(JSON.parse(req.responseText));
	  }

	  function errHandler(err) {
	    debug('error occured fetching video data', err);
	    return onError(errMessage);
	  }

	  req.onreadystatechange = onReadyStateChange;
	  req.onload = oldIE;
	  req.onerror = errHandler;
	  req.open('GET', url, true);
	  req.send();

	  return req.abort.bind(req);
	}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * This is the common logic for both the Node.js and web browser
	 * implementations of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */

	exports = module.exports = debug;
	exports.coerce = coerce;
	exports.disable = disable;
	exports.enable = enable;
	exports.enabled = enabled;
	exports.humanize = __webpack_require__(7);

	/**
	 * The currently active debug mode names, and names to skip.
	 */

	exports.names = [];
	exports.skips = [];

	/**
	 * Map of special "%n" handling functions, for the debug "format" argument.
	 *
	 * Valid key names are a single, lowercased letter, i.e. "n".
	 */

	exports.formatters = {};

	/**
	 * Previously assigned color.
	 */

	var prevColor = 0;

	/**
	 * Previous log timestamp.
	 */

	var prevTime;

	/**
	 * Select a color.
	 *
	 * @return {Number}
	 * @api private
	 */

	function selectColor() {
	  return exports.colors[prevColor++ % exports.colors.length];
	}

	/**
	 * Create a debugger with the given `namespace`.
	 *
	 * @param {String} namespace
	 * @return {Function}
	 * @api public
	 */

	function debug(namespace) {

	  // define the `disabled` version
	  function disabled() {
	  }
	  disabled.enabled = false;

	  // define the `enabled` version
	  function enabled() {

	    var self = enabled;

	    // set `diff` timestamp
	    var curr = +new Date();
	    var ms = curr - (prevTime || curr);
	    self.diff = ms;
	    self.prev = prevTime;
	    self.curr = curr;
	    prevTime = curr;

	    // add the `color` if not set
	    if (null == self.useColors) self.useColors = exports.useColors();
	    if (null == self.color && self.useColors) self.color = selectColor();

	    var args = Array.prototype.slice.call(arguments);

	    args[0] = exports.coerce(args[0]);

	    if ('string' !== typeof args[0]) {
	      // anything else let's inspect with %o
	      args = ['%o'].concat(args);
	    }

	    // apply any `formatters` transformations
	    var index = 0;
	    args[0] = args[0].replace(/%([a-z%])/g, function(match, format) {
	      // if we encounter an escaped % then don't increase the array index
	      if (match === '%%') return match;
	      index++;
	      var formatter = exports.formatters[format];
	      if ('function' === typeof formatter) {
	        var val = args[index];
	        match = formatter.call(self, val);

	        // now we need to remove `args[index]` since it's inlined in the `format`
	        args.splice(index, 1);
	        index--;
	      }
	      return match;
	    });

	    if ('function' === typeof exports.formatArgs) {
	      args = exports.formatArgs.apply(self, args);
	    }
	    var logFn = enabled.log || exports.log || console.log.bind(console);
	    logFn.apply(self, args);
	  }
	  enabled.enabled = true;

	  var fn = exports.enabled(namespace) ? enabled : disabled;

	  fn.namespace = namespace;

	  return fn;
	}

	/**
	 * Enables a debug mode by namespaces. This can include modes
	 * separated by a colon and wildcards.
	 *
	 * @param {String} namespaces
	 * @api public
	 */

	function enable(namespaces) {
	  exports.save(namespaces);

	  var split = (namespaces || '').split(/[\s,]+/);
	  var len = split.length;

	  for (var i = 0; i < len; i++) {
	    if (!split[i]) continue; // ignore empty strings
	    namespaces = split[i].replace(/\*/g, '.*?');
	    if (namespaces[0] === '-') {
	      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
	    } else {
	      exports.names.push(new RegExp('^' + namespaces + '$'));
	    }
	  }
	}

	/**
	 * Disable debug output.
	 *
	 * @api public
	 */

	function disable() {
	  exports.enable('');
	}

	/**
	 * Returns true if the given mode name is enabled, false otherwise.
	 *
	 * @param {String} name
	 * @return {Boolean}
	 * @api public
	 */

	function enabled(name) {
	  var i, len;
	  for (i = 0, len = exports.skips.length; i < len; i++) {
	    if (exports.skips[i].test(name)) {
	      return false;
	    }
	  }
	  for (i = 0, len = exports.names.length; i < len; i++) {
	    if (exports.names[i].test(name)) {
	      return true;
	    }
	  }
	  return false;
	}

	/**
	 * Coerce `val`.
	 *
	 * @param {Mixed} val
	 * @return {Mixed}
	 * @api private
	 */

	function coerce(val) {
	  if (val instanceof Error) return val.stack || val.message;
	  return val;
	}


/***/ },
/* 7 */
/***/ function(module, exports) {

	/**
	 * Helpers.
	 */

	var s = 1000;
	var m = s * 60;
	var h = m * 60;
	var d = h * 24;
	var y = d * 365.25;

	/**
	 * Parse or format the given `val`.
	 *
	 * Options:
	 *
	 *  - `long` verbose formatting [false]
	 *
	 * @param {String|Number} val
	 * @param {Object} options
	 * @return {String|Number}
	 * @api public
	 */

	module.exports = function(val, options){
	  options = options || {};
	  if ('string' == typeof val) return parse(val);
	  return options.long
	    ? long(val)
	    : short(val);
	};

	/**
	 * Parse the given `str` and return milliseconds.
	 *
	 * @param {String} str
	 * @return {Number}
	 * @api private
	 */

	function parse(str) {
	  str = '' + str;
	  if (str.length > 10000) return;
	  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str);
	  if (!match) return;
	  var n = parseFloat(match[1]);
	  var type = (match[2] || 'ms').toLowerCase();
	  switch (type) {
	    case 'years':
	    case 'year':
	    case 'yrs':
	    case 'yr':
	    case 'y':
	      return n * y;
	    case 'days':
	    case 'day':
	    case 'd':
	      return n * d;
	    case 'hours':
	    case 'hour':
	    case 'hrs':
	    case 'hr':
	    case 'h':
	      return n * h;
	    case 'minutes':
	    case 'minute':
	    case 'mins':
	    case 'min':
	    case 'm':
	      return n * m;
	    case 'seconds':
	    case 'second':
	    case 'secs':
	    case 'sec':
	    case 's':
	      return n * s;
	    case 'milliseconds':
	    case 'millisecond':
	    case 'msecs':
	    case 'msec':
	    case 'ms':
	      return n;
	  }
	}

	/**
	 * Short format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */

	function short(ms) {
	  if (ms >= d) return Math.round(ms / d) + 'd';
	  if (ms >= h) return Math.round(ms / h) + 'h';
	  if (ms >= m) return Math.round(ms / m) + 'm';
	  if (ms >= s) return Math.round(ms / s) + 's';
	  return ms + 'ms';
	}

	/**
	 * Long format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */

	function long(ms) {
	  return plural(ms, d, 'day')
	    || plural(ms, h, 'hour')
	    || plural(ms, m, 'minute')
	    || plural(ms, s, 'second')
	    || ms + ' ms';
	}

	/**
	 * Pluralization helper.
	 */

	function plural(ms, n, name) {
	  if (ms < n) return;
	  if (ms < n * 1.5) return Math.floor(ms / n) + ' ' + name;
	  return Math.ceil(ms / n) + ' ' + name + 's';
	}


/***/ },
/* 8 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 */

	"use strict";

	/**
	 * Constructs an enumeration with keys equal to their value.
	 *
	 * For example:
	 *
	 *   var COLORS = keyMirror({blue: null, red: null});
	 *   var myColor = COLORS.blue;
	 *   var isColorValid = !!COLORS[myColor];
	 *
	 * The last line could not be performed if the values of the generated enum were
	 * not equal to their keys.
	 *
	 *   Input:  {key1: val1, key2: val2}
	 *   Output: {key1: key1, key2: key2}
	 *
	 * @param {object} obj
	 * @return {object}
	 */
	var keyMirror = function(obj) {
	  var ret = {};
	  var key;
	  if (!(obj instanceof Object && !Array.isArray(obj))) {
	    throw new Error('keyMirror(...): Argument must be an object.');
	  }
	  for (key in obj) {
	    if (!obj.hasOwnProperty(key)) {
	      continue;
	    }
	    ret[key] = key;
	  }
	  return ret;
	};

	module.exports = keyMirror;


/***/ }
/******/ ])
});
;