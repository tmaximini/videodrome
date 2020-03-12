import * as React from 'react';
import { CanvasContext } from '../';
import { calculateSize } from '../../lib/utils';

function App() {
  const canvasCtx = React.useContext(CanvasContext);

  let requestId = null;

  React.useEffect(() => {
    const video = canvasCtx.cameraRef.current;
    const canvas = canvasCtx.canvas;

    function draw() {
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, window.innerHeight, window.innerWidth);
      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        const videoSize = {
          width: video.videoWidth,
          height: video.videoHeight,
        };
        const canvasSize = {
          width: canvas.width,
          height: canvas.height,
        };
        const renderSize = calculateSize(videoSize, canvasSize);
        const xOffset = (canvasSize.width - renderSize.width) / 2;
        ctx.drawImage(
          video,
          xOffset,
          0,
          renderSize.width,
          renderSize.height,
        );
      }
      requestId = requestAnimationFrame(draw);
    }

    if (canvas && video) {
      if (navigator.mediaDevices.getUserMedia) {
        const successCallback = function(stream) {
          canvasCtx.cameraRef.current.srcObject = stream;
          requestAnimationFrame(draw);
        };
        const errorCallback = function(error) {
          console.log(error);
        };
        navigator.mediaDevices
          .getUserMedia({
            audio: false,
            video: { facingMode: 'environment' },
          })
          .then(successCallback, errorCallback);
      }
    }

    return () => {
      console.log('unbinding');
      window.cancelAnimationFrame(requestId);
    };
  });

  return null;
}
export default App;
