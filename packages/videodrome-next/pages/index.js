import { VideoBox, VideoFrame, UserVideo } from 'videodrome-react';
import { Global, css } from '@emotion/core';

const Home = () => {
  return (
    <>
      <Global
        styles={css`
          body,
          #__next {
            height: 100vh;
            font-family: -apple-system, system-ui, BlinkMacSystemFont,
              'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          }

          *,
          *::before,
          *::after {
            box-sizing: border-box;
          }
        `}
      />
      <VideoFrame />
    </>
  );
};

export default Home;
