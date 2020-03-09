import React, { useState } from 'react';

import styled from '@emotion/styled';
import {
  Input,
  FormControl,
  FormLabel,
  Select,
} from '@chakra-ui/core';

const ControlPanel = styled.div`
  position: absolute;
  right: 8px;
  top: 50%;
  background-color: green;
  padding: 10px;
  width: 400px;

  input,
  select {
    padding: 5px;
    margin: 5px;
    display: block;
  }
`;

export default function AddItemForm({ onAddItem }) {
  return (
    <ControlPanel>
      <FormControl>
        <Input type="text" name="id" isRequired />
        <Select>
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
            <Input type="text" name="url" value={activeElement.url} />
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
      </FormControl>
    </ControlPanel>
  );
}
