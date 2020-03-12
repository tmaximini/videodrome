import React, { useState, useRef } from 'react';
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
    props.selected ? '1px dashed #a68e8e' : '1px solid transparent'};

  &:hover {
    border: 1px dashed #a68e8e;
    background-color: rgba(255, 255, 255, 0.2);
  }

  iframe {
    display: ${props => (props.isDragging ? 'none' : 'block')};
  }
`;

export default function VideoBox({
  element: {
    id,
    url,
    x,
    y,
    width,
    height,
    zIndex,
    showControls,
    lockAspectRatio,
  },
  handleSelect,
  handleUpdate,
  selected,
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);

  const videoRef = useRef(null);

  return (
    <Rnd
      default={{
        x,
        y,
        width,
        height,
      }}
      onMouseDown={handleSelect}
      onDragStart={() => setIsDragging(true)}
      onResizeStart={() => setIsResizing(true)}
      onResizeStop={() => setIsResizing(false)}
      onDragStop={(e, item) => {
        console.info(videoRef.current.getInternalPlayer());

        handleUpdate({
          x: item.x,
          y: item.y,
          id,
          videoWidth: videoRef.current.getInternalPlayer()
            .clientWidth,
          videoHeight: videoRef.current.getInternalPlayer()
            .clientHeight,
        });
        setIsDragging(false);
      }}
      onResizeStop={(e, direction, ref, delta, position) => {
        handleUpdate({
          width: parseInt(ref.clientWidth),
          height: parseInt(ref.clientHeight),
          videoWidth: videoRef.current.getInternalPlayer()
            .clientWidth,
          videoHeight: videoRef.current.getInternalPlayer()
            .clientHeight,
          id,
        });
        setIsResizing(false);
      }}
      style={{ zIndex: isDragging ? 1000 : zIndex }}
      lockAspectRatio={lockAspectRatio}
    >
      <VideoContainer
        isDragging={isDragging}
        isResizing={isResizing}
        selected={selected}
        id={id}
      >
        <ReactPlayer
          ref={videoRef}
          url={url}
          playing
          loop
          controls={showControls}
          muted
          height={'100%'}
          width={'100%'}
        />
      </VideoContainer>
    </Rnd>
  );
}
