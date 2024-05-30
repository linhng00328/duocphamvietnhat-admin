import React, { Component } from "react";
import styled from "styled-components";
import ModalCustom from "../../components/ModalCustom/ModalCustom";
import $ from "jquery";
const ModalChooseImportStyles = styled.div`
  margin-top: 20px;
  .modalImport__content {
    .modalImport__btn {
      display: flex;
      justify-content: center;
      column-gap: 10px;
    }
    .modalImport__password {
      text-align: center;
      color: #858796;
    }
    .modalImport__override {
      margin-bottom: 5px;
      display: flex;
      justify-content: center;
      align-items: center;
      column-gap: 5px;
      label {
        margin-bottom: 0;
      }
    }
  }
`;
class ModalUpdatePasswordImport extends Component {
  
  handleChangeUpdatePasswordImport = (e) => {
    const { setIsUpdatedPasswordImport } = this.props;
    setIsUpdatedPasswordImport(e.target.checked);
  };
  
  handleImportDataCustomers = () => {
    $("#file-excel-import-customer").trigger("click");
  };

  render() {
    const { openModal, setOpenModal } = this.props;
    return (
      <ModalCustom
        title="Import dữ liệu"
        openModal={openModal}
        setOpenModal={setOpenModal}
        style={{
          height: "200px",
          width: "600px",
        }}
      >
        <ModalChooseImportStyles>
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
                id="updatePermission"
                onChange={this.handleChangeUpdatePasswordImport}
              />
              <label
                for="updatePermission"
                style={{
                  whiteSpace: "wrap",
                }}
              >
                Cho phép thay đổi mật khẩu của khách hàng đã tồn tại trong hệ
                thống
              </label>
            </div>
            <p className="modalImport__password">
              Mật khẩu thay đổi mặc định: 123456
            </p>
            <div className="modalImport__btn">
              <button
                className="btn btn-outline-success"
                onClick={this.handleImportDataCustomers}
              >
                Import dữ liệu khách hàng
              </button>
            </div>
          </div>
        </ModalChooseImportStyles>
      </ModalCustom>
    );
  }
}

export default ModalUpdatePasswordImport;
