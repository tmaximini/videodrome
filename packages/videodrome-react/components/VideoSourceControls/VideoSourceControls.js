import React from 'react';

import { IconButton } from '@chakra-ui/core';

export default function VideoSourceControls({
  activeElement,
  removeItem,
}) {
  return (
    <div className="controls">
      <IconButton size="xs" aria-label="Add Item" icon="add" />
      <IconButton
        size="xs"
        aria-label="Delete item"
        icon="minus"
        isDisabled={!activeElement}
        onClick={() => removeItem(activeElement.id)}
      />
      <IconButton
        size="xs"
        aria-label="Move item one layer up"
        icon="chevron-up"
      />
      <IconButton
        size="xs"
        aria-label="Move item one layer back"
        icon="chevron-down"
      />
    </div>
  );
}
