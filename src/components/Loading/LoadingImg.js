import React, { Component } from 'react';
import styled from 'styled-components';

const LoadingImgStyles = styled.div`
  .lds-roller {
    display: inline-block;
    position: relative;
  }
  .lds-roller div {
    animation: lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    transform-origin: 40px 40px;
  }
  .lds-roller div:after {
    content: ' ';
    display: block;
    position: absolute;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: ${props => props.dotColor ?  props.dotColor : '#fff'};
    margin: -4px 0 0 -4px;
  }
  .lds-roller div:nth-child(1) {
    animation-delay: -0.036s;
  }
  .lds-roller div:nth-child(1):after {
    top: ${props => props.top ? `${props.top}px` : '63px'};
    left: ${props => props.left ? `${props.left}px` : '63px'};
  }
  .lds-roller div:nth-child(2) {
    animation-delay: -0.072s;
  }
  .lds-roller div:nth-child(2):after {
    top: ${props => props.top ? `${props.top + 5}px` : '68px'};
    left: ${props => props.left ? `${props.left - 8 }px`: '56px'};
  }
  .lds-roller div:nth-child(3) {
    animation-delay: -0.108s;
  }
  .lds-roller div:nth-child(3):after {
    top: ${props => props.top ? `${props.top + 7}px` : '71px'};
    left: ${props => props.left ? `${props.left - 15}px` : '48px'};
  }
  .lds-roller div:nth-child(4) {
    animation-delay: -0.144s;
  }
  .lds-roller div:nth-child(4):after {
    top: ${props => props.top ? `${props.top + 8}px` : '72px'};
    left: ${props => props.left ? `${props.left - 23}px` : '40px'};
  }
  .lds-roller div:nth-child(5) {
    animation-delay: -0.18s;
  }
  .lds-roller div:nth-child(5):after {
    top: ${props => props.top ? `${props.top +7}px`  : '71px'};
    left: ${props => props.left ? `${props.top -23}px` : '32px'};
  }
  .lds-roller div:nth-child(6) {
    animation-delay: -0.216s;
  }
  .lds-roller div:nth-child(6):after {
    top: ${props => props.top ? `${props.top + 5}px` :   '68px'};
    left: ${props => props.left ? `${props.top -39}px` : '24px'};
  }
  .lds-roller div:nth-child(7) {
    animation-delay: -0.252s;
  }
  .lds-roller div:nth-child(7):after {
    top: ${props => props.top ? `${props.top}px` :   '63px'};
    left: ${props => props.left ? `${props.top -46}px` : '17px'};
  }
  .lds-roller div:nth-child(8) {
    animation-delay: -0.288s;
  }
  .lds-roller div:nth-child(8):after {
    top: ${props => props.top ? `${props.top -7}px`  : '56px'};
    left: ${props => props.left ? `${props.left - 51}px` : '12px'};
  }
  @keyframes lds-roller {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
class LoadingImg extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { dotColor, styleCss, ...rest } = this.props;
    return (
      <LoadingImgStyles dotColor={dotColor} style={styleCss}>
        <div
          className="lds-roller"
          style={{
            transform: `scale(${styleCss?.transformScale})`,
          }}
          {...rest}
        >
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </LoadingImgStyles>
    );
  }
}

export default LoadingImg;
