# API

```jsx
Interface props {
  autoplay?: Boolean = false,
  className?: String = 'vimeo',
  loading?: ReactElement = <Spinner />,
  playButton?: ReactElement = <PlayButton />,
  playerOptions?: Object = { autoplay: 1 },
  videoId: String,

  onCueChange?(data?: Object) => Void,
  onEnded?(data?: Object) => Void,
  onError?(data?: Object) => Void,
  onLoaded?(data?: Object) => Void,
  onPause?(data?: Object) => Void,
  onPlay?(data?: Object) => Void,
  onProgress?(data?: Object) => Void,
  onReady?(data?: Object) => Void,
  onSeeked?(data?: Object) => Void,
  onTextTrackChanged?(data?: Object) => Void,
  onTimeUpdate?(data?: Object) => Void,
  onVolumeChange?(data?: Object) => Void
};
```

### autoplay?: Boolean = false
If true, video will automatically play

### className?: String
`className` applied to wrapping div

### loading?: ReactElement
Provide a custom element loading element.

### playButton?: ReactElement
Provide a custom play button element. This element will be cloned and a
`onClick` prop is added to manage starting the video

### playerOptions?: Object
Object of player options as specified in Vimeo Player docs: https://developer.vimeo.com/player/embedding#universal-parameters. Will get appended to iframe URL

### videoId: String
The Vimeo video ID. This property is required

### onCueChange?(data: Object) => Void
Called when the active cue for the current text track changes.
It also fires when the active text track changes.
There may be multiple cues active.

### onEnded?(data: Object) => Void
Called when video reaches the end

### onError?(data: Object) => Void
Called in the event that there is an error.
If no error handler provided, the error will be thrown.

### onLoaded?(data: Object) => Void
Called when a new video is loaded in the player.

### onPause?(data: Object) => Void
Called when video is paused

### onPlay?(data: Object) => Void
Called when video is played

### onProgress?(data: Object) => Void
Called as the video is loaded.
Reports back the amount of the video that has been buffered.

### onReady?(data: Object) => Void
Called when video has loaded and is ready to play.
Other event functions will not be called before this one other than onError

### onSeeked?(data: Object) => Void
Called when the player seeks to a specific time.
`onTimeUpdate` will also be called at the same time.

### onTextTrackChanged?(data: Object) => Void
Triggered when the active text track (captions/subtitles) changes.
The values will be null if text tracks are turned off.

### onTimeUpdate?(data: Object) => Void
Called as the current time of the video updates. It generally fires every 250ms, but it may vary depending on the browser.

### onVolumeChange?(data: Object) => Void
Triggered when the volume in the player changes.
Some devices do not support setting the volume of the video independently from the system volume,
so this event will never fire on those devices.
