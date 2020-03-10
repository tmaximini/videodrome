import React, { useState, useEffect } from 'react';
import { VideoBox } from '../..';

export default function ScreenCapture(props) {
  const [stream, setStream] = useState();

  useEffect(() => {
    async function getDisplayStream() {
      let captureStream = null;
      try {
        console.info('yo');
        captureStream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
          audio: false,
        });

        console.info({ captureStream });

        setStream(captureStream);
        /* use the stream */
      } catch (err) {
        /* handle the error */
      }
    }

    getDisplayStream();
  }, []);

  const { element, ...rest } = props;

  console.info('capture', stream);

  return stream ? (
    <VideoBox element={{ ...props.element, url: stream }} {...rest} />
  ) : (
    <></>
  );
}
