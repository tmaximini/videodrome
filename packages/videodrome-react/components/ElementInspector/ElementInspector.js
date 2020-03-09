import React, { useState } from 'react';

import styled from '@emotion/styled';
import {
  Input,
  FormControl,
  FormLabel,
  Select,
} from '@chakra-ui/core';
import { ControlsContainer } from '../..';

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

export default function ElementInspector({ activeElement }) {
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
          <FormControl>
            <FormLabel htmlFor="type">Type</FormLabel>
            <Select name="type">
              <option
                value="video"
                selected={activeElement.type === 'video'}
              >
                Video
              </option>
              <option
                value="userMedia"
                selected={activeElement.type === 'userMedia'}
              >
                Camera
              </option>
            </Select>
            {activeElement.type === 'video' && (
              <>
                <FormLabel htmlFor="url">url</FormLabel>
                <Input
                  type="text"
                  name="url"
                  value={activeElement.url}
                />
              </>
            )}
            <FormLabel htmlFor="width">width</FormLabel>
            <Input
              type="number"
              placeholder="width"
              name="width"
              value={activeElement.width}
            />
            <FormLabel htmlFor="height">height</FormLabel>
            <Input
              type="number"
              placeholder="height"
              name="height"
              value={activeElement.height}
            />
            <FormLabel htmlFor="z-index">z-index</FormLabel>
            <Input
              type="number"
              placeholder="z-index"
              name="zIndex"
              value={activeElement.zIndex}
            />
          </FormControl>
        </div>
      </InspectorContainer>
    </ControlsContainer>
  );
}
