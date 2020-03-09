import React from 'react';

import { IconButton } from '@chakra-ui/core';

export default function VideoSourceControls({
  activeElement,
  removeItem,
  handleUpdate,
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
        isDisabled={!activeElement}
        onClick={() =>
          handleUpdate({
            ...activeElement,
            zIndex: activeElement.zIndex + 1,
          })
        }
      />
      <IconButton
        size="xs"
        aria-label="Move item one layer back"
        icon="chevron-down"
        isDisabled={!activeElement}
        onClick={() =>
          handleUpdate({
            ...activeElement,
            zIndex: Math.min(activeElement.zIndex - 1, 0),
          })
        }
      />
    </div>
  );
}
