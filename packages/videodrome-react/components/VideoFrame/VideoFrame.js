import React, { useState } from 'react';

import styled from '@emotion/styled';

const Frame = styled.div`
  width: 100%;
  height: 100%;
  background-color: #ccc;
`;

export default function VideoFrame({ children }) {
  const [selected, setSelected] = useState();

  return (
    <Frame
      onMouseDown={() => {
        // reset selection on outside click
        setSelected(null);
      }}
    >
      {children.map((child, i) =>
        React.cloneElement(child, {
          selected: selected === `videoframe__child__${i}`,
          key: `videoframe__child__${i}`,
          handleSelected: e => {
            e.stopPropagation();
            setSelected(`videoframe__child__${i}`);
          },
        }),
      )}
    </Frame>
  );
}
