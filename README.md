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

`<Video>` component:

Property | Type | Default | Required | Description
-------- | ---- | ------- | -------- |-----------
videoId | `String` | none | yes | The video ID
onError | `Function` | noop | no | Callback function if the video can't be loaded

## License

MIT

See the [License](LICENSE.md) file.
