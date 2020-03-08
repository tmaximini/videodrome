import React, { useState } from 'react';

import styled from '@emotion/styled';
import { UserVideo, VideoControlPanel, VideoBox } from '../..';

const Frame = styled.div`
  width: 100%;
  height: 100%;
  background-color: #ccc;
`;

const Elements = [
  {
    id: 'a',
    url: 'https://streamable.com/moo',
    width: 200,
    height: 200,
    x: 0,
    y: 0,
    zIndex: 1,
    type: 'video',
  },
  {
    id: 'b',
    url: 'https://streamable.com/ifjh',
    width: 200,
    height: 200,
    x: 200,
    y: 200,
    zIndex: 2,
    type: 'video',
  },
  {
    id: 'c',
    width: 200,
    height: 200,
    x: 400,
    y: 0,
    zIndex: 3,
    type: 'userMedia',
  },
];

export default function VideoFrame() {
  const [elements, setElements] = useState(Elements);

  const handleSelected = (e, el) => {
    e.stopPropagation();
    setElements(
      elements.map(item => ({
        ...item,
        selected: item.id === el.id,
      })),
    );
  };

  const resetSelection = () =>
    setElements(elements.map(el => ({ ...el, selected: false })));

  const getActiveElement = () => elements.find(el => el.selected);

  return (
    <Frame
    // onMouseDown={() => {
    //   // reset selection on outside click
    //   resetSelection();
    // }}
    >
      {Elements.map((el, i) => {
        if (el.type === 'video') {
          return (
            <VideoBox
              url={el.url}
              x={el.x}
              y={el.y}
              zIndex={el.zIndex}
              width={el.width}
              height={el.height}
              key={`videoframe__child__${i}`}
              selected={el.selected}
              handleSelected={e => handleSelected(e, el)}
            />
          );
        } else {
          return (
            <UserVideo
              x={el.x}
              y={el.y}
              zIndex={el.zIndex}
              width={el.width}
              height={el.height}
              key={`videoframe__child__${i}`}
              selected={el.selected}
              handleSelected={e => handleSelected(e, el)}
            />
          );
        }
      })}
      <VideoControlPanel activeElement={getActiveElement()} />
    </Frame>
  );
}
