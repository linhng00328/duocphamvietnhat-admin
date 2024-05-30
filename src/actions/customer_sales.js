import * as Types from "../constants/ActionType";
import history from "../history";
import * as customerApi from "../data/remote/customer_sales";
import { saveAs } from "file-saver";
import XlsxPopulate from "xlsx-populate";
import { compressed, formatStringCharactor } from "../ultis/helpers";
import moment from "moment";

function getSheetData(data, header) {
  var fields = Object.keys(data[0]);
  var sheetData = data.map(function (row) {
    return fields.map(function (fieldName) {
      return row[fieldName] ? row[fieldName] : "";
    });
  });
  sheetData.unshift(header);
  return sheetData;
}

async function saveAsExcel(value) {
  // var data = [
  //   { name: "John", city: "Seattle" },
  //   { name: "Mike", city: "Los Angeles" },
  //   { name: "Zach", city: "New York" }
  // ];
  // let header = ["Name", "City"];
  var data = value.data;
  var data_header = value.header;
  XlsxPopulate.fromBlankAsync().then(async (workbook) => {
    const sheet1 = workbook.sheet(0);
    const sheetData = getSheetData(data, data_header);
    console.log(sheetData);
    const totalColumns = sheetData[0].length;

    sheet1.cell("A1").value(sheetData);
    const range = sheet1.usedRange();
    const endColumn = String.fromCharCode(64 + totalColumns);
    sheet1.row(1).style("bold", true);
    sheet1.range("A1:" + endColumn + "1").style("fill", "F4D03F");
    range.style("border", true);
    return workbook.outputAsync().then((res) => {
      console.log(res);
      saveAs(res, "Danh sách KH.xlsx");
    });
  });
}

export const saveAllListCustomer = (store_code) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    customerApi.fetchAllCustomerSale(store_code, 1, "", 1000).then((res) => {
      dispatch({
        type: Types.SHOW_LOADING,
        loading: "hide",
      });

      if (res.data.data.data.length > 0) {
        var newArray = [];

        var i = 1;
        for (const item of res.data.data.data) {
          var newItem = {};
          var arangeKeyItem = {
            stt: i,
            name: item.name,
            phone_number: item.phone_number,
            email: item.email,
            sex: item.sex,

            date_of_birth: item.date_of_birth,
            address: item.address,
          };
          Object.entries(arangeKeyItem).forEach(([key, value], index) => {
            if (key == "stt") {
              newItem["STT"] = value;
              // newItem["Tên sản phẩm"] = value
            }

            if (key == "name") {
              newItem["Tên khách hàng"] = value;
              // newItem["Tên sản phẩm"] = value
            }
            if (key == "date_of_birth") {
              newItem["Ngày sinh"] = value
                ? moment(value).format("DD-MM-YYYY")
                : "";
              // newItem["Tên sản phẩm"] = value
            }
            if (key == "phone_number") {
              newItem["Số điện thoại"] = value;
              // newItem["Tên sản phẩm"] = value
            }
            if (key == "email") {
              newItem["Email"] = value;
              // newItem["Tên sản phẩm"] = value
            }

            if (key == "address") {
              newItem["Địa chỉ"] = value;
            }
          });

          i++;
          newArray.push(newItem);
        }
        var header = [];
        if (newArray.length > 0) {
          Object.entries(newArray[0]).forEach(([key, value], index) => {
            header.push(key);
          });
        }
        console.log(header);
        saveAsExcel({ data: newArray, header: header });
      }
    });
  };
};

export const fetchAllCustomerSale = (store_code, page, params, limit) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    customerApi
      .fetchAllCustomerSale(store_code, page, params, limit)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        if (res.data.code !== 401)
          dispatch({
            type: Types.FETCH_ALL_CUSTOMER_SALE,
            data: res.data.data,
          });
      });
  };
};

export const destroyCustomerSale = (
  store_code,
  id,
  page,
  params,
  branch_id
) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    customerApi
      .destroyCustomerSale(store_code, id)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        customerApi
          .fetchAllCustomerSale(store_code, page, params)
          .then((res) => {
            if (res.data.code !== 401)
              dispatch({
                type: Types.FETCH_ALL_CUSTOMER_SALE,
                data: res.data.data,
              });
            dispatch({
              type: Types.ALERT_UID_STATUS,
              alert: {
                type: "success",
                title: "Thành công ",
                disable: "show",
                content: res.data.msg,
              },
            });
          })
          .catch(function (error) {
            dispatch({
              type: Types.ALERT_UID_STATUS,
              alert: {
                type: "danger",
                title: "Lỗi",
                disable: "show",
                content: error?.response?.data?.msg,
              },
            });
          });
      })
      .catch(function (error) {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        dispatch({
          type: Types.ALERT_UID_STATUS,
          alert: {
            type: "danger",
            title: "Lỗi",
            disable: "show",
            content: error?.response?.data?.msg,
          },
        });
      });
  };
};

export const fetchCustomerSaleId = (store_code, customerId) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    customerApi.fetchCustomerSaleId(store_code, customerId).then((res) => {
      dispatch({
        type: Types.SHOW_LOADING,
        loading: "hide",
      });
      if (res.data.code !== 401)
        dispatch({
          type: Types.FETCH_ID_CUSTOMER_SALE,
          data: res.data.data,
        });
    });
  };
};

export const createMultiCustomerSale = (store_code, data) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    customerApi
      .createMultiCustomerSale(store_code, data)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        dispatch({
          type: Types.ALERT_UID_STATUS,
          tryShow: true,
          alert: {
            type: "success",
            title: "Thành công ",
            disable: "show",
            content: `<div>
                <span>- Tổng số lượng import: ${res.data.data.total_customer_sale_request} </span></br>
                <span>     - Tổng số bỏ qua khi trùng SĐT: ${res.data.data.total_skip_same_phone_number}</span></br>
                <span>   - Tổng số thất bại: ${res.data.data.total_failed}</span></br>
                <span> - Tổng số được thêm mới: ${res.data.data.total_new_add}</span>
                          </div>
                `,
          },
        });

        customerApi.fetchAllCustomerSale(store_code, 1).then((res) => {
          if (res.data.code !== 401)
            dispatch({
              type: Types.FETCH_ALL_CUSTOMER_SALE,
              data: res.data.data,
            });
        });
      })
      .catch(function (error) {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });

        dispatch({
          type: Types.ALERT_UID_STATUS,
          alert: {
            type: "danger",
            title: "Lỗi",
            disable: "show",
            content:
              error?.response?.data?.msg || error?.response?.data?.message,
          },
        });
      });
  };
};

export const createCustomerSale = (
  store_code,
  id,
  funcModal = null,
  _this,
  resetModal
) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    customerApi
      .createCustomerSale(store_code, id)
      .then((res) => {
        if (res.data.success && funcModal != null) {
          funcModal();
          if (_this && resetModal) resetModal(_this);
        }
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        dispatch({
          type: Types.ALERT_UID_STATUS,
          tryShow: true,
          alert: {
            tryShow: true,
            type: "success",
            title: "Thành công ",
            disable: "show",
            content: res.data.msg,
          },
        });
        dispatch({
          type: Types.CREATED_CUSTOMER_SALE,
          isFromPosAndSave:
            id.isFromPosAndSave == null ? false : id.isFromPosAndSave,
          data: res.data.data,
        });

        if (id.isFromPosAndSave != true) {
          customerApi
            .fetchAllCustomerSale(store_code)
            .then((res) => {
              if (res.data.code !== 401)
                dispatch({
                  type: Types.FETCH_ALL_CUSTOMER_SALE,
                  data: res.data.data,
                });
            })
            .catch(function (error) {
              dispatch({
                type: Types.SHOW_LOADING,
                loading: "hide",
              });
              dispatch({
                type: Types.ALERT_UID_STATUS,
                alert: {
                  type: "danger",
                  title: "Lỗi",
                  disable: "show",
                  content: error?.response?.data?.msg,
                },
              });
            });
        }
      })
      .catch(function (error) {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });

        dispatch({
          type: Types.ALERT_UID_STATUS,
          alert: {
            type: "danger",
            title: "Lỗi",
            disable: "show",
            content: error?.response?.data?.msg,
          },
        });
      });
  };
};

export const editMultiCustomerSale = (store_code, data, _this) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    customerApi
      .editMultiCustomerSale(store_code, data)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        _this.setState({ selected: [] });
        customerApi
          .fetchAllCustomerSale(store_code, 1, null, 20)
          .then((res) => {
            dispatch({
              type: Types.ALERT_UID_STATUS,
              alert: {
                type: "success",
                title: "Thành công ",
                disable: "show",
                content: res.data.msg,
              },
            });
            if (res.data.code !== 401)
              dispatch({
                type: Types.FETCH_ALL_CUSTOMER_SALE,
                data: res.data.data,
              });
          });
      })
      .catch(function (error) {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });

        dispatch({
          type: Types.ALERT_UID_STATUS,
          alert: {
            type: "danger",
            title: "Lỗi",
            disable: "show",
            content: error?.response?.data?.msg,
          },
        });
      });
  };
};
export const editCustomerSale = (store_code, id, data, funcModal = null) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    customerApi
      .editCustomerSale(store_code, id, data)
      .then((res) => {
        if (res.data.success && funcModal != null) {
          console.log("da vao r");
          funcModal();
        }
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        customerApi.fetchCustomerSaleId(store_code, id).then((res) => {
          dispatch({
            type: Types.SHOW_LOADING,
            loading: "hide",
          });
          if (res.data.code !== 401)
            dispatch({
              type: Types.FETCH_ID_CUSTOMER_SALE,
              data: res.data.data,
            });
          dispatch({
            type: Types.ALERT_UID_STATUS,
            alert: {
              type: "success",
              title: "Thành công ",
              disable: "show",
              content: res.data.msg,
            },
          });
        });
      })
      .catch(function (error) {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });

        dispatch({
          type: Types.ALERT_UID_STATUS,
          alert: {
            type: "danger",
            title: "Lỗi",
            disable: "show",
            content: error?.response?.data?.msg,
          },
        });
      });
  };
};
export const createMultiAccountForCustomerSale = (store_code, data) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    customerApi
      .createMultiAccountForCustomerSale(store_code, data)
      .then((res) => {
        dispatch({
          type: Types.CREATE_ACCOUNT_FOR_CUSTOMER_SALE,
          data,
        });
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        dispatch({
          type: Types.ALERT_UID_STATUS,
          alert: {
            type: "success",
            title: "Thành công ",
            disable: "show",
            content: `<div>
            <p>- Tổng số yêu cầu: ${res.data.data.total_ids}</p>
            <p>- Số tài khoản đã tồn tại: ${res.data.data.total_has}</p>
            <p>- Số tài khoản vừa thêm: ${res.data.data.total_success}</p>
            </div>`,
          },
        });
      })
      .catch(function (error) {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        dispatch({
          type: Types.ALERT_UID_STATUS,
          alert: {
            type: "danger",
            title: "Lỗi",
            disable: "show",
            content: error?.response?.data?.msg,
          },
        });
      });
  };
};
