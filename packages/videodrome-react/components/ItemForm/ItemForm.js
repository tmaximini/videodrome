import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { AudioTrackInfo } from '../';

import styled from '@emotion/styled';
import {
  Input,
  FormControl,
  FormLabel,
  Button,
  Flex,
  Stack,
  Checkbox,
  FormHelperText,
} from '@chakra-ui/core';

const ControlPanel = styled.div`
  input,
  select {
    padding: 5px;
    margin: 5px 0;
    display: block;
    width: 100%;
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

const RESOLUTIONS = {
  '16:9': {
    w: 640,
    h: 360,
  },
  '4:3': {
    w: 640,
    h: 480,
  },
};

export default function ItemForm({ item, onSubmit, audioTrack }) {
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

  useEffect(() => {
    for (const key in item) {
      setValue(key, item[key]);
    }
  }, [item]);

  const type = watch('type');
  const lockAspectRatio = watch('lockAspectRatio');
  const width = watch('width');
  const height = watch('height');

  const getWidth = () => {
    if (lockAspectRatio) {
      if (type === 'video') {
        return RESOLUTIONS['16:9'].w;
      } else {
        return RESOLUTIONS['4:3'].w;
      }
    } else {
      return width || item.width;
    }
  };
  const getHeight = () => {
    if (lockAspectRatio) {
      if (type === 'video') {
        return RESOLUTIONS['16:9'].h;
      } else {
        return RESOLUTIONS['4:3'].h;
      }
    } else {
      return height || item.height;
    }
  };

  useEffect(() => {
    setValue('height', getHeight());
    setValue('width', getWidth());
  }, [type]);

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
          <option value="screenCapture">Screen Capture</option>
        </select>
        {type === 'video' && (
          <>
            <FormLabel htmlFor="url">Url</FormLabel>
            <Input size="sm" type="text" name="url" ref={register} />
            <FormHelperText id="url-helper-text">
              You can use urls from youtube, vimeo, streamable,
              twitch, soundcloud, dailymotion.
            </FormHelperText>
          </>
        )}

        {audioTrack ? (
          <AudioTrackInfo audioTrack={audioTrack} />
        ) : null}

        <Flex>
          <Stack>
            <FormLabel htmlFor="lockAspectRatio">
              Lock Aspect Ratio
            </FormLabel>
            <Checkbox name="lockAspectRatio" ref={register} />
          </Stack>
          <Stack>
            <FormLabel htmlFor="showControls">
              Show Controls
            </FormLabel>
            <Checkbox name="showControls" ref={register} />
          </Stack>
        </Flex>

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
            const vals = getValues();
            console.log({ vals });
            onSubmit(vals);
          }}
        >
          Submit
        </Button>
      </FormControl>
    </ControlPanel>
  );
}
