import React, { Component } from "react";
import * as helper from "../../../ultis/helpers";
import { connect, shallowEqual } from "react-redux";
import styled from "styled-components";

const DecentralizationListStyles = styled.div`
  .decentralization__listItem {
    display: flex;
    flex-direction: column;
    row-gap: 12px;
    .decentralization__item {
      .decentralization__item__main {
        display: flex;
        align-items: center;
        column-gap: 8px;
        .decentralization__icon {
          i {
            color: #10a0b5;
          }
        }
        .decentralization__content {
          display: flex;
          align-items: center;
          column-gap: 8px;
          margin-bottom: 0;
          .decentralization__label {
            margin-bottom: 0;
          }
          .decentralization__check {
            width: 18px;
            height: 18px;
            border-radius: 3px;
            background-color: #1dac05;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #ffffff;
          }
        }
      }
      .decentralization__listChild {
        margin-top: 12px;
        display: flex;
        flex-direction: column;
        row-gap: 12px;
        .decentralization__itemChild {
          .decentralization__contentChild {
            display: flex;
            align-items: center;
            column-gap: 8px;
            padding-left: 38px;
            margin-bottom: 0;
            .decentralization__labelChild {
              margin-bottom: 0;
            }
            .decentralization__checkChild {
              width: 18px;
              height: 18px;
              border-radius: 3px;
              display: flex;
              align-items: center;
              justify-content: center;
              color: #ffffff;
            }
          }
        }
      }
    }
  }
`;
class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileUpload: null,
      listCheckedName: [],
    };
  }

  componentDidMount() {
    const { data } = this.props;
    let listCheckedNameDefault = [];

    if (data && data.length > 0) {
      data.forEach((item) => {
        if (item.components && item.components.length > 0) {
          const checkedNameDefault = item.components
            .filter((component) => component.componentChilds?.length > 0)
            ?.map((c) => c.name);
          listCheckedNameDefault.push(...checkedNameDefault);
        }
      });
    }

    this.setState({ listCheckedName: listCheckedNameDefault });
  }
  onChange = (e, item) => {
    this.props.handleChangeValue(e.target.checked, item);
  };
  handleShowChildComponent = (nameComponent) => {
    const { listCheckedName } = this.state;
    let listCheckedNameFilter = [];
    if (listCheckedName.includes(nameComponent)) {
      listCheckedNameFilter = listCheckedName.filter(
        (item) => item !== nameComponent
      );
    } else {
      listCheckedNameFilter = [...listCheckedName, nameComponent];
    }

    this.setState({
      listCheckedName: listCheckedNameFilter,
    });
  };
  handleDecentralizationCheck = (componentChilds, state) => {
    var isChecked = false;
    if (componentChilds?.length > 0) {
      componentChilds.forEach((element) => {
        if (!state[element.decentralizationName]) {
          isChecked = false;
          return;
        } else isChecked = true;
      });
    }
    return isChecked;
  };

  showItem = (item, state) => {
    var result = null;
    const { listCheckedName } = this.state;

    if (item.components.length > 0) {
      result = (
        <div className="decentralization__listItem">
          {item.components.map((_item, index) => {
            return (
              <div class="decentralization__item">
                <div
                  className="decentralization__item__main"
                  style={{
                    cursor: "pointer",
                  }}
                >
                  <div
                    className="decentralization__icon"
                    onClick={() => this.handleShowChildComponent(_item.name)}
                  >
                    <i
                      className="fa fa-caret-right"
                      style={{
                        transform:
                          listCheckedName.includes(_item.name) &&
                          _item.componentChilds.length > 0
                            ? "rotate(90deg)"
                            : "rotate(0deg)",
                      }}
                    ></i>
                  </div>
                  <label class="decentralization__content">
                    <input
                      class="decentralization__input"
                      type="checkbox"
                      hidden
                      id={`gridCheck-${_item.name}`}
                      onChange={() => this.handleShowChildComponent(_item.name)}
                    />
                    <div className="decentralization__check">
                      {listCheckedName.includes(_item.name) &&
                      this.handleDecentralizationCheck(
                        _item.componentChilds,
                        state
                      ) ? (
                        <svg
                          fill="currentColor"
                          width="18px"
                          height="18px"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M18.71,7.21a1,1,0,0,0-1.42,0L9.84,14.67,6.71,11.53A1,1,0,1,0,5.29,13l3.84,3.84a1,1,0,0,0,1.42,0l8.16-8.16A1,1,0,0,0,18.71,7.21Z" />
                        </svg>
                      ) : (
                        <svg
                          fill="currentColor"
                          width="18px"
                          height="18px"
                          viewBox="0 0 24 24"
                          id="minus"
                          data-name="Line Color"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <line
                            id="primary"
                            x1={19}
                            y1={12}
                            x2={5}
                            y2={12}
                            style={{
                              fill: "currentColor",
                              stroke: "currentColor",
                              strokeLinecap: "round",
                              strokeLinejoin: "round",
                              strokeWidth: 2,
                            }}
                          />
                        </svg>
                      )}
                    </div>

                    <label
                      class="decentralization__label"
                      for={`gridCheck-${_item.name}`}
                    >
                      {_item.name}
                    </label>
                  </label>
                </div>
                {listCheckedName.includes(_item.name) &&
                _item.componentChilds.length > 0 ? (
                  <div className="decentralization__listChild">
                    {_item.componentChilds.map((_itemChild, index) => {
                      return (
                        <div class="decentralization__itemChild">
                          <label class="decentralization__contentChild">
                            <input
                              class="decentralization__inputChild"
                              hidden
                              type="checkbox"
                              id={`gridCheck-${_itemChild.decentralizationName}`}
                              onChange={(e) =>
                                this.onChange(
                                  e,
                                  _itemChild.decentralizationName
                                )
                              }
                            />
                            <div
                              className="decentralization__checkChild"
                              style={{
                                border: `1px solid ${
                                  state[_itemChild.decentralizationName]
                                    ? "transparent"
                                    : "#cfcfcf"
                                }`,
                                backgroundColor: `${
                                  state[_itemChild.decentralizationName]
                                    ? "#1dac05"
                                    : ""
                                }`,
                              }}
                            >
                              <svg
                                fill="currentColor"
                                width="18px"
                                height="18px"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M18.71,7.21a1,1,0,0,0-1.42,0L9.84,14.67,6.71,11.53A1,1,0,1,0,5.29,13l3.84,3.84a1,1,0,0,0,1.42,0l8.16-8.16A1,1,0,0,0,18.71,7.21Z" />
                              </svg>
                            </div>

                            <label
                              class="decentralization__labelChild"
                              for={`gridCheck-${_itemChild.decentralizationName}`}
                            >
                              {_itemChild.name}
                            </label>
                          </label>
                        </div>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      );
    } else {
    }
    return result;
  };

  showListPermission = (data, state) => {
    var result = null;
    if (typeof data == "undefined") {
      return result;
    }
    if (data.length > 0) {
      result = data.map((item, index) => {
        return (
          <div
            class="col-xs-4 col-sm-6 col-md-4 col-lg-4"
            style={{ marginBottom: "20px" }}
          >
            <h4
              style={{
                fontSize: "1rem",
                color: "#10a0b5",
                fontWeight: "500",
              }}
            >
              {item.name}
            </h4>
            {this.showItem(item, state)}
          </div>
        );
      });
    } else {
    }
    return result;
  };

  render() {
    var { data, state } = this.props;

    return (
      <DecentralizationListStyles class="form-group">
        <label className="text-label-permission" for="group_name">
          Danh sách phân quyền
        </label>
        <div class="row">{this.showListPermission(data, state)}</div>
      </DecentralizationListStyles>
    );
  }
}

export default List;
