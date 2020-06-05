let stopTimeout = undefined;

browser.runtime.onMessage.addListener(request => {
  const p = document.getElementById('movie_player').wrappedJSObject;
  console.log(request);

  if (request.action === 'getCurrentTime') {
    const time = p.getCurrentTime();
    return Promise.resolve({response: Math.round(time)});
  }

  if (request.action === 'getVideoId') {
    const meta = p.getVideoData();
    return Promise.resolve({response: meta.video_id});
  }

  if (request.action === 'testVideoTimes') {
    console.log('testVideoTimes');
    console.log('seeking to: ' + request.startTime);
    p.seekTo(request.startTime, true);
    p.playVideo();
    const stopAfter = request.stopTime - request.startTime;
    console.log(`will stop after ${stopAfter} seconds`);
    if (stopTimeout) {
      console.log('clearTimeout');
      clearTimeout(stopTimeout);
    }
    stopTimeout = setTimeout(stopVideo, stopAfter*1000);
    function stopVideo() {
      console.log('stopping video');
      p.pauseVideo();
    }
    return Promise.resolve({response: 'test playing'});
  }

  if (request.action === 'startVideo') {
    p.playVideo();
    return Promise.resolve({response: 'video playing'});
  }
});

