import { Component } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import themeData from "../../../ultis/theme_data";

const ModalDetailsThemeStyles = styled.div`
  position: fixed;
  z-index: 1100;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .modal-theme__overlay {
    position: absolute;
    z-index: 1101;
    inset: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
  }
  .modal-theme__content {
    position: absolute;
    z-index: 1102;
    width: 1000px;
    height: 580px;
    background-color: white;
    border-radius: 10px;
    animation: fadeDownAnimation 0.8s linear 1;
    .modal-theme__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px 20px 30px;
      span {
        width: 24px;
        height: 24px;
        cursor: pointer;
        svg {
          transition: all 0.4s;
          &:hover {
            transform: scale(1.05);
            color: #34495e;
          }
        }
      }
    }
    .modal-theme__body {
      display: flex;
      padding: 0 20px;
      .modal-theme__left {
        .modal-theme__description {
          margin-bottom: 10px;
        }
        .modal-theme__btn {
          margin-bottom: 30px;
          display: flex;
          column-gap: 20px;
        }
        .modal-theme__bannerType {
          margin-bottom: 5px;
          span {
            font-weight: 600;
          }
        }
        .modal-theme__bannerSize {
          span {
            font-weight: 600;
          }
        }
      }
      .modal-theme__right {
        width: 530px;
        flex-shrink: 0;
        .modal-theme__img {
          width: 100%;
          height: 480px;
          overflow: auto;
          img {
            border-radius: 0 !important;
            width: 100%;
          }
        }
      }
    }
  }

  @keyframes fadeDownAnimation {
    0% {
      opacity: 0;
      transform: translateY(0);
    }
    50% {
      opacity: 1;
      transform: translateY(-20px);
    }
    100% {
      transform: translateY(0);
    }
  }
`;
const ModalDetailsThemeH4Styles = styled.h4`
  position: relative;
  color: black;
  font-size: 20px;
  &::after {
    content: "";
    position: absolute;
    top: 120%;
    left: 0;
    width: 70px;
    height: 2px;
    background-color: ${(props) => props.color};
  }
`;
class ModalDetailsTheme extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleChooseTheme = (themeInfo) => {
    this.props.chooseTheme(themeInfo);
    this.props.setShowModalDetailsTheme(false);
  };
  render() {
    const { themeInfo } = this.props;
    return ReactDOM.createPortal(
      <ModalDetailsThemeStyles className="modal-theme">
        <div
          className="modal-theme__overlay"
          onClick={() => this.props.setShowModalDetailsTheme(false)}
        ></div>
        <div className="modal-theme__content">
          <div className="modal-theme__header">
            <ModalDetailsThemeH4Styles color={themeData().backgroundColor}>
              {themeInfo.name}
            </ModalDetailsThemeH4Styles>
            <span onClick={() => this.props.setShowModalDetailsTheme(false)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="3"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </span>
          </div>
          <div className="modal-theme__body">
            <div className="modal-theme__left">
              <p className="modal-theme__description">
                {themeInfo.description}
              </p>
              <div className="modal-theme__btn">
                <button
                  className="btn btn-success btn-sm"
                  onClick={() => this.handleChooseTheme(themeInfo)}
                >
                  Chọn
                </button>
                <a
                  className="btn btn-primary btn-sm"
                  href={themeInfo.demo_link}
                  target="_blank"
                  rel="noreferrer"
                >
                  Xem Demo
                </a>
              </div>
              <p className="modal-theme__bannerType">
                <span>Loại banner: </span> {themeInfo.banner_type}
              </p>
              <p className="modal-theme__bannerSize">
                <span>Tỷ lệ kích thước: </span>
                {themeInfo.banner_width} x {themeInfo.banner_height} (px)
              </p>
            </div>
            <div className="modal-theme__right">
              <div className="modal-theme__img">
                <img
                  src={themeInfo.theme}
                  alt={themeInfo.name}
                  loading="lazy"
                ></img>
              </div>
            </div>
          </div>
        </div>
      </ModalDetailsThemeStyles>,
      document.querySelector("body")
    );
  }
}

export default ModalDetailsTheme;
