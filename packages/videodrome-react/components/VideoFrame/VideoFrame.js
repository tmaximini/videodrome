import React, { useReducer, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

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

const persistState = state => {
  localStorage.setItem('videodrome', JSON.stringify(state));
};

const recoverState = () => {
  const state = localStorage.getItem('videodrome');

  return state ? JSON.parse(state) : { elements: [] };
};

export function reducer(_state, _action) {
  const handleStateUpdate = (state, action) => {
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
              ...action.payload.item,
              zIndex:
                action.payload.item.zIndex ||
                state.elements.length + 1,
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
      case 'createItem':
        return {
          elements: [...state.elements, { ...action.payload.item }],
        };

      case 'restoreState':
        return action.payload.state;
      default:
        throw new Error();
    }
  };

  const nextState = handleStateUpdate(_state, _action);
  persistState(nextState);
  return nextState;
}

export default function VideoFrame() {
  const [state, dispatch] = useReducer(reducer, {
    elements: [],
  });

  useEffect(() => {
    try {
      const stateFromStorage = recoverState();
      dispatch({
        type: 'restoreState',
        payload: { state: stateFromStorage },
      });
    } catch (err) {
      // handle err
    }
  }, []);

  const handleSelect = (e, el) => {
    e.stopPropagation();
    dispatch({ type: 'setActive', payload: { id: el.id } });
  };

  const resetSelection = () => dispatch({ type: 'resetSelection' });

  const getActiveElement = () =>
    state.elements.find(el => el.selected);

  const handleUpdateItem = item =>
    dispatch({ type: 'updateItem', payload: { item } });

  const handleCreateItem = item =>
    dispatch({ type: 'createItem', payload: { item } });

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
        handleCreate={handleCreateItem}
        elements={state.elements}
        activeElement={getActiveElement()}
      />
    </Frame>
  );
}
