import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import { IconButton, useDisclosure } from '@chakra-ui/core';
import { ModalWindow, ItemForm } from '../..';

const generateEmptyItem = () => ({
  id: uuidv4(),
  name: '',
  x: 200,
  y: 200,
  zIndex: 5,
  width: 640, // 16:9
  height: 360,
  lockAspectRatio: true,
  type: 'video',
  url: 'https://vimeo.com/395282487',
});

export default function VideoSourceControls({
  activeElement,
  removeItem,
  handleUpdate,
  handleCreate,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div className="controls">
      <IconButton
        size="xs"
        aria-label="Add Item"
        icon="add"
        onClick={onOpen}
      />
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
      <ModalWindow isOpen={isOpen} onClose={onClose} title="New Item">
        <ItemForm
          onSubmit={data => {
            onClose();
            handleCreate(data);
          }}
          item={generateEmptyItem()}
        />
      </ModalWindow>
    </div>
  );
}
