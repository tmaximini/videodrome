import { reducer } from '../VideoFrame';

const defaultItem = {
  id: 'test',
  x: 10,
  y: 20,
  url: 'https://vimeo.com/18855082',
  zIndex: 5,
};

describe('VideoFrame reducer', () => {
  it('it can add items', () => {
    const initialState = { elements: [] };
    const action = {
      type: 'addItem',
      payload: {
        item: defaultItem,
      },
    };
    expect(reducer(initialState, action)).toEqual({
      elements: [defaultItem],
    });
  });

  it('it adds a default zIndex if none is provided', () => {
    const initialState = { elements: [{ id: 'test', zIndex: 1 }] };
    const action = {
      type: 'addItem',
      payload: {
        item: { id: 'yo' },
      },
    };
    expect(reducer(initialState, action)).toEqual({
      elements: [
        { id: 'test', zIndex: 1 },
        { id: 'yo', zIndex: 2 },
      ],
    });
  });

  it('it can remove items', () => {
    const initialState = {
      elements: [
        { id: 'test', zIndex: 1 },
        { id: 'yo', zIndex: 2 },
      ],
    };
    const action = {
      type: 'removeItem',
      payload: {
        id: 'test',
      },
    };
    expect(reducer(initialState, action)).toEqual({
      elements: [{ id: 'yo', zIndex: 2 }],
    });
  });

  it('it can update items', () => {
    const initialState = {
      elements: [
        { id: 'test', zIndex: 1 },
        { id: 'yo', name: 'this is a test', zIndex: 2 },
      ],
    };
    const action = {
      type: 'updateItem',
      payload: {
        item: {
          id: 'yo',
          name: 'this is not a test',
          zIndex: 2,
        },
      },
    };
    expect(reducer(initialState, action)).toEqual({
      elements: [
        { id: 'test', zIndex: 1 },
        { id: 'yo', name: 'this is not a test', zIndex: 2 },
      ],
    });
  });
});
