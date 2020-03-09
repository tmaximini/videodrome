import React, { useState, useEffect } from 'react';

import styled from '@emotion/styled';
import { Rnd } from 'react-rnd';

const CtrlsContainer = styled.div`
  border-radius: 5px;
  background-color: #666;
  color: white;
  width: 300px;
  position: absolute;
  bottom: 8px;
  border: 2px solid #666;
  font-size: 12px;

  .headline {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    text-align: center;
    background-color: #666;
    padding-top: 5px;
    width: 100%;
    cursor: move;
  }
  .inner {
    background-color: #333;
    padding: 5px 0;
    margin: 5px 0;
    min-height: 100px;
  }
`;

export default function ControlsContainer({
  children,
  title,
  offset = 0,
}) {
  const [position, setPosition] = useState({ x: 500, y: 500 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setPosition({
      x: window.innerWidth - 305,
      y: window.innerHeight / 2 + 175 + offset,
    });
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Rnd
      bounds="parent"
      default={{
        x: position.x,
        y: position.y,
      }}
      dragHandleClassName="headline"
      style={{ zIndex: 1000 }}
      onMouseDown={e => e.stopPropagation()}
    >
      <CtrlsContainer>
        <div className="headline">{title}</div>
        <div className="inner">{children}</div>
      </CtrlsContainer>
    </Rnd>
  );
}
