import React, { useState, useEffect } from 'react';
import { VideoBox } from '..';

export default function UserVideo(props) {
  const [stream, setStream] = useState();
  const constraints = { audio: true, video: true };

  const mute = () => {
    if (!stream) return false;
    stream.getAudioTracks().forEach(track => track.stop());
  };

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

  const { element, ...rest } = props;

  return stream ? (
    <VideoBox
      element={{
        ...props.element,
        url: stream,
      }}
      controls={{ mute }}
      {...rest}
    />
  ) : (
    <></>
  );
}
