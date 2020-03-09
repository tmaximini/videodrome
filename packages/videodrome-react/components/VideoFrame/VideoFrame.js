import React, { useReducer } from 'react';

import styled from '@emotion/styled';
import {
  UserVideo,
  ElementInspector,
  VideoBox,
  VideoSources,
} from '../..';

const Frame = styled.div`
  width: 100%;
  height: 100%;
  background-color: #222;
`;

const Elements = [
  {
    id: 'abcde',
    name: 'cow',
    url: 'https://streamable.com/moo',
    width: 320,
    height: 200,
    x: 0,
    y: 0,
    zIndex: 1,
    type: 'video',
    selected: true,
  },
  {
    id: 'abasddsa',
    name: 'dog',
    url: 'https://streamable.com/ifjh',
    width: 320,
    height: 200,
    x: 200,
    y: 200,
    zIndex: 2,
    type: 'video',
  },
  {
    id: 'camera',
    name: 'webcam',
    width: 200,
    height: 200,
    x: 400,
    y: 0,
    zIndex: 3,
    type: 'userMedia',
  },
];

function reducer(state, action) {
  switch (action.type) {
    case 'setActive':
      const newElements = state.elements.map(item => ({
        ...item,
        selected: item.id === action.payload.id,
      }));
      return { elements: newElements };
    case 'resetSelection':
      return {
        elements: state.elements.map(el => ({
          ...el,
          selected: false,
        })),
      };
    case 'addItem':
      return {
        elements: [
          ...state.elements,
          {
            ...state.action.payload.item,
            zIndex: state.elements.length + 1,
          },
        ],
      };
    case 'removeItem':
      return {
        elements: state.elements.filter(
          item => item.id !== action.payload.id,
        ),
      };
    case 'updateItem':
      const index = state.elements.findIndex(
        item => item.id === action.payload.item.id,
      );

      if (index === undefined) {
        console.warn('index not found');
        return { elements: state.elements };
      }

      return {
        elements: [
          ...state.elements.slice(0, index),
          { ...state.elements[index], ...action.payload.item },
          ...state.elements.slice(index + 1, state.elements.length),
        ],
      };
    default:
      throw new Error();
  }
}

export default function VideoFrame() {
  const [state, dispatch] = useReducer(reducer, {
    elements: Elements,
  });

  const handleSelect = (e, el) => {
    e.stopPropagation();
    dispatch({ type: 'setActive', payload: { id: el.id } });
  };

  const resetSelection = () => dispatch({ type: 'resetSelection' });

  const getActiveElement = () =>
    state.elements.find(el => el.selected);

  const handleUpdateItem = item =>
    dispatch({ type: 'updateItem', payload: { item } });

  return (
    <Frame
      onMouseDown={() => {
        // reset selection on outside click
        resetSelection();
      }}
    >
      {state.elements.map((el, i) => {
        if (el.type === 'video') {
          return (
            <VideoBox
              element={el}
              key={`videoframe__child__${i}`}
              selected={el.selected}
              handleSelect={e => handleSelect(e, el)}
              handleUpdate={handleUpdateItem}
            />
          );
        } else {
          return (
            <UserVideo
              element={el}
              key={`videoframe__child__${i}`}
              selected={el.selected}
              handleSelect={e => handleSelect(e, el)}
              handleUpdate={handleUpdateItem}
            />
          );
        }
      })}
      <ElementInspector
        activeElement={getActiveElement()}
        handleUpdate={handleUpdateItem}
      />

      <VideoSources
        onAddItem={item =>
          dispatch({ type: 'addItem', payload: { item } })
        }
        onRemoveItem={id =>
          dispatch({ type: 'removeItem', payload: { id } })
        }
        onSelectItem={id =>
          dispatch({ type: 'setActive', payload: { id } })
        }
        handleUpdate={handleUpdateItem}
        elements={state.elements}
        activeElement={getActiveElement()}
      />
    </Frame>
  );
}
