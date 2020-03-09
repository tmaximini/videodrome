import React from 'react';

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
  position,
}) {
  return (
    <Rnd
      bounds="parent"
      default={{
        x: position.x,
        y: position.y,
      }}
      dragHandleClassName="headline"
      style={{ zIndex: position.z }}
      onMouseDown={e => e.stopPropagation()}
    >
      <CtrlsContainer>
        <div className="headline">{title}</div>
        <div className="inner">{children}</div>
      </CtrlsContainer>
    </Rnd>
  );
}
