import React, { useState } from 'react';

import styled from '@emotion/styled';
import {
  Input,
  FormControl,
  FormLabel,
  Select,
} from '@chakra-ui/core';
import { ControlsContainer, ItemForm } from '../..';

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
    <ControlsContainer
      title="Inspector"
      position={{ x: 500, y: 500, z: 1000 }}
    >
      <InspectorContainer>
        <div className="form">
          <ItemForm item={activeElement} onSubmit={handleUpdate} />
        </div>
      </InspectorContainer>
    </ControlsContainer>
  );
}
