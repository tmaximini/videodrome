import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
} from 'react';

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
  const ref = useRef();

  const [mounted, setMounted] = useState(false);
  const [position, setPosition] = useState({ x: 500, y: 500 });

  function setLayout() {
    if (
      ref &&
      ref.current &&
      typeof ref.current.updatePosition === 'function'
    ) {
      ref.current.updatePosition({
        x: window.innerWidth - 305,
        y: window.innerHeight / 2 + 175 + offset,
      });
    }
  }

  useEffect(() => {
    setPosition({
      x: window.innerWidth - 305,
      y: window.innerHeight / 2 + 175 + offset,
    });
    setMounted(true);
  }, []);

  useLayoutEffect(() => {
    window.addEventListener('resize', setLayout);
    return () => window.removeEventListener('resize', setLayout);
  }, []);

  if (!mounted) return null;

  return (
    <Rnd
      bounds="parent"
      ref={ref}
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
