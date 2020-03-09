import React from 'react';

import styled from '@emotion/styled';
import { Rnd } from 'react-rnd';

import { VideoSourceElement } from '../..';

const VideoSourcesContainer = styled.div`
  border-radius: 5px;
  background-color: #666;
  color: white;
  width: 400px;
  position: absolute;
  bottom: 8px;
  border: 2px solid #666;

  .headline {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    text-align: center;
    background-color: #666;
    height: 15px;
    width: 100%;
  }
  .sourceList {
    background-color: #333;
    padding: 5px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-wrap: nowrap;
    margin: 5px 0;
  }
  .item {
    width: 100%;
    padding: 2px 0;
    display: block;
    text-indent: 5px;
    cursor: pointer;
  }
  .selected {
    background-color: blue;
  }
`;

export default function VideoSources({
  onAddItem,
  onRemoveItem,
  onSelectItem,
  elements,
}) {
  return (
    <Rnd
      bounds="parent"
      default={{
        x: 10,
        y: 500,
        width: 320,
        height: 200,
      }}
    >
      <VideoSourcesContainer>
        <div className="headline">Sources</div>
        <div className="sourceList">
          {elements.map(el => (
            <VideoSourceElement
              onClick={() => onSelectItem(el.id)}
              element={el}
            />
          ))}
        </div>
      </VideoSourcesContainer>
    </Rnd>
  );
}
