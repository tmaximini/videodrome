import React from 'react';
import { Box, Flex } from '@chakra-ui/core';
import {
  FaStop,
  FaPlay,
  FaToggleOn,
  FaToggleOff,
} from 'react-icons/fa';

export default function VideoSourceControls({ mode, setMode }) {
  return (
    <div className="controls">
      <Flex>
        <Box as={FaStop} size="24px" color="red.400" />
        <Box as={FaPlay} size="24px" color="green.400" />

        {mode === 'arrangement' ? (
          <Box
            as={FaToggleOn}
            onClick={() => setMode('live')}
            size="24px"
            color="green.400"
          />
        ) : (
          <Box
            as={FaToggleOff}
            onClick={() => setMode('arrangement')}
            size="24px"
            color="grey.400"
          />
        )}
      </Flex>
    </div>
  );
}
