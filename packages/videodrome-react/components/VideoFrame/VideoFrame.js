import React, { useReducer, useEffect, useState } from 'react';

import styled from '@emotion/styled';

import { Button, useDisclosure, Flex } from '@chakra-ui/core';

import {
  VideoBox,
  UserVideo,
  ScreenCapture,
  ElementInspector,
  VideoSources,
  ModalWindow,
  ItemForm,
} from '../..';

import {
  persistState,
  recoverState,
  generateEmptyItem,
} from '../../lib/utils';

const Frame = styled.div`
  width: 100%;
  height: 100%;
  background-color: #222;
`;

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

  // persist state to localstorage on every change
  const nextState = handleStateUpdate(_state, _action);
  persistState(nextState);
  return nextState;
}

export default function VideoFrame() {
  const [dummyItem, setDummyItem] = useState(generateEmptyItem());
  const [state, dispatch] = useReducer(reducer, {
    elements: [],
  });

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    try {
      // recover from localstorage if available
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

  const renderInner = () => {
    if (state.elements.length === 0) {
      return (
        <Flex
          align="center"
          justify="center"
          style={{ height: '100%', width: '100%' }}
        >
          <Button
            variantColor="teal"
            variant="ghost"
            onClick={onOpen}
          >
            Add your first Video
          </Button>
        </Flex>
      );
    } else {
      return (
        <>
          {state.elements.map((el, i) => {
            switch (el.type) {
              case 'video':
                return (
                  <VideoBox
                    element={el}
                    key={`videoframe__child__${i}`}
                    selected={el.selected}
                    handleSelect={e => handleSelect(e, el)}
                    handleUpdate={handleUpdateItem}
                  />
                );
              case 'userMedia':
                return (
                  <UserVideo
                    element={el}
                    key={`videoframe__child__${i}`}
                    selected={el.selected}
                    handleSelect={e => handleSelect(e, el)}
                    handleUpdate={handleUpdateItem}
                  />
                );
              case 'screenCapture':
                return (
                  <ScreenCapture
                    element={el}
                    key={`videoframe__child__${i}`}
                    selected={el.selected}
                    handleSelect={e => handleSelect(e, el)}
                    handleUpdate={handleUpdateItem}
                  />
                );
              default:
                console.warn('Unsupported Element type: ', el.type);
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
            onOpenModal={onOpen}
          />
        </>
      );
    }
  };

  return (
    <Frame
      onMouseDown={() => {
        // reset selection on outside click
        resetSelection();
      }}
    >
      {renderInner()}
      <ModalWindow isOpen={isOpen} onClose={onClose} title="New Item">
        <ItemForm
          onSubmit={data => {
            console.log({ data });
            onClose();
            handleCreateItem(data);
          }}
          item={dummyItem}
        />
      </ModalWindow>
    </Frame>
  );
}
