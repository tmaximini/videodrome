import React, { useContext } from 'react';

import styled from '@emotion/styled';
import { ControlsContainer, ItemForm, AudioContextManager } from '..';

const InspectorContainer = styled.div`
  .form {
    background-color: #333;
    padding: 10px;
    position: relative;
  }

  label {
    color: white;
  }

  input,
  select {
    padding: 5px;
    margin: 5px 0;
    display: block;
  }
`;

export default function ElementInspector({
  activeElement,
  handleUpdate,
}) {
  if (!activeElement) {
    return null;
  }

  const ctx = useContext(AudioContextManager);

  return (
    <ControlsContainer title="Inspector" pos="right">
      <InspectorContainer>
        <div className="form">
          <ItemForm
            item={activeElement}
            onSubmit={handleUpdate}
            audioTrack={ctx?.audioTracks[activeElement.name]}
          />
        </div>
      </InspectorContainer>
    </ControlsContainer>
  );
}
