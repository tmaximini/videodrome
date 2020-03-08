import React from 'react';

import styled from '@emotion/styled';
import { Global, css } from '@emotion/core';

const Frame = styled.div`
  width: 100%;
  height: 100%;
  background-color: #ccc;
`;

export default function VideoFrame({ children }) {
  return (
    <Frame>
      <Global
        styles={css`
          body,
          #__next {
            height: 100vh;
          }

          *,
          *::before,
          *::after {
            box-sizing: border-box;
          }
        `}
      />
      {children}
    </Frame>
  );
}
