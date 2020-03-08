import React, { useState, useEffect } from 'react';
import { VideoBox } from '../..';

export default function UserVideo(props) {
  const [stream, setStream] = useState();
  const constraints = { audio: true, video: true };

  useEffect(() => {
    async function getUserStream() {
      try {
        setStream(
          await navigator.mediaDevices.getUserMedia(constraints),
        );
        /* use the stream */
      } catch (err) {
        /* handle the error */
      }
    }

    getUserStream();
  }, []);

  return stream ? <VideoBox url={stream} {...props} /> : <></>;
}
