import debugFactory from 'debug';

const errMessage = { error: 'Sorry, an error occurred on the server' };
const debug = debugFactory('vimeo:ajax');

export function get(opts) {
  const url = opts.url;
  const onSuccess = opts.onSuccess;
  const onError = opts.onError;
  let req;

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
    if (req.readyState !== 4 || req.status !== 200) { return; }
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
