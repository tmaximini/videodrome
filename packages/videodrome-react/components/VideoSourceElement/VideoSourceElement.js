import React from 'react';

export default function VideoSourceElement({ onClick, element }) {
  return (
    <div
      onClick={onClick}
      className={element.selected ? 'item selected' : 'item'}
    >
      {element.type} <i>({element.name})</i>
    </div>
  );
}
