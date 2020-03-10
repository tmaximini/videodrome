import React from 'react';
import {
  IoIosDesktop,
  IoIosVideocam,
  IoLogoVimeo,
  IoLogoYoutube,
} from 'react-icons/io';
import { FaSoundcloud } from 'react-icons/fa';

import { Box, Text, Flex } from '@chakra-ui/core';

export default function VideoSourceElement({ onClick, element }) {
  const getIcon = element => {
    switch (element.type) {
      case 'video':
        if (/vimeo/.test(element.url)) {
          return (
            <Box as={IoLogoVimeo} size="18px" color="grey.400" />
          );
        }
        if (/soundcloud/.test(element.url)) {
          return (
            <Box as={FaSoundcloud} size="18px" color="grey.400" />
          );
        }
        return (
          <Box as={IoLogoYoutube} size="18px" color="grey.400" />
        );
      case 'screenCapture':
        return <Box as={IoIosDesktop} size="18px" color="grey.400" />;
      case 'userMedia':
        return (
          <Box as={IoIosVideocam} size="18px" color="grey.400" />
        );
    }
  };

  return (
    <Flex
      onClick={onClick}
      className={element.selected ? 'item selected' : 'item'}
    >
      {getIcon(element)}
      <p>{element.name}</p>
    </Flex>
  );
}
