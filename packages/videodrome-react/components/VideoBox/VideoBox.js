import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import { Rnd } from 'react-rnd';

import styled from '@emotion/styled';

import 'react-resizable/css/styles.css';

const VideoContainer = styled.div`
  overflow: hidden;
  padding: 10px;
  display: inline-block;
  width: 100%;
  height: 100%;
  border: ${props =>
    props.isDragging || props.isResizing || props.selected
      ? '1px dashed red'
      : '1px solid transparent'};

  &:hover {
    border: 1px dashed red;
    background-color: rgba(255, 255, 255, 0.3);
  }

  iframe {
    display: ${props => (props.isDragging ? 'none' : 'block')};
  }
`;

export default function VideoBox({
  videoUrl,
  x,
  y,
  handleSelected,
  selected,
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);

  return (
    <Rnd
      bounds="parent"
      default={{
        x: x || 0,
        y: y || 0,
        width: 320,
        height: 200,
      }}
      onMouseDown={handleSelected}
      onDragStart={() => setIsDragging(true)}
      onResizeStart={() => setIsResizing(true)}
      onResizeStop={() => setIsResizing(false)}
      onDragStop={() => {
        setIsDragging(false);
      }}
      style={{ zIndex: selected ? 100 : 1 }}
    >
      <VideoContainer
        isDragging={isDragging}
        isResizing={isResizing}
        selected={selected}
      >
        <ReactPlayer
          url={videoUrl || 'https://streamable.com/moo'}
          playing
          loop
          controls={false}
          muted
          height={'100%'}
          width={'100%'}
        />
      </VideoContainer>
    </Rnd>
  );
}
