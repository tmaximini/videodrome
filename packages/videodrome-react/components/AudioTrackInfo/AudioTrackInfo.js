import React from 'react';
import { IoIosMic } from 'react-icons/io';

import { Box, Text, Flex } from '@chakra-ui/core';

export default function AudioTrackInfo({ audioTrack }) {
  console.log({ audioTrack });

  return (
    <Flex>
      <Box as={IoIosMic} size="32px" color="green.400" />
      <Text>{audioTrack.label}</Text>
    </Flex>
  );
}
