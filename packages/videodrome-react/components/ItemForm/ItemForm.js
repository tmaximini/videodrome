import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import styled from '@emotion/styled';
import {
  Input,
  FormControl,
  FormLabel,
  Select,
  Button,
  Flex,
  Stack,
  Checkbox,
} from '@chakra-ui/core';

const ControlPanel = styled.div`
  input,
  select {
    padding: 5px;
    margin: 5px 0;
    display: block;
  }
  button {
    cursor: pointer;
    margin-top: 10px;
  }

  .bottom {
    label {
      margin: 10px 0 0 0;
    }
  }
`;

export default function ItemForm({ item, onSubmit }) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    errors,
    getValues,
  } = useForm({
    defaultValues: { ...item },
  });

  React.useEffect(() => {
    for (const key in item) {
      setValue(key, item[key]);
    }
  }, [item]);

  const type = watch('type');

  return (
    <ControlPanel>
      <FormControl>
        <input type="hidden" name="id" ref={register} />
        <FormLabel htmlFor="name">Name</FormLabel>
        <Input
          type="text"
          name="name"
          isRequired
          autoComplete="off"
          placeholder="Name"
          size="sm"
          ref={register({ required: true })}
        />
        <FormLabel htmlFor="type">Type</FormLabel>
        <select
          name="type"
          ref={register({ required: true })}
          placeholder="Select option"
        >
          <option value="video">Video</option>
          <option value="userMedia">Camera</option>
        </select>
        {type === 'video' && (
          <>
            <FormLabel htmlFor="url">Url</FormLabel>
            <Input size="sm" type="text" name="url" ref={register} />
          </>
        )}
        <FormLabel htmlFor="showControls">Show Controls</FormLabel>
        <Checkbox name="showControls" ref={register} />

        <div className="bottom">
          <Flex>
            <Stack>
              <FormLabel htmlFor="width">w</FormLabel>
              <Input
                size="sm"
                type="number"
                placeholder="width"
                name="width"
                ref={register}
              />
            </Stack>
            <Stack>
              <FormLabel htmlFor="height">h</FormLabel>
              <Input
                size="sm"
                type="number"
                placeholder="height"
                name="height"
                ref={register}
              />
            </Stack>
            <Stack>
              <FormLabel htmlFor="x">x</FormLabel>
              <Input
                size="sm"
                type="number"
                placeholder="x"
                name="x"
                ref={register}
              />
            </Stack>
            <Stack>
              <FormLabel htmlFor="y">y</FormLabel>
              <Input
                size="sm"
                type="number"
                placeholder="y"
                name="y"
                ref={register}
              />
            </Stack>
            <Stack>
              <FormLabel htmlFor="z">z</FormLabel>
              <Input
                size="sm"
                type="number"
                placeholder="z"
                name="zIndex"
                ref={register}
              />
            </Stack>
          </Flex>
        </div>
        <Button
          onClick={() => {
            onSubmit(getValues());
          }}
        >
          Submit
        </Button>
      </FormControl>
    </ControlPanel>
  );
}
