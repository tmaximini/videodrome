import React, {
  useReducer,
  useEffect,
  useState,
  useRef,
} from 'react';
import nanoid from 'nanoid';
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
  AudioContextManager,
  CanvasContext,
  ControlCenter,
  CanvasCamera,
} from '..';

import {
  persistState,
  recoverState,
  generateEmptyItem,
} from '../../lib/utils';

const Frame = styled.div`
  width: 100%;
  height: 100%;
  background-color: #222;
  /* video {
    display: none;
  } */
`;

const Canvas = styled.canvas`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
`;

const HiddenVideoContainer = styled.div`
  video {
    display: none;
  }
`;

export function reducer(_state, _action) {
  const handleStateUpdate = (state, action) => {
    switch (action.type) {
      case 'setActive':
        const newElements = state.elements.map(item => ({
          ...item,
          selected: item.id === action.payload.id,
        }));
        return { ...state, elements: newElements };
      case 'resetSelection':
        return {
          ...state,
          elements: state.elements.map(el => ({
            ...el,
            selected: false,
          })),
        };
      case 'removeItem':
        return {
          ...state,
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
          return { ...state };
        }

        return {
          ...state,
          elements: [
            ...state.elements.slice(0, index),
            { ...state.elements[index], ...action.payload.item },
            ...state.elements.slice(index + 1, state.elements.length),
          ],
        };
      case 'createItem':
        return {
          ...state,
          elements: [
            ...state.elements,
            {
              ...action.payload.item,
              id: action.payload.item.id || nanoid(),
              zIndex:
                action.payload.item.zIndex ||
                state.elements.length + 1,
            },
          ],
        };
      case 'restoreState':
        return action.payload.state;
      case 'registerAudioTrack':
        return {
          ...state,
          audioTracks: {
            ...state.audioTracks,
            [action.payload.audioTrack.itemName]:
              action.payload.audioTrack,
          },
        };

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
  const [dummyItem] = useState(generateEmptyItem());
  const [mode, setMode] = useState('arrangement');

  const [canvas, setCanvas] = useState(null);

  const cameraRef = useRef(null);
  const screenRef = useRef(null);
  const canvasRef = useRef(null);

  const [state, dispatch] = useReducer(reducer, {
    elements: [],
    audioTracks: {},
  });

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const cnvs = document.getElementById('canvas');
    const updateCanvasSize = () => {
      console.log('resizing canvas', canvas);
      canvasRef.current.height = window.innerHeight;
      canvasRef.current.width = window.innerWidth;
      setCanvas(cnvs);
      return true;
    };

    if (canvasRef && canvasRef.current) {
      updateCanvasSize();
      window.addEventListener('resize', updateCanvasSize);
    }

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, []);

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

  const handleRemoveItem = id =>
    dispatch({ type: 'removeItem', payload: { id } });

  const registerAudioTrack = audioTrack => {
    console.info('registering audio track', audioTrack);
    dispatch({
      type: 'registerAudioTrack',
      payload: { audioTrack },
    });
  };

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
                return mode === 'arrangement' ? (
                  <UserVideo
                    element={el}
                    key={`videoframe__child__${i}`}
                    selected={el.selected}
                    handleSelect={e => handleSelect(e, el)}
                    handleUpdate={handleUpdateItem}
                  />
                ) : (
                  <CanvasCamera element={el} />
                );
              case 'screenCapture':
                return mode === 'arrangement' ? (
                  <ScreenCapture
                    element={el}
                    key={`videoframe__child__${i}`}
                    selected={el.selected}
                    handleSelect={e => handleSelect(e, el)}
                    handleUpdate={handleUpdateItem}
                  />
                ) : null;
              default:
                console.warn('Unsupported Element type: ', el.type);
            }
          })}
          {mode === 'arrangement' ? (
            <>
              <ElementInspector
                activeElement={getActiveElement()}
                handleUpdate={handleUpdateItem}
              />
              <VideoSources
                onRemoveItem={handleRemoveItem}
                onSelectItem={id =>
                  dispatch({ type: 'setActive', payload: { id } })
                }
                handleUpdate={handleUpdateItem}
                elements={state.elements}
                activeElement={getActiveElement()}
                onOpenModal={onOpen}
              />
            </>
          ) : null}
          <ControlCenter mode={mode} setMode={setMode} />
        </>
      );
    }
  };

  return (
    <CanvasContext.Provider value={{ canvas, cameraRef, screenRef }}>
      {mode === 'live' ? (
        <HiddenVideoContainer>
          <video ref={cameraRef} autoPlay />
          <video ref={screenRef} autoPlay />
        </HiddenVideoContainer>
      ) : null}
      <AudioContextManager.Provider
        value={{ audioTracks: state.audioTracks, registerAudioTrack }}
      >
        <Frame
          onMouseDown={() => {
            // reset selection on outside click
            resetSelection();
          }}
        >
          <Canvas ref={canvasRef} id="canvas" />
          {renderInner()}
          <ModalWindow
            isOpen={isOpen}
            onClose={onClose}
            title="New Item"
          >
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
      </AudioContextManager.Provider>
    </CanvasContext.Provider>
  );
}
