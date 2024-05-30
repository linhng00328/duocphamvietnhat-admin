import { Component } from "react";
import styled from "styled-components";
import ModalCustom from "../../ModalCustom/ModalCustom";
import $ from "jquery";
import * as XLSX from "xlsx";
import * as Types from "../../../constants/ActionType";
import { fields as fieldsProduct } from "./fields";
import { connect, shallowEqual } from "react-redux";
import * as productAction from "../../../actions/product";
const ModalChooseTypeImportStyles = styled.div`
  margin-top: 30px;
  .modalImport__content {
    .modalImport__btn {
      display: flex;
      justify-content: center;
      column-gap: 10px;
    }
    .modalImport__override {
      margin-bottom: 15px;
      display: flex;
      justify-content: center;
      align-items: center;
      column-gap: 5px;
      label {
        margin-bottom: 0;
      }
    }
    .modalImport__confirm {
      display: flex;
      justify-content: center;
      padding: 10px 0;
    }
  }
`;

class ModalChooseTypeImport extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { messageImport, setOpenModal } = this.props;
    if (
      Object.entries(nextProps).length > 0 &&
      !shallowEqual(messageImport, nextProps.messageImport)
    ) {
      setOpenModal(false);
    }

    return true;
  }

  handleImportOutSide = () => {
    $("#file-excel-import").trigger("click");
    this.props.setOpenModal(false);
  };
  handleImportIki = () => {
    $("#import_file_iki").trigger("click");
  };
  handleChangeOverride = (e) => {
    const { setAllowSkipSameName } = this.props;
    setAllowSkipSameName(e.target.checked);
  };
  handleChangeFile = (e) => {
    const { showError } = this.props;

    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
      const xlsxFields = data[0];
      //Check Valid XLSX Field
      let isCheckedValidField = true;
      if (fieldsProduct.length > xlsxFields.length) {
        isCheckedValidField = false;
      } else {
        fieldsProduct.forEach((field, index) => {
          if (field !== xlsxFields[index]) {
            isCheckedValidField = false;
            return;
          }
        });
      }
      if (!isCheckedValidField) {
        showError({
          type: Types.ALERT_UID_STATUS,
          alert: {
            type: "danger",
            title: "Lỗi",
            disable: "show",
            content: "Các trường trong file không hợp lệ!",
          },
        });
        return;
      }
      //Filter Data
      //Index: 0: "Tên sản phẩm", 1: "Mã SKU", 2: "Mã BARCODE", 3: "Theo dõi kho (Có/Không)", 4: "Danh mục", 5: "Thuộc tính", 6: "Thuộc tính tìm kiếm", 7: "Cân nặng(g)", 8: "Hoa hồng CTV (%/VND)", 9: "Xu cho đại lý", 10: "Mô tả", 11: "Nội dung cho CTV", 12: "Trạng thái (Ẩn/Hiện)", 13: "Tiêu đề SEO", 14: "Miêu tả SEO", 15: "Phân loại (Có/Không)", 16: "Phân loại chính", 17: "Phân loại phụ", 18: "DS phân loại", 19: "Giá bán lẻ", 20: "Giá nhập", 21: "Hình ảnh",

      //Index: 0: "Tên sản phẩm", 1: "Mã BARCODE", 2: "Theo dõi kho (Có/Không)", 3: "Vị trí kệ hàng" , 4: "Danh mục", 5: "Thuộc tính", 6: "Thuộc tính tìm kiếm", 7: "Cân nặng(g)", 8: "Hoa hồng CTV (%/VND)", 9: "Xu cho đại lý", 10: "Mô tả", 11: "Nội dung cho CTV", 12: "Trạng thái (Ẩn/Hiện)", 13: "Tiêu đề SEO", 14: "Miêu tả SEO", 15: "Phân loại (Có/Không)", 16: "Phân loại chính", 17: "Phân loại phụ", 18: "DS phân loại", 19: "Giá bán lẻ", 20: "Giá nhập", 21: "Mã SKU", 22: "Hình ảnh",

      const dataXlsxEmptyTitle = data.slice(1);
      const newProducts = [];

      let newDistributes = [];
      let isDistributeProduct = false;
      let nameElementDistribute = "";
      let newProductHasDistribute = {};
      let positionDistributeProduct = -1;
      dataXlsxEmptyTitle.forEach((product, index) => {
        const newProduct = {};

        if (product[15]?.toString().toLowerCase().trim() === "không") {
          newProduct["name"] = product[0];
          newProduct["barcode"] = product[1];
          newProduct["point_for_agency"] = product[9];
          newProduct["description"] = product[10];
          newProduct["content_for_collaborator"] = product[11];
          newProduct["status"] =
            product[12]?.toString().toLowerCase().trim() === "hiện" ? 0 : -1;
          newProduct["seo_title"] = product[13];
          newProduct["seo_description"] = product[14];
          if (product[8]?.includes("(VND)")) {
            const money_amount_collaborator = product[8]?.split("(VND)")?.[0];
            newProduct["percent_collaborator"] = 0;
            newProduct["money_amount_collaborator"] = Number(
              money_amount_collaborator
            );
            newProduct["type_share_collaborator_number"] = 1;
          } else if (product[8]?.includes("(%)")) {
            const percent_collaborator = product[8]?.split("(%)")?.[0];
            newProduct["percent_collaborator"] =
              Number(percent_collaborator) > 100
                ? 100
                : Number(percent_collaborator);
            newProduct["money_amount_collaborator"] = 0;
            newProduct["type_share_collaborator_number"] = 0;
          } else {
            newProduct["percent_collaborator"] = 0;
            newProduct["money_amount_collaborator"] = 0;
            newProduct["type_share_collaborator_number"] = 0;
          }

          if (product[2]?.toString().toLowerCase().trim() === "có") {
            newProduct["shelf_position"] = product[3];
            newProduct["check_inventory"] = true;
          } else {
            newProduct["shelf_position"] = "";
            newProduct["check_inventory"] = false;
          }
          // Hanlde Categories
          newProduct["list_category"] = product[4]
            ? product[4]
                ?.toString()
                .split(";")
                .reduce((prevCategory, currentCategory) => {
                  const newCategory = {};
                  const childs = currentCategory.substring(
                    currentCategory.indexOf("[") + 1,
                    currentCategory.lastIndexOf("]")
                  );
                  newCategory.name = currentCategory.split("[")[0];
                  newCategory.childs = !childs
                    ? []
                    : childs.split(",").map((childCategory) => childCategory);
                  return [...prevCategory, newCategory];
                }, [])
            : [];

          // Handle Attributes
          newProduct["list_attribute"] = !product[5]
            ? []
            : product[5]
                ?.toString()
                .split(";")
                .reduce((prevAttribute, currentAttribute) => {
                  const newAttribute = {};
                  newAttribute.name = currentAttribute.split(":")[0];
                  newAttribute.value = currentAttribute.split(":")[1];
                  return [...prevAttribute, newAttribute];
                }, []);
          // Handle Attribute Search
          // newProduct["attribute_search_children"] = product[6]
          //   ? product[6]?.toString().split(",")
          //   : [];
          newProduct["list_attribute_search"] = product[6]
            ? product[6]
                ?.toString()
                .split(";")
                .reduce((prevAttributeSearch, currentAttributeSearch) => {
                  const newAttributeSearch = {};
                  const childs = currentAttributeSearch.substring(
                    currentAttributeSearch.indexOf("[") + 1,
                    currentAttributeSearch.lastIndexOf("]")
                  );
                  newAttributeSearch.name =
                    currentAttributeSearch.split("[")[0];
                  newAttributeSearch.childs = !childs
                    ? []
                    : childs
                        .split(",")
                        .map((childAttributeSearch) => childAttributeSearch);
                  return [...prevAttributeSearch, newAttributeSearch];
                }, [])
            : [];

          newProduct["weight"] = product[7] ? Number(product[7]) : 0;
          newProduct["distributes"] = [];
          newProduct["sku"] = product[21] ? product[21] : null;
          newProduct["images"] = !product[22] ? [] : product[22].split(",");
          newProduct["price"] = !product[19] ? 0 : Number(product[19]);
          newProduct["import_price"] = !product[20] ? 0 : Number(product[20]);
          newProducts.push(newProduct);
        } else if (product[15]?.toString().toLowerCase().trim() === "có") {
          newProductHasDistribute["name"] = product[0];
          newProductHasDistribute["barcode"] = product[1];
          newProductHasDistribute["point_for_agency"] = product[9];
          newProductHasDistribute["description"] = product[10];
          newProductHasDistribute["content_for_collaborator"] = product[11];
          newProductHasDistribute["status"] =
            product[12]?.toString().toLowerCase().trim() === "hiện" ? 0 : -1;
          newProductHasDistribute["seo_title"] = product[13];
          newProductHasDistribute["seo_description"] = product[14];
          if (product[8]?.includes("(VND)")) {
            const money_amount_collaborator = product[8]?.split("(VND)")?.[0];
            newProductHasDistribute["percent_collaborator"] = 0;
            newProductHasDistribute["money_amount_collaborator"] = Number(
              money_amount_collaborator
            );
            newProductHasDistribute["type_share_collaborator_number"] = 1;
          } else if (product[8]?.includes("(%)")) {
            const percent_collaborator = product[8]?.split("(%)")?.[0];
            newProductHasDistribute["percent_collaborator"] =
              Number(percent_collaborator) > 100
                ? 100
                : Number(percent_collaborator);
            newProductHasDistribute["money_amount_collaborator"] = 0;
            newProductHasDistribute["type_share_collaborator_number"] = 0;
          } else {
            newProductHasDistribute["percent_collaborator"] = 0;
            newProductHasDistribute["money_amount_collaborator"] = 0;
            newProductHasDistribute["type_share_collaborator_number"] = 0;
          }
          if (product[2]?.toString().toLowerCase().trim() === "có") {
            newProductHasDistribute["shelf_position"] = product[3];
            newProductHasDistribute["check_inventory"] = true;
          } else {
            newProductHasDistribute["shelf_position"] = "";
            newProductHasDistribute["check_inventory"] = false;
          }
          newProductHasDistribute["sku"] = product[21] ? product[21] : null;
          newProductHasDistribute["images"] = !product[22]
            ? []
            : product[22].split(",");
          // Hanlde Categories
          newProductHasDistribute["list_category"] = product[4]
            ? product[4]
                ?.toString()
                .split(";")
                .reduce((prevCategory, currentCategory) => {
                  const newCategory = {};
                  const childs = currentCategory.substring(
                    currentCategory.indexOf("[") + 1,
                    currentCategory.lastIndexOf("]")
                  );
                  newCategory.name = currentCategory.split("[")[0];
                  newCategory.childs = !childs
                    ? []
                    : childs.split(",").map((childCategory) => childCategory);
                  return [...prevCategory, newCategory];
                }, [])
            : [];

          // Handle Attributes
          newProductHasDistribute["list_attribute"] = !product[5]
            ? []
            : product[5]
                ?.toString()
                .split(";")
                .reduce((prevAttribute, currentAttribute) => {
                  const newAttribute = {};
                  newAttribute.name = currentAttribute.split(":")[0];
                  newAttribute.value = currentAttribute.split(":")[1];
                  return [...prevAttribute, newAttribute];
                }, []);
          // Handle Attribute Search
          // newProductHasDistribute["attribute_search_children"] = product[6]
          //   ? product[6]?.toString().split(",")
          //   : [];
          newProductHasDistribute["list_attribute_search"] = product[6]
            ? product[6]
                ?.toString()
                .split(";")
                .reduce((prevAttributeSearch, currentAttributeSearch) => {
                  const newAttributeSearch = {};
                  const childs = currentAttributeSearch.substring(
                    currentAttributeSearch.indexOf("[") + 1,
                    currentAttributeSearch.lastIndexOf("]")
                  );
                  newAttributeSearch.name =
                    currentAttributeSearch.split("[")[0];
                  newAttributeSearch.childs = !childs
                    ? []
                    : childs
                        .split(",")
                        .map((childAttributeSearch) => childAttributeSearch);
                  return [...prevAttributeSearch, newAttributeSearch];
                }, [])
            : [];

          newProductHasDistribute["weight"] = product[7]
            ? Number(product[7])
            : 0;
          const dataDistribute = {
            name: product[16],
            sub_element_distribute_name: !product[17] ? "" : product[17],
            element_distributes: [],
          };
          newDistributes.push(dataDistribute);
          // } else if (product[20]) {
        } else {
          const nameProductDistributeTemp = product[18]
            ? product[18]?.toString().split(",")[0]
            : "";
          const nameProductSubDistributeTemp = product[18]
            ? product[18]?.toString().split(",")[1]
            : "";
          const imagesProductDistributeTemp = !product[22]
            ? ""
            : product[22]?.split(",");
          isDistributeProduct = true;
          if (nameElementDistribute !== nameProductDistributeTemp) {
            positionDistributeProduct++;
            newDistributes[0]["element_distributes"].push({
              name: nameProductDistributeTemp,
              price: nameProductDistributeTemp
                ? !product[19]
                  ? 0
                  : Number(product[19])
                : 0,
              import_price: nameProductDistributeTemp
                ? !product[20]
                  ? 0
                  : Number(product[20])
                : 0,
              sku: !nameProductSubDistributeTemp
                ? !product[21]
                  ? null
                  : product[21]
                : null,
              image_url: imagesProductDistributeTemp
                ? imagesProductDistributeTemp[0]
                : "",
              sub_element_distributes: [],
            });
            nameElementDistribute = nameProductDistributeTemp;
          }
          if (nameProductSubDistributeTemp) {
            newDistributes[0]["element_distributes"][positionDistributeProduct][
              "sub_element_distributes"
            ].push({
              name: nameProductSubDistributeTemp,
              price: !product[19] ? 0 : Number(product[19]),
              import_price: !product[20] ? 0 : Number(product[20]),
              sku: !product[21] ? null : product[21],
            });
          }
        }
        if (
          isDistributeProduct === true &&
          index !== dataXlsxEmptyTitle.length - 1 &&
          dataXlsxEmptyTitle[index + 1][0]
        ) {
          newProductHasDistribute["distributes"] = newDistributes;
          newProducts.push({ ...newProductHasDistribute });
          newDistributes = [];
          isDistributeProduct = false;
          nameElementDistribute = "";
          positionDistributeProduct = -1;
          newProduct["distributes"] = [];
        } else if (
          isDistributeProduct === true &&
          index === dataXlsxEmptyTitle.length - 1
        ) {
          newProductHasDistribute["distributes"] = newDistributes;
          newProducts.push({ ...newProductHasDistribute });
          newDistributes = [];
          isDistributeProduct = false;
          nameElementDistribute = "";
          positionDistributeProduct = -1;
          newProduct["distributes"] = [];
        }
      });

      //Add products to server
      const { store_code, allow_skip_same_name, postMultiProduct } = this.props;
      const dataPostProducts = {
        allow_skip_same_name,
        list: newProducts,
      };

      postMultiProduct(store_code, dataPostProducts);
    };
    document.getElementById("import_file_iki").value = null;
    reader.readAsBinaryString(file);
  };

  handleCloseModal = (isClosed) => {
    const { setOpenModal } = this.props;
    setOpenModal(isClosed);
  };
  render() {
    const { openModal, allow_skip_same_name } = this.props;
    return (
      <ModalCustom
        title="Chọn loại import"
        openModal={openModal}
        setOpenModal={this.handleCloseModal}
        style={{
          height: "200px",
        }}
        styleHeader={{
          color: "black",
        }}
      >
        <ModalChooseTypeImportStyles>
          <div className="modalImport__content">
            <input
              type="file"
              id="import_file_iki"
              hidden
              onChange={this.handleChangeFile}
            />
            <div className="modalImport__override">
              <input
                type="checkbox"
                onChange={this.handleChangeOverride}
                id="overridePermission"
                checked={allow_skip_same_name}
              />
              <label for="overridePermission">
                Cho phép bỏ qua các sản phẩm trùng tên
              </label>
            </div>
            <div className="modalImport__btn">
              <button
                className="btn btn-outline-success"
                onClick={this.handleImportIki}
              >
                Import từ IKITECH
              </button>
              <button
                className="btn btn-outline-primary"
                onClick={this.handleImportOutSide}
              >
                Import từ bên ngoài
              </button>
            </div>
          </div>
        </ModalChooseTypeImportStyles>
      </ModalCustom>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    messageImport: state.productReducers.product.messageImport,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    showError: (error) => {
      dispatch(error);
    },
    postMultiProduct: (store_code, data) => {
      dispatch(productAction.postMultiProduct(store_code, data));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalChooseTypeImport);
