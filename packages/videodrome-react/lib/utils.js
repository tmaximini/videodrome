import { v4 as uuidv4 } from 'uuid';

export const generateEmptyItem = () => ({
  id: uuidv4(),
  name: '',
  x: 200,
  y: 200,
  zIndex: 5,
  width: 640, // 16:9
  height: 360,
  lockAspectRatio: true,
  type: 'video',
  url: 'https://vimeo.com/395282487',
});

export const persistState = state => {
  localStorage.setItem('videodrome', JSON.stringify(state));
};

export const recoverState = () => {
  const state = localStorage.getItem('videodrome');

  return state ? JSON.parse(state) : { elements: [] };
};
