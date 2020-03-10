import React, { useState, useEffect } from 'react';

import styled from '@emotion/styled';
import { ControlsContainer, ItemForm } from '..';

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

  return (
    <ControlsContainer title="Inspector" pos="right">
      <InspectorContainer>
        <div className="form">
          <ItemForm item={activeElement} onSubmit={handleUpdate} />
        </div>
      </InspectorContainer>
    </ControlsContainer>
  );
}
