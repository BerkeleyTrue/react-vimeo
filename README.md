# React Vimeo

![Git release](http://img.shields.io/github/release/freecodecamp/react-vimeo.svg?style=flat)

## Usage

```javascript
  var Vimeo = require('react-vimeo');

  React.render(
    <Vimeo videoId={ videoId } />,
    $mountNode
  );
```

To handle errors when something happens, like your video can't be loaded, you can pass a callback with a prop `onError` in the component:

```javascript
  function onError(err) {
    console.log(err);
  };

  React.render(
    <Video onError={ onError } videoId={ videoId } />
    document.querySelector('#your-div')
  );
```

If you decide to use just Javascript without any module loader, you can get the global variable `window.ReactVimeo` *(or just `ReactVimeo`)*:

## Behind the Scene

There are some things that you should know about the component. The first one is the structure created inside by the component if you wish to stylize it.

So, the semantic HTML structure will be something like this:

```html
  <div class='vimeo'>
    <div class='vimeo-loading'>
      <svg>...</svg>
    </div>
    <div class='vimeo-image'>
      <button type='button' class='vimeo-play-button'>
        <svg>...</svg>
      </button>
    </div>
    <div class='video-embed'>
      <iframe>...</iframe>
    </div>
  </div>
```

This is a very simple structure to stylize however you want. So, if you are lost, don't panic, there is a [real functional example](/example) that you can follow.

For more details, check out the API below.

## Component API

`<Vimeo>` component:

Property | Type | Default | Required | Description
-------- | ---- | ------- | -------- |-----------
className | string | 'vimeo' | no | className applied to wrapping div
onCuechange | func | noop | no | called when the player que changes
onError | func | noop | no | called if the video metadata (thumbnail) can't be loaded
onFinish | func | noop | no | called when video completes
onLoadProgress | func | noop | no | called when part of video has loaded
onPause | func | noop | no | called when video is paused
onPlay | func | noop | no | called when video is played
onPlayProgress | func | noop | no | called when video play has progressed
onReady | func | noop | no | called when video has loaded and is ready to play. other event functions will not be called before this one other than onError 
onSeek | func | noop | no | called when user seeks ahead in video
videoId | string | none | yes | The vimeo ID

Interactive api (play/pause actions, seek to `n`, etc..) to come in future versions


## License

MIT

See the [License](LICENSE.md) file.
