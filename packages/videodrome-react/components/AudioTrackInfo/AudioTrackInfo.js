import React from 'react';
import { IoIosMic } from 'react-icons/io';

import { Box, Text, Stack } from '@chakra-ui/core';

export default function AudioTrackInfo({ tracks }) {
  return (
    <Stack>
      <Box as={IoIosMic} size="32px" color="green.400" />
      <Text>{tracks[0].label}</Text>
    </Stack>
  );
}
