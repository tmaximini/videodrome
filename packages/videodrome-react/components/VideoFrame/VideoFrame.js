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
    selected: true,
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
  // {
  //   id: 'c',
  //   width: 200,
  //   height: 200,
  //   x: 400,
  //   y: 0,
  //   zIndex: 3,
  //   type: 'userMedia',
  // },
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
    default:
      throw new Error();
  }
}

export default function VideoFrame() {
  const [state, dispatch] = useReducer(reducer, {
    elements: Elements,
  });

  const handleSelected = (e, el) => {
    e.stopPropagation();
    dispatch({ type: 'setActive', payload: { id: el.id } });
  };

  const getActiveElement = () =>
    state.elements.find(el => el.selected);

  return (
    <Frame
    // onMouseDown={() => {
    //   // reset selection on outside click
    //   resetSelection();
    // }}
    >
      {state.elements.map((el, i) => {
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
      <ElementInspector activeElement={getActiveElement()} />

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
        elements={state.elements}
        activeElement={getActiveElement()}
      />

      {/* <AddItemForm /> */}
    </Frame>
  );
}
