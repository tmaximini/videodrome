import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from '@chakra-ui/core';

export default function ModalWindow({
  title,
  onClose,
  isOpen,
  children,
}) {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          style={{
            backgroundColor: '#333',
            color: 'white',
            border: '2px solid #666',
            borderRadius: '5px',
          }}
        >
          <ModalHeader style={{ backgroundColor: '#666' }}>
            {title}
          </ModalHeader>
          <ModalCloseButton style={{ cursor: 'pointer' }} />
          <ModalBody style={{ padding: '10px' }}>
            {children}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
