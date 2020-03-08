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
  right: 0;
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

export default function VideoControlPanel({ activeElement }) {
  if (!activeElement) {
    return null;
  }

  console.info({ activeElement });

  return (
    <ControlPanel>
      <FormControl>
        <Input
          type="text"
          name="id"
          disabled
          value={activeElement.id}
        />
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
          type="text"
          placeholder="width"
          name="width"
          value={activeElement.width}
        />
        <FormLabel htmlFor="height">height</FormLabel>
        <Input
          type="text"
          placeholder="height"
          name="height"
          value={activeElement.height}
        />
        <FormLabel htmlFor="z-index">z-index</FormLabel>
        <Input
          type="text"
          placeholder="z-index"
          name="zIndex"
          value={activeElement.zIndex}
        />
      </FormControl>
    </ControlPanel>
  );
}
