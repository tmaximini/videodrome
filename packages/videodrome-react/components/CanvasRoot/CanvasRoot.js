import React, { Component } from 'react';

import styled from '@emotion/styled';

const HiddenVideoContainer = styled.div`
  video {
    display: none;
  }
`;

export default class CanvasRoot extends Component {
  constructor() {
    super();
    this.canvasRef = React.createRef();
    this.cameraRef = React.createRef();
    this.screenRef = React.createRef();
    this.requestId = null;
    this.render = this.render.bind(this);
    this.drawToCanvas = this.drawToCanvas.bind(this);
    this.addOrUpdateElement = this.addOrUpdateElement.bind(this);
    this.elementsToRender = [];
  }

  drawToCanvas() {
    const ctx = this.canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, window.innerHeight, window.innerWidth);
    this.elementsToRender.forEach(element => {
      const video =
        element.type === 'userMedia'
          ? this.cameraRef.current
          : this.screenRef.current;

      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        ctx.drawImage(
          video,
          element.x,
          element.y,
          element.videoWidth || element.width,
          element.videoHeight || element.height,
        );
      }
    });
    this.requestId = requestAnimationFrame(this.drawToCanvas);
  }

  shouldComponentUpdate(nextProps) {
    const filtered = nextProps.elements.filter(
      el => el.type === 'userMedia' || el.type === 'screenCapture',
    );
    console.log({ filtered }, this.elementsToRender);

    return !!filtered;
  }

  addOrUpdateElement(element) {
    const index = this.elementsToRender.findIndex(
      x => x.id === element.id,
    );
    if (index < 0) {
      if (element.type === 'userMedia') {
        navigator.mediaDevices
          .getUserMedia({
            audio: false,
            video: { facingMode: 'environment' },
          })
          .then(stream => {
            this.cameraRef.current.srcObject = stream;
          });
      }
      if (element.type === 'screenCapture') {
        navigator.mediaDevices
          .getDisplayMedia({
            audio: false,
            video: true,
          })
          .then(stream => {
            this.cameraRef.current.srcObject = stream;
          });
      }
      this.elementsToRender.push(element);
    } else {
      this.elementsToRender = [
        ...this.elementsToRender.slice(0, index),
        element,
        ...this.elementsToRender.slice(
          index + 1,
          this.elementsToRender.length,
        ),
      ];
    }
  }

  componentDidUpdate() {
    this.canvasRef.current.width = window.innerWidth;
    this.canvasRef.current.height = window.innerHeight;

    this.props.elements
      .filter(
        x => x.type === 'userMedia' || x.type === 'screenCapture',
      )
      .forEach(this.addOrUpdateElement);
    this.requestId = window.requestAnimationFrame(this.drawToCanvas);
  }

  componentWillUnmount() {
    window.cancelAnimationFrame(this.requestId);
  }

  render() {
    console.log('rendering canvas root', this.props);

    return (
      <div>
        <canvas id="canvas" ref={this.canvasRef} />
        <HiddenVideoContainer>
          <video ref={this.cameraRef} autoPlay />
          <video ref={this.screenRef} autoPlay />
        </HiddenVideoContainer>
      </div>
    );
  }
}
