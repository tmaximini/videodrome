import * as React from 'react';
import { CanvasContext } from '../';
import { calculateSize } from '../../lib/utils';

function CanvasCamera({ element }) {
  const canvasCtx = React.useContext(CanvasContext);

  let requestId = null;

  React.useEffect(() => {
    const video = canvasCtx.cameraRef.current;
    const canvas = canvasCtx.canvas;

    function draw() {
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, window.innerHeight, window.innerWidth);
      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        ctx.drawImage(
          video,
          element.x,
          element.y,
          element.videoWidth || element.width,
          element.videoHeight || element.height,
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
export default CanvasCamera;
