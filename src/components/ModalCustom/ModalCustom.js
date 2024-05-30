import { Component } from "react";
import styled from "styled-components";
import ReactDOM from "react-dom";
const ModalCustomStyles = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  transform: translateY(-30px);

  .modalCustom__main {
    width: 450px;
    height: 250px;
    background-color: white;
    border-radius: 5px;
    overflow: hidden;
    margin: 5% 0;
    display: flex;
    flex-direction: column;
    .modalCustom__header {
      padding: 10px;
      position: relative;
      .modalCustom__header__title {
        font-size: 20px;
        font-weight: 600;
      }
      .close {
        position: absolute;
        top: 10px;
        right: 10px;
      }
    }
    .modalCustom__content {
      flex-grow: 1;
    }
  }
  &.modal__show {
    opacity: 1;
    visibility: visible;
    transform: translateY(0px);
    transition: all 0.2s linear;
  }
  &.modal__hide {
    opacity: 0;
    visibility: hidden;
    transform: translateY(-30px);
    transition: all 0.15s linear;
  }
`;

class ModalCustom extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      title,
      className = "",
      children,
      style,
      styleHeader,
      openModal,
      setOpenModal,
    } = this.props;
    return ReactDOM.createPortal(
      <ModalCustomStyles
        className={`modalCustom ${className} ${
          openModal ? "modal__show" : "modal__hide"
        }`}
      >
        <div
          className="modalCustom__main"
          style={{
            ...style,
          }}
        >
          <div
            className="modalCustom__header"
            style={{
              ...styleHeader,
            }}
          >
            {title ? (
              <div className="modalCustom__header__title">{title}</div>
            ) : null}
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={() => setOpenModal(false)}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modalCustom__content">{children}</div>
        </div>
      </ModalCustomStyles>,
      document.body
    );
  }
}

export default ModalCustom;
