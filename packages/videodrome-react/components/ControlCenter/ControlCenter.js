import React from 'react';

import styled from '@emotion/styled';

import { ControlsContainer, MainControls } from '..';

const MainControlsContainer = styled.div`
  .sourceList {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-wrap: nowrap;
    margin-bottom: 30px;
  }

  .controls {
    position: absolute;
    bottom: 5px;
    button {
      margin: 2px;
      border: 0;
    }
  }
`;

export default function ControlCenter({ mode, setMode }) {
  return (
    <ControlsContainer title="Control Center" offset={350}>
      <MainControlsContainer>
        <MainControls mode={mode} setMode={setMode} />
      </MainControlsContainer>
    </ControlsContainer>
  );
}
