# React Vimeo

[![NPM](https://nodei.co/npm/react-vimeo.png?downloads=true)](https://nodei.co/npm/react-vimeo/)

## Usage

```javascript
  var Vimeo = require('react-vimeo');

  React.render(
    <Vimeo videoId={ videoId } />,
    $mountNode
  );
```

To handle errors, you can pass a function to the `onError` prop:

```js
  function onError(err) {
    console.error(err);
  };

  React.render(
    <Vimeo onError={ onError } videoId={ videoId } />
    document.querySelector('#your-div')
  );
```

To automatically play the video on page load:

```javascript
  var Vimeo = require('react-vimeo');

  React.render(
    <Vimeo videoId={ videoId } autoplay={true} />,
    $mountNode
  );
```

## Behind the Scenes

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

This is a very simple structure to stylize however you want. So, if you are lost, don't panic, there is an [example live here](http://freecodecamp.github.io/react-vimeo/) that you can follow.

For more details, check out the API

## API

[API](docs/README.md)

## License

MIT

See the [License](LICENSE.md) file.
