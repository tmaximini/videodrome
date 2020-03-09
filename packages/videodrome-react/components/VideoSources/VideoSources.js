import React from 'react';

import styled from '@emotion/styled';

import {
  VideoSourceElement,
  VideoSourceControls,
  ControlsContainer,
} from '../..';

const VideoSourcesContainer = styled.div`
  .sourceList {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-wrap: nowrap;
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

  .controls {
    position: absolute;
    bottom: 5px;
    button {
      margin: 2px;
      border: 0;
    }
  }
`;

export default function VideoSources({
  onAddItem,
  onRemoveItem,
  onSelectItem,
  elements,
  activeElement,
  handleUpdate,
}) {
  const sortByZIndex = (a, b) => {
    if (a.zIndex > b.zIndex) return -1;
    if (b.zIndex > a.zIndex) return 1;
    return 0;
  };

  return (
    <ControlsContainer title="Sources" offset={150}>
      <VideoSourcesContainer>
        <div className="sourceList">
          {elements.sort(sortByZIndex).map(el => (
            <VideoSourceElement
              key={el.id}
              onClick={() => onSelectItem(el.id)}
              element={el}
            />
          ))}
        </div>
        <VideoSourceControls
          addItem={onAddItem}
          removeItem={onRemoveItem}
          activeElement={activeElement}
          handleUpdate={handleUpdate}
        />
      </VideoSourcesContainer>
    </ControlsContainer>
  );
}
