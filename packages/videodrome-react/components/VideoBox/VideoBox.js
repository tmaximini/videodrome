import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import { Rnd } from 'react-rnd';

import styled from '@emotion/styled';

import 'react-resizable/css/styles.css';

const VideoContainer = styled.div`
  overflow: hidden;
  padding: 10px;
  background-color: ${props =>
    props.dragging ? '#272746' : 'black'};
  display: inline-block;
  width: 100%;
  height: 100%;

  iframe {
    display: ${props => (props.dragging ? 'none' : 'block')};
  }
`;

export default function VideoBox({ videoUrl, x, y }) {
  const [dragging, setDragging] = useState(false);
  const [width, setWidth] = useState(320);
  const [height, setHeight] = useState(200);

  return (
    <Rnd
      bounds="parent"
      default={{
        x: x || 0,
        y: y || 0,
        width: 320,
        height: 200,
      }}
      onDragStart={() => setDragging(true)}
      onDragStop={() => setDragging(false)}
      onResizeStop={(e, direction, ref, delta, position) => {
        setWidth(ref.style.width);
        setHeight(ref.style.height);
      }}
    >
      <VideoContainer dragging={dragging}>
        <ReactPlayer
          url={videoUrl || 'https://streamable.com/moo'}
          playing
          loop
          controls={false}
          muted
          height={height}
          width={width}
        />
      </VideoContainer>
    </Rnd>
  );
}
