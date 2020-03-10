import React, { useState, useEffect, useContext } from 'react';
import { VideoBox, AudioContextManager, ItemForm } from '..';

export default function UserVideo(props) {
  const [stream, setStream] = useState();
  const constraints = { audio: true, video: true };
  const ctx = useContext(AudioContextManager);

  const mute = () => {
    if (!stream) return false;
    stream.getAudioTracks().forEach(track => track.stop());
  };

  useEffect(() => {
    async function getUserStream() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia(
          constraints,
        );
        setStream(stream);

        console.log({ ctx });
        if (ctx && ctx.registerAudioTrack) {
          const track = stream.getAudioTracks()[0];
          ctx.registerAudioTrack({
            label: track.label,
            muted: track.muted,
            itemName: props.element.name,
          });
        }
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
