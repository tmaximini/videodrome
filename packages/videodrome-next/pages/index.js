import { VideoBox, VideoFrame } from 'videodrome-react';

const Home = () => {
  return (
    <VideoFrame>
      <VideoBox />
      <VideoBox videoUrl="https://streamable.com/ifjh" />
    </VideoFrame>
  );
};

export default Home;
