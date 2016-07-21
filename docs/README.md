
# API

```js
Interface props {
    videoId: String,
    className?: String = 'vimeo',
    playerOptions?: Object = { autoplay: 1 },
    onReady?(data?: Object) => Void,
    onCuechange?(data?: Object) => Void,
    onError?(data?: Object) => Void,
    onFinish?(data?: Object) => Void,
    onLoadProgress?(data?: Object) => Void,
    onPause?(data?: Object) => Void,
    onPlay?(data?: Object) => Void,
    onPlayProgress?(data?: Object) => Void,
    onSeek?(data?: Object) => Void
};
```

## videoId: String
The Vimeo video ID

## className: String
`className` applied to wrapping div

## playerOptions: Object
Object of player options as specified in Vimeo Player docs: https://developer.vimeo.com/player/embedding#universal-parameters. Will get appended to iframe URL

## onReady?(data: Object) => Void
Called when video has loaded and is ready to play.
Other event functions will not be called before this one other than onError


## onCuechange?(data: Object) => Void
Called when the player que changes.

## onError?(data: Object) => Void
Called in the event that there is an error.
If no error handler provided, the error will be thrown.

## onFinish?(data: Object) => Void
Called when video completes

## onLoadProgress?(data: Object) => Void
Called when part of video has loaded

## onPause?(data: Object) => Void
Called when video is paused

## onPlay?(data: Object) => Void
Called when video is played

## onPlayProgress?(data: Object) => Void
Called when video play has progressed

## onSeek?(data: Object) => Void
Called when user seeks ahead in video

Interactive api (play/pause actions, seek to `n`, etc..) to come in future versions
