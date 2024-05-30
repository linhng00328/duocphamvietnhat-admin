import * as Types from "../constants/ActionType";
import history from "../history";
import * as productApi from "../data/remote/product";
import * as attributePApi from "../data/remote/attribute_product";
import * as uploadApi from "../data/remote/upload";
import { compressed, formatStringCharactor } from "../ultis/helpers";
import { saveAs } from "file-saver";
import XlsxPopulate, { RichText } from "xlsx-populate";
import { getBranchId, getBranchIds } from "../ultis/branchUtils";

export const fetchAllProduct = (
  store_code,
  page = 1,
  params,
  agency_type_id
) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    productApi
      .fetchAllData(store_code, page, params, agency_type_id)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        if (res.data.code !== 401)
          dispatch({
            type: Types.FETCH_ALL_PRODUCT,
            data: res.data.data,
          });
      });
  };
};

export const fetchAllProductV2 = (
  store_code,
  branch_id,
  page = 1,
  params,
  agency_type_id
) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    productApi
      .fetchAllProductV2(store_code, branch_id, page, params, agency_type_id)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });

        if (res.data.code === 200)
          dispatch({
            type: Types.FETCH_ALL_PRODUCT,
            data: res.data.data,
          });
      });
  };
};

export const fetchAllProductEcommerce = (store_code, page = 1, data) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    productApi.fetchAllProductEcommerce(store_code, page, data).then((res) => {
      dispatch({
        type: Types.SHOW_LOADING,
        loading: "hide",
      });
      if (res.data.code !== 401) {
        if (data.provider == "tiki") {
          dispatch({
            type: Types.FETCH_ALL_PRODUCT_TIKI,
            data: res.data.data,
          });
        } else if (data.provider == "shopee") {
          {
            dispatch({
              type: Types.FETCH_ALL_PRODUCT_SHOPEE,
              data: res.data.data,
            });
          }
        } else {
          {
            dispatch({
              type: Types.FETCH_ALL_PRODUCT_SENDO,
              data: res.data.data,
            });
          }
        }
      }
    });
  };
};

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

async function saveAsExcel(value, nameFile = "Danh sách sản phẩm") {
  var data = value.data;
  var data_header = value.header;
  XlsxPopulate.fromBlankAsync().then(async (workbook) => {
    const sheet1 = workbook.sheet(0);
    const sheetData = getSheetData(data, data_header);
    const totalColumns = sheetData[0].length;

    sheet1.cell("A1").value(sheetData);

    const range = sheet1.usedRange();
    const endColumn = String.fromCharCode(64 + totalColumns);
    sheet1.row(1).style("bold", true);
    const listColumn = [
      {
        name: "A",
        width: 14,
        style: {
          fontSize: 8,
          shrinkToFit: true,
          wrapText: true,
        },
      },
      {
        name: "B",
        width: 9,
        style: {
          fontSize: 8,
          shrinkToFit: true,
          wrapText: true,
        },
      },
      {
        name: "C",
        width: 9,
        style: {
          fontSize: 8,
          shrinkToFit: true,
          wrapText: true,
        },
      },
      {
        name: "D",
        width: 9,
        style: {
          fontSize: 8,
          shrinkToFit: true,
          wrapText: true,
        },
      },
      {
        name: "E",
        width: 8,
        style: {
          fontSize: 8,
          shrinkToFit: true,
          wrapText: true,
        },
      },
      {
        name: "F",
        width: 10,
        style: {
          fontSize: 8,
          shrinkToFit: true,
          wrapText: true,
        },
      },
      {
        name: "G",
        width: 7,
        style: {
          fontSize: 8,
          shrinkToFit: true,
          wrapText: true,
        },
      },
      {
        name: "H",
        width: 7,
        style: {
          fontSize: 8,
          shrinkToFit: true,
          wrapText: true,
        },
      },
      {
        name: "I",
        width: 5,
        style: {
          fontSize: 8,
          shrinkToFit: true,
          wrapText: true,
        },
      },
      {
        name: "J",
        width: 7,
        style: {
          fontSize: 8,
          shrinkToFit: true,
          wrapText: true,
        },
      },
      {
        name: "K",
        width: 7,
        style: {
          fontSize: 8,
          shrinkToFit: true,
          wrapText: true,
        },
      },
      {
        name: "L",
        width: 8,
        style: {
          fontSize: 8,
          shrinkToFit: true,
          wrapText: true,
        },
      },
      {
        name: "M",
        width: 8,
        style: {
          fontSize: 8,
          shrinkToFit: true,
          wrapText: true,
        },
      },
      {
        name: "N",
        width: 8,
        style: {
          fontSize: 8,
          shrinkToFit: true,
          wrapText: true,
        },
      },
      {
        name: "O",
        width: 8,
        style: {
          fontSize: 8,
          shrinkToFit: true,
          wrapText: true,
        },
      },
      {
        name: "P",
        width: 8,
        style: {
          fontSize: 8,
          shrinkToFit: true,
          wrapText: true,
        },
      },
      {
        name: "Q",
        width: 9,
        style: {
          fontSize: 8,
          shrinkToFit: true,
          wrapText: true,
        },
      },
      {
        name: "R",
        width: 7,
        style: {
          fontSize: 8,
          shrinkToFit: true,
          wrapText: true,
        },
      },
      {
        name: "S",
        width: 7,
        style: {
          fontSize: 8,
          shrinkToFit: true,
          wrapText: true,
        },
      },
      {
        name: "T",
        width: 10,
        style: {
          fontSize: 8,
          shrinkToFit: true,
          wrapText: true,
        },
      },
      {
        name: "U",
        width: 9,
        style: {
          fontSize: 8,
          shrinkToFit: true,
          wrapText: true,
        },
      },
      {
        name: "V",
        width: 9,
        style: {
          fontSize: 8,
          shrinkToFit: true,
          wrapText: true,
        },
      },
      {
        name: "W",
        width: 12,
        style: {
          fontSize: 8,
          shrinkToFit: true,
          wrapText: true,
        },
      },
    ];
    for (let column of listColumn) {
      sheet1.column(column.name).style(column.style);
      sheet1.column(column.name).width(column.width);
    }

    sheet1.range("A1:" + endColumn + "1").style({
      horizontalAlignment: "center",
      verticalAlignment: "center",
      wrapText: true,
    });
    const row = sheet1.row(1);
    row.height(50);

    sheet1.range("A1:L1").style("fill", "deebf7");
    sheet1.range("M1:" + endColumn + "1").style("fill", "f6f9d4");
    // range.style("border", true);
    sheet1.freezePanes(1, 1);
    return workbook.outputAsync().then((res) => {
      saveAs(res, `${nameFile}.xlsx`);
    });
  });
}
async function saveAsExcelProduct(value, nameFile = "Danh sách sản phẩm") {
  var data = value.data;
  var data_header = value.header;
  XlsxPopulate.fromBlankAsync().then(async (workbook) => {
    const sheet1 = workbook.sheet(0);
    const sheetData = getSheetData(data, data_header);
    const totalColumns = sheetData[0].length;

    sheet1.name("DS sản phẩm");
    sheet1.cell("A1").value(sheetData);

    const range = sheet1.usedRange();
    const endColumn = String.fromCharCode(64 + totalColumns);
    sheet1.row(1).style("bold", true);
    const listColumn = [
      {
        name: "A",
        width: 14,
        style: {
          fontSize: 8,
          shrinkToFit: true,
          wrapText: true,
        },
      },
      {
        name: "B",
        width: 9,
        style: {
          fontSize: 8,
          shrinkToFit: true,
          wrapText: true,
        },
      },
      {
        name: "C",
        width: 9,
        style: {
          fontSize: 8,
          shrinkToFit: true,
          wrapText: true,
        },
      },
      {
        name: "D",
        width: 9,
        style: {
          fontSize: 8,
          shrinkToFit: true,
          wrapText: true,
        },
      },
      {
        name: "E",
        width: 8,
        style: {
          fontSize: 8,
          shrinkToFit: true,
          wrapText: true,
        },
      },
      {
        name: "F",
        width: 10,
        style: {
          fontSize: 8,
          shrinkToFit: true,
          wrapText: true,
        },
      },
      {
        name: "G",
        width: 7,
        style: {
          fontSize: 8,
          shrinkToFit: true,
          wrapText: true,
        },
      },
      {
        name: "H",
        width: 7,
        style: {
          fontSize: 8,
          shrinkToFit: true,
          wrapText: true,
        },
      },
      {
        name: "I",
        width: 7,
        style: {
          fontSize: 8,
          shrinkToFit: true,
          wrapText: true,
        },
      },
      {
        name: "J",
        width: 7,
        style: {
          fontSize: 8,
          shrinkToFit: true,
          wrapText: true,
        },
      },
      {
        name: "K",
        width: 7,
        height: 10,
        style: {
          fontSize: 8,
          shrinkToFit: true,
          wrapText: true,
        },
      },
      {
        name: "L",
        width: 8,
        style: {
          fontSize: 8,
          shrinkToFit: true,
          wrapText: true,
        },
      },
      {
        name: "M",
        width: 8,
        style: {
          fontSize: 8,
          shrinkToFit: true,
          wrapText: true,
        },
      },
      {
        name: "N",
        width: 8,
        style: {
          fontSize: 8,
          shrinkToFit: true,
          wrapText: true,
        },
      },
      {
        name: "O",
        width: 8,
        style: {
          fontSize: 8,
          shrinkToFit: true,
          wrapText: true,
        },
      },
      {
        name: "P",
        width: 11,
        style: {
          fontSize: 8,
          shrinkToFit: true,
          wrapText: true,
        },
      },
      {
        name: "Q",
        width: 9,
        style: {
          fontSize: 8,
          shrinkToFit: true,
          wrapText: true,
        },
      },
      {
        name: "R",
        width: 7,
        style: {
          fontSize: 8,
          shrinkToFit: true,
          wrapText: true,
        },
      },
      {
        name: "S",
        width: 7,
        style: {
          fontSize: 8,
          shrinkToFit: true,
          wrapText: true,
        },
      },
      {
        name: "T",
        width: 10,
        style: {
          fontSize: 8,
          shrinkToFit: true,
          wrapText: true,
        },
      },
      {
        name: "U",
        width: 9,
        style: {
          fontSize: 8,
          shrinkToFit: true,
          wrapText: true,
        },
      },
      {
        name: "V",
        width: 9,
        style: {
          fontSize: 8,
          shrinkToFit: true,
          wrapText: true,
        },
      },
      {
        name: "W",
        width: 12,
        style: {
          fontSize: 8,
          shrinkToFit: true,
          wrapText: true,
        },
      },
    ];
    for (let column of listColumn) {
      sheet1.column(column.name).style(column.style);
      sheet1.column(column.name).width(column.width);
    }

    for (var i = 2; i < data.length + 1; i++) {
      const row = sheet1.row(i);
      row.height(20);
    }

    const columnsToApplyValidation = [
      {
        title: "A",
        data: {
          type: "string",
          allowBlank: false,
          showInputMessage: true,
          prompt: "Tên sản phẩm là trường bắt buộc",
          promptTitle: "Chú ý",
        },
      },
      {
        title: "C",
        data: {
          type: "list",
          showDropDown: true,
          prompt: "Chỉ được chọn giá trị trong Droplist",
          promptTitle: "Chú ý",
          allowBlank: false,
          showInputMessage: true,
          showErrorMessage: true,
          errorTitle: "Chú ý",
          error: "Chỉ được chọn giá trị trong Droplist",
          operator: "between",
          formula1: '"Có, Không"',
          formula2: '"Có, Không"',
        },
      },
      {
        title: "H",
        data: {
          type: "custom",
          allowBlank: true,
          showInputMessage: true,
          prompt: "Chỉ được nhập ký tự số",
          promptTitle: "Chú ý",
          showErrorMessage: true,
          errorTitle: "Chú ý",
          error: "Chỉ được nhập ký tự số",
          operator: "between",
          formula1: "=ISNUMBER(H2)",
          formula2: "=ISNUMBER(H2)",
        },
      },
      {
        title: "I",
        data: {
          type: "string",
          allowBlank: false,
          showInputMessage: true,
          prompt: "Nếu là %(0% <= Hoa hồng CTV <= 100%)",
          promptTitle: "Chú ý",
        },
      },
      {
        title: "J",
        data: {
          type: "custom",
          allowBlank: true,
          showInputMessage: true,
          prompt: "Chỉ được nhập ký tự số",
          promptTitle: "Chú ý",
          showErrorMessage: true,
          errorTitle: "Chú ý",
          error: "Chỉ được nhập ký tự số",
          operator: "between",
          formula1: "=ISNUMBER(J2)",
          formula2: "=ISNUMBER(J2)",
        },
      },
      {
        title: "M",
        data: {
          type: "list",
          showDropDown: true,
          prompt: "Trạng thái sản phẩm chỉ được chọn theo giá trị Droplist",
          promptTitle: "Chú ý",
          allowBlank: false,
          showInputMessage: true,
          showErrorMessage: true,
          errorTitle: "Chú ý",
          error: "Chỉ được chọn giá trị trong Droplist",
          operator: "between",
          formula1: '"Hiện, Ẩn"',
          formula2: '"Hiện, Ẩn"',
        },
      },
      {
        title: "P",
        data: {
          type: "list",
          showDropDown: true,
          prompt: "Trường bắt buộc, người dùng phải chọn giá trị",
          promptTitle: "Chú ý",
          allowBlank: false,
          showInputMessage: true,
          showErrorMessage: true,
          errorTitle: "Chú ý",
          error: "Chỉ được chọn giá trị trong Droplist",
          formula1: '"Có, Không"',
          formula2: '"Có, Không"',
        },
      },
      {
        title: "T",
        data: {
          type: "string",
          allowBlank: false,
          showInputMessage: true,
          prompt: "Chỉ được phép nhập ký tự số",
          promptTitle: "Chú ý",
        },
      },
      {
        title: "U",
        data: {
          type: "string",
          allowBlank: false,
          showInputMessage: true,
          prompt: "Chỉ được phép nhập ký tự số",
          promptTitle: "Chú ý",
        },
      },
      {
        title: "V",
        data: {
          type: "string",
          allowBlank: false,
          showInputMessage: true,
          prompt:
            "Trường bắt buộc, phải nhập mã sku. Nếu có phân loại thì phải nhập mã sku theo phân loại",
          promptTitle: "Chú ý",
        },
      },
    ];

    for (const column of columnsToApplyValidation) {
      try {
        const range = sheet1.range(
          `${column.title}2:${column.title}` + data.length + 1
        );

        range.dataValidation(column.data);
      } catch (error) {
        console.error(
          `Lỗi khi áp dụng kiểm tra cho cột ${column.title}:`,
          error
        );
      }
    }

    //Chuyển màu required
    const cellA1 = workbook.sheet(0).cell("A1");
    cellA1.value(new RichText());
    cellA1
      .value()
      .add("Tên sản phẩm", {
        bold: true,
        fontSize: 8,
      })
      .add("(*)", {
        bold: true,
        fontSize: 8,
        fontColor: "FF0000",
      });

    const cellP1 = workbook.sheet(0).cell("P1");
    cellP1.value(new RichText());
    cellP1
      .value()
      .add("Phân loại(Có/Không)", {
        bold: true,
        fontSize: 8,
      })
      .add("(*)", {
        bold: true,
        fontSize: 8,
        fontColor: "FF0000",
      });

    const cellV1 = workbook.sheet(0).cell("V1");
    cellV1.value(new RichText());
    cellV1
      .value()
      .add("Mã SKU", {
        bold: true,
        fontSize: 8,
      })
      .add("(*)", {
        bold: true,
        fontSize: 8,
        fontColor: "FF0000",
      });

    sheet1.range("A1:" + endColumn + "1").style({
      horizontalAlignment: "center",
      verticalAlignment: "center",
      wrapText: true,
    });
    const row = sheet1.row(1);
    row.height(50);

    // //
    sheet1.range("A1:P1").style("fill", "d9d9d9");
    sheet1.range("Q1:" + endColumn + "1").style("fill", "bfbfbf");
    range.style("border", true);
    sheet1.freezePanes(1, 1);

    //Sheet 2 hướng dẫn
    sheetTemplate(workbook, endColumn, listColumn);

    // Duyệt qua tất cả các ô trong file Excel
    workbook.sheets().forEach((sheet) => {
      sheet.usedRange().forEach((cell) => {
        // Thiết lập font cho mỗi ô thành Times New Roman
        cell.style("fontFamily", "Times New Roman");
      });
    });

    return workbook.outputAsync().then((res) => {
      saveAs(res, `${nameFile}.xlsx`);
    });
  });
}

function sheetTemplate(workbook, endColumn, listColumn) {
  const sheetTemplate = workbook.addSheet("Form mẫu");
  sheetTemplate.name("Form mẫu");
  sheetTemplate.row(1).style("bold", true);

  const data_sheet2 = [
    [
      "Tên sản phẩm",
      "Mã BARCODE",
      "Theo dõi kho (Có/Không)",
      "Vị trí kệ hàng",
      "Danh mục",
      "Thuộc tính",
      "Thuộc tính tìm kiếm",
      "Cân nặng(g)",
      "Hoa hồng CTV (%/VND)",
      "Xu cho đại lý",
      "Mô tả",
      "Nội dung cho CTV",
      "Trạng thái (Ẩn/Hiện)",
      "Tiêu đề SEO",
      "Miêu tả SEO",
      "Phân loại(Có/Không)",
      "Phân loại chính",
      "Phân loại phụ",
      "DS phân loại",
      "Giá bán lẻ",
      "Giá nhập",
      "Mã SKU",
      "Hình ảnh",
    ],
    [
      "Set Vest thanh lịch",
      "18852424",
      "Có",
      "10",
      "Thời trang[Công sở,Thanh lịch];Đồ bộ",
      "Xuất xứ:Việt Nam;Đối tượng sử dụng:Phụ nữ 30-50 tuổi",
      "Vest nữ;Đồ công sở",
      "800",
      "20(%)",
      "100",
      "Thiết kế được biến tấu từ áo khoác cổ hai ve cổ điển bên cạnh dáng croptop trẻ trung, hiện đại.",
      "",
      "Hiện",
      "",
      "",
      "Có",
      "Màu",
      "Kích thước",
      "",
      "",
      "",
      "",
      "https://prnt.sc/n20h41bhBi34",
    ],
    [
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "Đen,S",
      "1100000",
      "800000",
      "SH8542615",
      "",
    ],
    [
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "Đen,M",
      "1100000",
      "800000",
      "SH8542616",
      "",
    ],
    [
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "Be,S",
      "1100000",
      "800000",
      "SH8542617",
      "",
    ],
    [
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "Be,M",
      "1100000",
      "800000",
      "SH8542618",
      "",
    ],
    [
      "Kem Rửa Mặt Có Hạt Sạch Sâu Oxy Deep Wash (100g)",
      "58423621",
      "Không",
      "",
      "Mỹ phẩm[Sữa rửa mặt]",
      "Xuất xứ:Việt Nam",
      "Kem rửa mặt",
      "50",
      "1000(VND)",
      "10",
      "Thiết kế hiện đại.",
      "",
      "Ẩn",
      "",
      "",
      "Không",
      "",
      "",
      "",
      "100000",
      "75000",
      "81815272",
      "https://salt.tikicdn.com/cache/280x280/ts/product/29/83/85/073a118a19ecfdf7e84bbbf2be8ec025.jpg?new-width=320&image-type=webp",
    ],
  ];

  sheetTemplate.cell("A1").value(data_sheet2);

  for (let column of listColumn) {
    sheetTemplate.column(column.name).style(column.style);
    sheetTemplate.column(column.name).width(column.width);
  }

  //Chuyển màu required
  const cellA1Template = sheetTemplate.cell("A1");
  cellA1Template.value(new RichText());
  cellA1Template
    .value()
    .add("Tên sản phẩm", {
      bold: true,
      fontSize: 8,
    })
    .add("(*)", {
      bold: true,
      fontSize: 8,
      fontColor: "FF0000",
    });

  const cellP1Template = sheetTemplate.cell("P1");
  cellP1Template.value(new RichText());
  cellP1Template
    .value()
    .add("Phân loại(Có/Không)", {
      bold: true,
      fontSize: 8,
    })
    .add("(*)", {
      bold: true,
      fontSize: 8,
      fontColor: "FF0000",
    });

  const cellV1Template = sheetTemplate.cell("V1");
  cellV1Template.value(new RichText());
  cellV1Template
    .value()
    .add("Mã SKU", {
      bold: true,
      fontSize: 8,
    })
    .add("(*)", {
      bold: true,
      fontSize: 8,
      fontColor: "FF0000",
    });

  sheetTemplate.range("A1:" + endColumn + "1").style({
    horizontalAlignment: "center",
    verticalAlignment: "center",
    wrapText: true,
  });
  const row2 = sheetTemplate.row(1);
  row2.height(50);

  const range = sheetTemplate.usedRange();
  range.style("border", true);
  sheetTemplate.range("A1:P1").style("fill", "d9d9d9");
  sheetTemplate.range("Q1:" + endColumn + "1").style("fill", "bfbfbf");

  sheetTemplate.cell("B12").value(new RichText()).value().add("Lưu ý", {
    bold: true,
    fontSize: 10,
    fontColor: "FF0000",
  });

  // Tạo ô, gán giá trị và merge

  const noteRange = [
    {
      range: "B14:D15",
      value: "Trường/Cột",
      style: {
        fill: "9dc3e6",
        bold: true,
        horizontalAlignment: "center",
        verticalAlignment: "center",
        fontSize: 14,
        border: true,
      },
    },
    {
      range: "E14:I15",
      value: "Form giá trị nhập vào",
      style: {
        fill: "9dc3e6",
        bold: true,
        horizontalAlignment: "center",
        verticalAlignment: "center",
        fontSize: 14,
        border: true,
      },
    },
    {
      range: "J14:N15",
      value: "Ví dụ",
      style: {
        fill: "9dc3e6",
        bold: true,
        horizontalAlignment: "center",
        verticalAlignment: "center",
        fontSize: 14,
        border: true,
      },
    },
    {
      range: "B16:D16",
      value: "Danh mục",
      style: {
        horizontalAlignment: "center",
        verticalAlignment: "center",
        fontSize: 12,
        border: true,
      },
    },
    {
      range: "E16:I16",
      value: "DanhMucCha1[Con1,Con2];DanhMucCha2[Con1,Con2];DanhMucCha3",
      style: {
        horizontalAlignment: "left",
        verticalAlignment: "top",
        fontSize: 12,
        border: true,
      },
    },
    {
      range: "J16:N16",
      value: "Váy[Váy thu đông,Váy hè];Mỹ phẩm[Son,Sữa rửa mặt];Đồ bộ thể thao",
      style: {
        horizontalAlignment: "left",
        verticalAlignment: "top",
        fontSize: 12,
        border: true,
      },
    },
    {
      range: "B17:D17",
      value: "Thuộc tính",
      style: {
        horizontalAlignment: "center",
        verticalAlignment: "center",
        fontSize: 12,
        border: true,
      },
    },
    {
      range: "E17:I17",
      value:
        "ThuocTinh1_Name:ThuocTinh1_Value;ThuocTinh2_Name:ThuocTinh2_Value",
      style: {
        horizontalAlignment: "left",
        verticalAlignment: "top",
        fontSize: 12,
        border: true,
      },
    },
    {
      range: "J17:N17",
      value: "Xuất xứ:Việt Nam;Đối tượng sử dụng:Người tập gym",
      style: {
        horizontalAlignment: "left",
        verticalAlignment: "top",
        fontSize: 12,
        border: true,
      },
    },
    {
      range: "B18:D18",
      value: "Thuộc tính tìm kiếm",
      style: {
        horizontalAlignment: "center",
        verticalAlignment: "center",
        fontSize: 12,
        border: true,
      },
    },
    {
      range: "E18:I18",
      value: "TTTKCha1[TTTKCon1,TTTKCon2];TTTKCha2[TTTKCon1,TTTKCon2]",
      style: {
        horizontalAlignment: "left",
        verticalAlignment: "top",
        fontSize: 12,
        border: true,
      },
    },
    {
      range: "J18:N18",
      value: "Giá cả[Giá rẻ, giá vừa, giá đắt];Kích thước[Lớn,nhỏ]",
      style: {
        horizontalAlignment: "left",
        verticalAlignment: "top",
        fontSize: 12,
        border: true,
      },
    },
    {
      range: "B19:D20",
      value: "Hoa hồng CTV(%/VND)",
      style: {
        horizontalAlignment: "center",
        verticalAlignment: "center",
        fontSize: 12,
        border: true,
      },
    },
    {
      range: "E19:I19",
      value: "Tylephantram(%)",
      style: {
        horizontalAlignment: "left",
        verticalAlignment: "top",
        fontSize: 12,
        border: true,
      },
    },
    {
      range: "E20:I20",
      value: "Giatri(VND)",
      style: {
        horizontalAlignment: "left",
        verticalAlignment: "top",
        fontSize: 12,
        border: true,
      },
    },
    {
      range: "J19:N19",
      value: "20(%)",
      style: {
        horizontalAlignment: "left",
        verticalAlignment: "top",
        fontSize: 12,
        border: true,
      },
    },
    {
      range: "J20:N20",
      value: "200000(VND)",
      style: {
        horizontalAlignment: "left",
        verticalAlignment: "top",
        fontSize: 12,
        border: true,
      },
    },
    {
      range: "B21:D22",
      value: "Danh sách phân loại",
      style: {
        horizontalAlignment: "center",
        verticalAlignment: "center",
        fontSize: 12,
        border: true,
      },
    },
    {
      range: "E21:I22",
      value: "PhanLoaiChinh_Value, PhanLoaiPhu_Value",
      style: {
        horizontalAlignment: "left",
        verticalAlignment: "top",
        fontSize: 12,
        border: true,
      },
    },
    {
      range: "J21:N22",
      value: "Đen,M",
      style: {
        horizontalAlignment: "left",
        verticalAlignment: "top",
        fontSize: 12,
        border: true,
      },
    },
  ];

  for (let item of noteRange) {
    const mergedRange = sheetTemplate.range(item.range);
    mergedRange.merged(true);
    mergedRange.value(item.value);
    mergedRange.style(item.style);
    sheetTemplate.row(16).height(50);
    sheetTemplate.row(17).height(50);
    sheetTemplate.row(18).height(50);
    sheetTemplate.row(19).height(25);
    sheetTemplate.row(20).height(25);
    sheetTemplate.row(21).height(50);
  }
}

async function saveAsSheetInventoryExcel(value, nameFile = "DS_kiem_kho") {
  var data = value.data;
  var data_header = value.header;
  XlsxPopulate.fromBlankAsync().then(async (workbook) => {
    const sheet1 = workbook.sheet(0);
    const sheetData = getSheetData(data, data_header);
    const totalColumns = sheetData[0].length;

    sheet1.cell("A1").value(sheetData);

    const range = sheet1.usedRange();
    const endColumn = String.fromCharCode(64 + totalColumns);
    sheet1.row(1).style("bold", true);

    const listColumn = [
      {
        name: "A",
        width: 18,
        style: {
          fontSize: 8,
          shrinkToFit: true,
          wrapText: true,
        },
      },
      {
        name: "B",
        width: 30,
        style: {
          fontSize: 8,
          shrinkToFit: true,
          wrapText: true,
        },
      },
      {
        name: "C",
        width: 12,
        style: {
          fontSize: 8,
          shrinkToFit: true,
          wrapText: true,
        },
      },
      {
        name: "D",
        width: 15,
        style: {
          fontSize: 8,
          shrinkToFit: true,
          wrapText: true,
        },
      },
      {
        name: "E",
        width: 20,
        style: {
          fontSize: 8,
          shrinkToFit: true,
          wrapText: true,
        },
      },
    ];
    for (let column of listColumn) {
      sheet1.column(column.name).style(column.style);
      sheet1.column(column.name).width(column.width);
    }

    sheet1.range("A1:" + endColumn + "1").style({
      horizontalAlignment: "center",
      verticalAlignment: "center",
      wrapText: true,
    });
    const row = sheet1.row(1);
    row.height(50);

    // range.style("border", true);
    sheet1.freezePanes(1, 1);
    return workbook.outputAsync().then((res) => {
      saveAs(res, `${nameFile}.xlsx`);
    });
  });
}

async function saveAsProductAgencyExcel(value, nameFile = "DS_kiem_kho") {
  var data = value.data;
  var data_header = value.header;
  XlsxPopulate.fromBlankAsync().then(async (workbook) => {
    const sheet1 = workbook.sheet(0);
    const sheetData = getSheetData(data, data_header);
    const totalColumns = sheetData[0].length;

    sheet1.cell("A1").value(sheetData);

    const range = sheet1.usedRange();
    const endColumn = String.fromCharCode(64 + totalColumns);
    sheet1.row(1).style("bold", true);

    const listColumn = [
      {
        name: "A",
        width: 18,
        style: {
          fontSize: 8,
          shrinkToFit: true,
          wrapText: true,
        },
      },
      {
        name: "B",
        width: 30,
        style: {
          fontSize: 8,
          shrinkToFit: true,
          wrapText: true,
        },
      },
      {
        name: "C",
        width: 12,
        style: {
          fontSize: 8,
          shrinkToFit: true,
          wrapText: true,
        },
      },
      {
        name: "D",
        width: 15,
        style: {
          fontSize: 8,
          shrinkToFit: true,
          wrapText: true,
        },
      },
      {
        name: "E",
        width: 20,
        style: {
          fontSize: 8,
          shrinkToFit: true,
          wrapText: true,
        },
      },
      // {
      //   name: "F",
      //   width: 20,
      //   style: {
      //     fontSize: 8,
      //     shrinkToFit: true,
      //     wrapText: true,
      //   },
      // },
    ];
    for (let column of listColumn) {
      sheet1.column(column.name).style(column.style);
      sheet1.column(column.name).width(column.width);
    }

    sheet1.range("A1:" + endColumn + "1").style({
      horizontalAlignment: "center",
      verticalAlignment: "center",
      wrapText: true,
    });
    const row = sheet1.row(1);
    row.height(50);

    // range.style("border", true);
    sheet1.freezePanes(1, 1);
    return workbook.outputAsync().then((res) => {
      saveAs(res, `${nameFile}.xlsx`);
    });
  });
}

export const fetchAllListProduct = (store_code, search) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    productApi.fetchAllListProduct(store_code, search).then((res) => {
      dispatch({
        type: Types.SHOW_LOADING,
        loading: "hide",
      });
      if (res.data.code !== 401) {
        if (typeof res.data.data != "undefined") {
          if (typeof res.data.data.data != "undefined") {
            if (res.data.data.data.length > 0) {
              var newArray = [];

              for (const item of res.data.data.data) {
                var newItem = {};
                var isCheckedDistribute = false;
                var arangeKeyItem = {
                  name: item.name,
                  barcode: item.barcode,
                  check_inventory: item.check_inventory,
                  shelf_position: item.shelf_position,
                  quantity_in_stock: item.quantity_in_stock,
                  categories: item.categories,
                  attributes: item.attributes,
                  attribute_searches: item.attribute_searches,
                  // attribute_search_children: item.attribute_search_children,
                  weight: item.weight,
                  type_share_collaborator_number:
                    item.type_share_collaborator_number,
                  percent_collaborator: item.percent_collaborator,
                  point_for_agency: item.point_for_agency,
                  full_description: item.full_description,
                  content_for_collaborator: item.content_for_collaborator,
                  status: item.status,
                  seo_title: item.seo_title,
                  seo_description: item.seo_description,
                  distributes: item.distributes,
                  sku: item.sku,
                  images: item.images,
                  money_amount_collaborator: item.money_amount_collaborator,
                };
                // eslint-disable-next-line no-loop-func
                Object.entries(arangeKeyItem).forEach(([key, value], index) => {
                  if (key == "full_description") {
                    if (value != null && value.length < 32000) {
                      newItem["Mô tả"] = value;
                    } else {
                      newItem["Mô tả"] = "";
                    }
                  }

                  if (key == "name") {
                    // newItem["Tên sản phẩm"] = formatStringCharactor(value);
                    newItem["Tên sản phẩm"] = value;
                  }

                  if (key == "type_share_collaborator_number" && value == 0) {
                    newItem[
                      "Hoa hồng CTV (%/VND)"
                    ] = `${arangeKeyItem["percent_collaborator"]}(%)`;
                  } else if (
                    key == "type_share_collaborator_number" &&
                    value == 1
                  ) {
                    newItem[
                      "Hoa hồng CTV (%/VND)"
                    ] = `${arangeKeyItem["money_amount_collaborator"]}(VND)`;
                  }
                  if (key == "shelf_position") {
                    newItem["Vị trí kệ hàng"] = value;
                  }

                  if (key == "categories") {
                    if (Array.isArray(value)) {
                      var stringCategory = "";
                      for (const [index, category] of value.entries()) {
                        if (
                          category.name != null &&
                          typeof category.name != "undefined"
                        ) {
                          var stringCategoryChild = "";
                          for (const [
                            index,
                            categoryChild,
                          ] of category.category_children.entries()) {
                            if (categoryChild.name) {
                              stringCategoryChild += `${formatStringCharactor(
                                categoryChild.name
                              )}${
                                index == category.category_children.length - 1
                                  ? ""
                                  : ","
                              }`;
                            }
                          }
                          if (index == value.length - 1) {
                            stringCategory =
                              stringCategory +
                              formatStringCharactor(category.name) +
                              `${
                                stringCategoryChild != ""
                                  ? `[${stringCategoryChild}]`
                                  : ""
                              }`;
                          } else {
                            stringCategory =
                              stringCategory +
                              formatStringCharactor(category.name) +
                              `${
                                stringCategoryChild != ""
                                  ? `[${stringCategoryChild}]`
                                  : ""
                              }` +
                              ";";
                          }
                        }
                      }
                      newItem["Danh mục"] = stringCategory;
                    }
                  }

                  if (key == "attribute_searches") {
                    if (Array.isArray(value)) {
                      var stringAttributeSearch = "";
                      for (const [index, attribute_search] of value.entries()) {
                        if (
                          attribute_search.name != null &&
                          typeof attribute_search.name != "undefined"
                        ) {
                          var stringAttributeSearchChild = "";
                          for (const [
                            index,
                            attributeSearchChild,
                          ] of attribute_search.attribute_search_children.entries()) {
                            if (attributeSearchChild.name) {
                              stringAttributeSearchChild += `${formatStringCharactor(
                                attributeSearchChild.name
                              )}${
                                index ==
                                attribute_search.attribute_search_children
                                  .length -
                                  1
                                  ? ""
                                  : ","
                              }`;
                            }
                          }
                          if (index == value.length - 1) {
                            stringAttributeSearch =
                              stringAttributeSearch +
                              formatStringCharactor(attribute_search.name) +
                              `${
                                stringAttributeSearchChild != ""
                                  ? `[${stringAttributeSearchChild}]`
                                  : ""
                              }`;
                          } else {
                            stringAttributeSearch =
                              stringAttributeSearch +
                              formatStringCharactor(attribute_search.name) +
                              `${
                                stringAttributeSearchChild != ""
                                  ? `[${stringAttributeSearchChild}]`
                                  : ""
                              }` +
                              ";";
                          }
                        }
                      }
                      newItem["Thuộc tính tìm kiếm"] = stringAttributeSearch;
                    }
                  }

                  // if (key == "attribute_search_children") {
                  //   if (Array.isArray(value)) {
                  //     var stringAttributeSearch = "";
                  //     for (const [index, attribute_search] of value.entries()) {
                  //       if (
                  //         attribute_search.name &&
                  //         typeof attribute_search.name != "undefined"
                  //       ) {
                  //         if (index == value.length - 1) {
                  //           stringAttributeSearch += formatStringCharactor(
                  //             attribute_search.name
                  //           );
                  //         } else {
                  //           stringAttributeSearch +=
                  //             formatStringCharactor(attribute_search.name) +
                  //             ",";
                  //         }
                  //       }
                  //     }
                  //     newItem["Thuộc tính tìm kiếm"] = stringAttributeSearch;
                  //   }
                  // }

                  if (key == "weight") {
                    newItem["Cân nặng(g)"] = value;
                  }

                  if (key == "sku") {
                    newItem["Mã SKU"] = value;
                  }

                  if (key == "images") {
                    if (Array.isArray(value)) {
                      var stringImg = "";
                      for (const [index, img] of value.entries()) {
                        if (
                          img.image_url != null &&
                          typeof img.image_url != "undefined"
                        ) {
                          if (index == value.length - 1) {
                            stringImg = stringImg + img.image_url;
                          } else {
                            stringImg = stringImg + img.image_url + ",";
                          }
                        }
                      }
                      newItem["Hình ảnh"] = stringImg;
                    }
                  }
                  if (key == "barcode") {
                    newItem["Mã BARCODE"] = value;
                  }
                  if (key == "check_inventory") {
                    newItem["Theo dõi kho (Có/Không)"] = `${
                      value ? "Có" : "Không"
                    }`;
                  }
                  if (key == "point_for_agency") {
                    newItem["Xu cho đại lý"] = `${value ? value : 0}`;
                  }
                  if (key == "content_for_collaborator") {
                    newItem["Nội dung cho CTV"] = `${value ? value : ""}`;
                  }
                  if (key == "status") {
                    newItem["Trạng thái (Ẩn/Hiện)"] = `${
                      value == 0 ? "Hiện" : "Ẩn"
                    }`;
                  }
                  if (key == "seo_title") {
                    newItem["Tiêu đề SEO"] = `${value ? value : ""}`;
                  }
                  if (key == "seo_description") {
                    newItem["Miêu tả SEO"] = `${value ? value : ""}`;
                  }
                  if (key == "attributes") {
                    if (Array.isArray(value)) {
                      var stringAttribute = "";
                      for (const [index, attribute] of value.entries()) {
                        if (
                          attribute.name != null &&
                          typeof attribute.name != "undefined"
                        ) {
                          if (index == value.length - 1) {
                            stringAttribute += `${formatStringCharactor(
                              attribute.name
                            )}:${attribute.value}`;
                          } else {
                            stringAttribute += `${formatStringCharactor(
                              attribute.name
                            )}:${attribute.value};`;
                          }
                        }
                      }
                      newItem["Thuộc tính"] = stringAttribute;
                    }
                  }
                  if (key == "distributes") {
                    if (value.length > 0) {
                      isCheckedDistribute = true;
                      const typeDistributeOrigin = value[0].name;
                      const typeDistributeSub = value[0]
                        .sub_element_distribute_name
                        ? `${value[0].sub_element_distribute_name}`
                        : "";
                      if (value[0].element_distributes.length > 0) {
                        for (const [
                          index,
                          element,
                        ] of value[0].element_distributes.entries()) {
                          let checkedDistributeExist = false;
                          let checkedDistributeExist2 = false;
                          if (element.sub_element_distributes?.length > 0) {
                            for (const [
                              index2,
                              elementSub,
                            ] of element.sub_element_distributes.entries()) {
                              if (
                                index == 0 &&
                                checkedDistributeExist === false &&
                                checkedDistributeExist2 === false
                              ) {
                                newItem["Phân loại(Có/Không)"] = "Có";
                                newItem["Phân loại chính"] =
                                  typeDistributeOrigin;
                                newItem["Phân loại phụ"] = typeDistributeSub;
                                newItem["DS phân loại"] = "";
                                newItem["Giá bán lẻ"] = "";
                                newItem["Giá nhập"] = "";
                                newItem["Mã SKU"] = "";
                                if (checkedDistributeExist === false) {
                                  newItem["Hình ảnh"] = "";
                                }
                                newArray.push(newItem);

                                const newItemEmpty = {};
                                for (const key of Object.keys(arangeKeyItem)) {
                                  newItemEmpty[key] = "";
                                }
                                newItemEmpty["DS phân loại"] = `${
                                  element.name
                                },${elementSub.name}${
                                  index !== element.length - 1 ? "" : ","
                                }`;
                                newItemEmpty["Giá bán lẻ"] = `${
                                  elementSub.price ? elementSub.price : "0"
                                }`;
                                newItemEmpty["Giá nhập"] = `${
                                  elementSub.import_price
                                    ? elementSub.import_price
                                    : "0"
                                }`;
                                newItemEmpty["Mã SKU"] = `${
                                  elementSub.sku ? elementSub.sku : ""
                                }`;
                                if (checkedDistributeExist2 === false) {
                                  newItemEmpty["Hình ảnh"] = element.image_url
                                    ? element.image_url
                                    : "";
                                  checkedDistributeExist2 = true;
                                }
                                newArray.push(newItemEmpty);
                              } else {
                                const newItemEmpty = {};

                                for (const key of Object.keys(arangeKeyItem)) {
                                  newItemEmpty[key] = "";
                                }
                                newItemEmpty["DS phân loại"] = `${
                                  element.name
                                },${elementSub.name}${
                                  index !== element.length - 1 ? "" : ","
                                }`;

                                newItemEmpty["Giá bán lẻ"] = `${
                                  elementSub.price ? elementSub.price : "0"
                                }`;
                                newItemEmpty["Giá nhập"] = `${
                                  elementSub.import_price
                                    ? elementSub.import_price
                                    : "0"
                                }`;
                                newItemEmpty["Mã SKU"] = `${
                                  elementSub.sku ? elementSub.sku : ""
                                }`;
                                newItemEmpty["Hình ảnh"] = element.image_url
                                  ? element.image_url
                                  : "";
                                newArray.push(newItemEmpty);
                              }
                            }
                          } else {
                            if (index == 0) {
                              newItem["Phân loại(Có/Không)"] = "Có";
                              newItem["Phân loại chính"] = typeDistributeOrigin;
                              newItem["Phân loại phụ"] = typeDistributeSub;
                              newItem["DS phân loại"] = "";

                              newItem["Giá bán lẻ"] = "";
                              newItem["Giá nhập"] = "";
                              newItem["Mã SKU"] = "";
                              newItem["Hình ảnh"] = "";
                              newArray.push(newItem);

                              const newItemEmpty = {};

                              for (const key of Object.keys(arangeKeyItem)) {
                                newItemEmpty[key] = "";
                              }
                              newItemEmpty["Giá bán lẻ"] = `${
                                element.price ? element.price : "0"
                              }`;
                              newItemEmpty["Giá nhập"] = `${
                                element.import_price
                                  ? element.import_price
                                  : "0"
                              }`;
                              newItemEmpty["DS phân loại"] = `${element.name}`;
                              newItemEmpty["Mã SKU"] = element.sku
                                ? element.sku
                                : "";
                              newItemEmpty["Hình ảnh"] = element.image_url
                                ? element.image_url
                                : "";
                              newArray.push(newItemEmpty);
                            } else {
                              const newItemEmpty = {};

                              for (const key of Object.keys(arangeKeyItem)) {
                                newItemEmpty[key] = "";
                              }
                              newItemEmpty["DS phân loại"] = `${element.name}`;
                              newItemEmpty["Giá bán lẻ"] = `${
                                element.price ? element.price : "0"
                              }`;
                              newItemEmpty["Giá nhập"] = `${
                                element.import_price
                                  ? element.import_price
                                  : "0"
                              }`;
                              newItemEmpty["Mã SKU"] = element.sku
                                ? element.sku
                                : "";
                              newItemEmpty["Hình ảnh"] = element.image_url
                                ? element.image_url
                                : "";
                              newArray.push(newItemEmpty);
                            }
                          }
                        }
                      }
                    } else {
                      newItem["Phân loại(Có/Không)"] = "Không";
                      newItem["Phân loại chính"] = "";
                      newItem["Phân loại phụ"] = "";
                      newItem["DS phân loại"] = "";
                      newItem["Giá bán lẻ"] = `${
                        item.price ? item.price : "0"
                      }`;
                      newItem["Giá nhập"] = `${
                        item.import_price ? item.import_price : "0"
                      }`;
                      newItem["Mã SKU"] = "";
                      newItem["Hình ảnh"] = "";
                    }
                  }
                });
                if (!isCheckedDistribute) {
                  newArray.push(newItem);
                }
              }
              var header = [];
              if (newArray.length > 0) {
                Object.entries(newArray[0]).forEach(([key, value], index) => {
                  header.push(key);
                });
              }
              saveAsExcelProduct({ data: newArray, header: header });
            }
          }
        }
      }
    });
  };
};

export const fetchProductInventory = (store_code, branch_id, params) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    productApi
      .fetchAllProductV2(store_code, branch_id, null, params)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        if (res.data.code !== 401) {
          if (res.data.data.data.length > 0) {
            var newArray = [];

            for (const item of res.data.data.data) {
              var newItem = {};
              var isCheckedDistribute = false;
              var arangeKeyItem = {
                name: item.name,
                barcode: item.barcode,
                check_inventory: item.check_inventory,
                shelf_position: item.shelf_position,
                distributes: item.inventory.distributes,
                sku: item.sku,
                images: item.images,
              };
              // eslint-disable-next-line no-loop-func
              Object.entries(arangeKeyItem).forEach(([key, value], index) => {
                if (key == "name") {
                  newItem["Tên sản phẩm"] = value;
                }
                if (key == "sku") {
                  newItem["Mã SKU"] = value;
                }
                if (key == "barcode") {
                  newItem["Mã BARCODE"] = value;
                }
                if (key == "check_inventory") {
                  newItem["Theo dõi kho (Có/Không)"] = `${
                    value ? "Có" : "Không"
                  }`;
                }
                if (key == "shelf_position") {
                  newItem["Vị trí kệ hàng"] = value;
                }
                if (key == "distributes") {
                  if (value.length > 0) {
                    isCheckedDistribute = true;
                    const typeDistributeOrigin = value[0].name;
                    const typeDistributeSub = value[0]
                      .sub_element_distribute_name
                      ? `${value[0].sub_element_distribute_name}`
                      : "";
                    if (value[0].element_distributes.length > 0) {
                      for (const [
                        index,
                        element,
                      ] of value[0].element_distributes.entries()) {
                        let checkedDistributeExist = false;
                        let checkedDistributeExist2 = false;
                        if (element.sub_element_distributes?.length > 0) {
                          for (const [
                            index2,
                            elementSub,
                          ] of element.sub_element_distributes.entries()) {
                            if (
                              index == 0 &&
                              checkedDistributeExist === false &&
                              checkedDistributeExist2 === false
                            ) {
                              newItem["Phân loại(Có/Không)"] = "Có";
                              newItem["Phân loại chính"] = typeDistributeOrigin;
                              newItem["Phân loại phụ"] = typeDistributeSub;
                              newItem["DS phân loại"] = "";
                              newItem["Mã SKU"] = "";
                              if (checkedDistributeExist === false) {
                                newItem["Hình ảnh"] = "";
                              }
                              newItem["Giá bán lẻ"] = "";
                              newItem["Giá nhập"] = "";
                              newItem["Giá vốn"] = 0;
                              newItem["Tồn kho"] = 0;
                              newArray.push(newItem);

                              const newItemEmpty = {};
                              for (const key of Object.keys(arangeKeyItem)) {
                                newItemEmpty[key] = "";
                              }
                              newItemEmpty["DS phân loại"] = `${element.name},${
                                elementSub.name
                              }${index !== element.length - 1 ? "" : ","}`;
                              newItemEmpty["Mã SKU"] = `${
                                elementSub.sku ? elementSub.sku : ""
                              }`;
                              if (checkedDistributeExist2 === false) {
                                newItemEmpty["Hình ảnh"] = element.image_url
                                  ? element.image_url
                                  : "";
                                checkedDistributeExist2 = true;
                              }
                              newItemEmpty["Giá bán lẻ"] = `${
                                elementSub.price ? elementSub.price : 0
                              }`;
                              newItemEmpty["Giá nhập"] = `${
                                elementSub.import_price
                                  ? elementSub.import_price
                                  : 0
                              }`;
                              newItemEmpty["Giá vốn"] = `${
                                elementSub.cost_of_capital
                                  ? elementSub.cost_of_capital
                                  : 0
                              }`;
                              newItemEmpty["Tồn kho"] = `${elementSub.stock}`;
                              newArray.push(newItemEmpty);
                            } else {
                              const newItemEmpty = {};

                              for (const key of Object.keys(arangeKeyItem)) {
                                newItemEmpty[key] = "";
                              }
                              newItemEmpty["DS phân loại"] = `${element.name},${
                                elementSub.name
                              }${index !== element.length - 1 ? "" : ","}`;
                              newItemEmpty["Mã SKU"] = `${
                                elementSub.sku ? elementSub.sku : ""
                              }`;
                              newItemEmpty["Hình ảnh"] = element.image_url
                                ? element.image_url
                                : "";
                              newItemEmpty["Giá bán lẻ"] = `${
                                elementSub.price ? elementSub.price : 0
                              }`;
                              newItemEmpty["Giá nhập"] = `${
                                elementSub.import_price
                                  ? elementSub.import_price
                                  : 0
                              }`;
                              newItemEmpty["Giá vốn"] = `${
                                elementSub.cost_of_capital
                                  ? elementSub.cost_of_capital
                                  : 0
                              }`;
                              newItemEmpty["Tồn kho"] = `${
                                elementSub.stock ? elementSub.stock : 0
                              }`;
                              newArray.push(newItemEmpty);
                            }
                          }
                        } else {
                          if (index == 0) {
                            newItem["Phân loại(Có/Không)"] = "Có";
                            newItem["Phân loại chính"] = typeDistributeOrigin;
                            newItem["Phân loại phụ"] = typeDistributeSub;
                            newItem["DS phân loại"] = "";
                            newItem["Mã SKU"] = "";
                            newItem["Hình ảnh"] = "";

                            newItem["Giá bán lẻ"] = "";
                            newItem["Giá nhập"] = "";
                            newItem["Giá vốn"] = "";
                            newItem["Tồn kho"] = "";
                            newArray.push(newItem);

                            const newItemEmpty = {};

                            for (const key of Object.keys(arangeKeyItem)) {
                              newItemEmpty[key] = "";
                            }
                            newItemEmpty["DS phân loại"] = `${element.name}`;
                            newItemEmpty["Mã SKU"] = element.sku
                              ? element.sku
                              : "";
                            newItemEmpty["Hình ảnh"] = element.image_url
                              ? element.image_url
                              : "";
                            newItemEmpty["Giá bán lẻ"] = `${
                              element.price ? element.price : 0
                            }`;
                            newItemEmpty["Giá nhập"] = `${
                              element.import_price ? element.import_price : 0
                            }`;
                            newItemEmpty["Giá vốn"] = `${
                              element.cost_of_capital
                                ? element.cost_of_capital
                                : 0
                            }`;
                            newItemEmpty["Tồn kho"] = `${
                              element.stock ? element.stock : 0
                            }`;
                            newArray.push(newItemEmpty);
                          } else {
                            const newItemEmpty = {};

                            for (const key of Object.keys(arangeKeyItem)) {
                              newItemEmpty[key] = "";
                            }
                            newItemEmpty["DS phân loại"] = `${element.name}`;
                            newItemEmpty["Mã SKU"] = element.sku
                              ? element.sku
                              : "";
                            newItemEmpty["Hình ảnh"] = element.image_url
                              ? element.image_url
                              : "";
                            newItemEmpty["Giá bán lẻ"] = `${
                              element.price ? element.price : 0
                            }`;
                            newItemEmpty["Giá nhập"] = `${
                              element.import_price ? element.import_price : 0
                            }`;
                            newItemEmpty["Giá vốn"] = `${
                              element.cost_of_capital
                                ? element.cost_of_capital
                                : 0
                            }`;
                            newItemEmpty["Tồn kho"] = `${
                              element.stock ? element.stock : 0
                            }`;
                            newArray.push(newItemEmpty);
                          }
                        }
                      }
                    }
                  } else {
                    newItem["Phân loại(Có/Không)"] = "Không";
                    newItem["Phân loại chính"] = "";
                    newItem["Phân loại phụ"] = "";
                    newItem["DS phân loại"] = "";
                    newItem["Mã SKU"] = "";
                    newItem["Hình ảnh"] = "";
                    newItem["Giá bán lẻ"] = `${item.price ? item.price : 0}`;
                    newItem["Giá nhập"] = `${
                      item.import_price ? item.import_price : 0
                    }`;
                    newItem["Giá vốn"] = `${
                      item.inventory?.main_cost_of_capital
                        ? item.inventory?.main_cost_of_capital
                        : 0
                    }`;
                    newItem["Tồn kho"] = `${
                      item.inventory?.main_stock
                        ? item.inventory?.main_stock
                        : 0
                    }`;
                  }
                }
              });
              if (!isCheckedDistribute) {
                newArray.push(newItem);
              }
            }
            var header = [];
            if (newArray.length > 0) {
              Object.entries(newArray[0]).forEach(([key, value], index) => {
                header.push(key);
              });
            }
            saveAsExcel(
              { data: newArray, header: header },
              "Danh sách sản phẩm theo kho"
            );
          }
        }
      });
  };
};

export const exportSheetInventory = (
  store_code,
  branch_id,
  params,
  sheetInventory
) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    if (!sheetInventory) {
      productApi
        .fetchAllListProduct(store_code, "")
        .then((res) => {
          if (res.data.code !== 401) {
            if (res.data.data.data.length > 0) {
              let dataSheetInventory = [];
              for (const item of res.data.data.data) {
                const distribute =
                  item.inventory?.distributes !== null &&
                  item.inventory?.distributes.length > 0
                    ? item.inventory?.distributes[0]
                    : null;

                if (distribute === null) {
                  let _data = {
                    product_id: item.id,
                    name: item.name,
                    reality_exist: 0,
                    distribute_name: null,
                    element_distribute_name: null,
                    sub_element_distribute_name: null,
                  };

                  dataSheetInventory.push(_data);
                } else {
                  if (distribute.element_distributes?.length > 0) {
                    distribute.element_distributes.forEach(
                      (element, _index) => {
                        if (
                          distribute.element_distributes[0]
                            ?.sub_element_distributes?.length > 0
                        ) {
                          distribute.element_distributes[0].sub_element_distributes.forEach(
                            (sub_element) => {
                              dataSheetInventory.push({
                                product_id: item.id,
                                name: item.name,
                                reality_exist: 0,
                                distribute_name: distribute.name,
                                element_distribute_name: element.name,
                                sub_element_distribute_name: sub_element.name,
                              });
                            }
                          );
                        } else {
                          let _data = {
                            product_id: item.id,
                            name: item.name,
                            reality_exist: 0,
                            distribute_name: distribute.name,
                            element_distribute_name: element.name,
                            sub_element_distribute_name: null,
                          };

                          dataSheetInventory.push(_data);
                        }
                      }
                    );
                  }
                }
              }

              componentExportSheet(dataSheetInventory);
            }
          }
        })
        .finally(() => {
          dispatch({
            type: Types.SHOW_LOADING,
            loading: "hide",
          });
        });
    } else {
      componentExportSheet(sheetInventory);
      dispatch({
        type: Types.SHOW_LOADING,
        loading: "hide",
      });
    }
  };
};

const componentExportSheet = (dataSheetInventory) => {
  var newArray = [];

  for (const item of dataSheetInventory) {
    var newItem = {};
    var arangeKeyItem = {
      product_id: item.product_id,
      name: item.name,
      distribute_name: item.distribute_name,
      element_distribute_name: item.element_distribute_name,
      sub_element_distribute_name: item.sub_element_distribute_name,
      reality_exist: 0,
    };
    // eslint-disable-next-line no-loop-func
    Object.entries(arangeKeyItem).forEach(([key, value], index) => {
      if (key == "product_id") {
        newItem["Mã sản phẩm"] = formatStringCharactor(value);
      }
      if (key == "name") {
        newItem["Tên sản phẩm"] = formatStringCharactor(value);
      }
      if (key == "distribute_name") {
        newItem["Tên phân loại chính"] = value;

        if (item["sub_element_distribute_name"]) {
          newItem[
            "DS phân loại"
          ] = `${item["element_distribute_name"]},${item["sub_element_distribute_name"]}`;
        } else {
          newItem["DS phân loại"] = `${item["element_distribute_name"] ?? ""}`;
        }
      }
      if (key == "reality_exist") {
        newItem["Tồn kho thực tế"] = value;
      }
    });

    newArray.push(newItem);
  }
  var header = [];
  if (newArray.length > 0) {
    Object.entries(newArray[0]).forEach(([key, value], index) => {
      header.push(key);
    });
  }
  saveAsSheetInventoryExcel({ data: newArray, header: header }, "DS_kiem_kho");
};

export const exportProductAgency = (
  store_code,
  branch_id,
  params,
  level_agency,
  productsAgency
) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    productApi
      .fetchAllListProduct(store_code, "", params)
      .then((res) => {
        if (res.data.code !== 401) {
          if (res.data.data.data.length > 0) {
            let dataSheetInventory = [];
            if (!productsAgency) {
              for (const item of res.data.data.data) {
                const distribute =
                  item.agency_price?.distributes !== null &&
                  item.agency_price?.distributes.length > 0
                    ? item.agency_price?.distributes[0]
                    : null;

                if (distribute === null) {
                  let _data = {
                    product_id: item.id,
                    name: item.name,
                    percent_agency: item.agency_price?.percent_agency,
                    main_price: item.agency_price?.main_price,
                    level_agency: level_agency,
                    distribute_name: null,
                    element_distribute_name: null,
                    sub_element_distribute_name: null,
                    element_distribute_price: null,
                    sub_element_distribute_price: null,
                  };

                  dataSheetInventory.push(_data);
                } else {
                  if (distribute?.element_distributes?.length > 0) {
                    distribute.element_distributes.forEach(
                      (element, _index) => {
                        if (
                          distribute.element_distributes[0]
                            ?.sub_element_distributes?.length > 0
                        ) {
                          element.sub_element_distributes.forEach(
                            (sub_element) => {
                              dataSheetInventory.push({
                                product_id: item.id,
                                name: item.name,
                                percent_agency:
                                  item.agency_price?.percent_agency,
                                main_price: item.agency_price?.main_price,
                                level_agency: level_agency,
                                distribute_name: distribute.name,
                                element_distribute_name: element.name,
                                element_distribute_price: null,
                                sub_element_distribute_name: sub_element.name,
                                sub_element_distribute_price: sub_element.price,
                              });
                            }
                          );
                        } else {
                          dataSheetInventory.push({
                            product_id: item.id,
                            name: item.name,
                            percent_agency: item.agency_price?.percent_agency,
                            main_price: item.agency_price?.main_price,
                            level_agency: level_agency,
                            distribute_name: distribute.name,
                            element_distribute_name: element.name,
                            element_distribute_price: element.price,
                            sub_element_distribute_name: null,
                            sub_element_distribute_price: null,
                          });
                        }
                      }
                    );
                  }
                }
              }
            } else {
              if (productsAgency?.length > 0) {
                for (const item of res.data.data.data) {
                  for (const productItem of productsAgency) {
                    if (item.id == productItem.product_id) {
                      const distribute =
                        item.agency_price?.distributes !== null &&
                        item.agency_price?.distributes.length > 0
                          ? item.agency_price?.distributes[0]
                          : null;

                      if (
                        distribute === null &&
                        productItem.distribute_name == null
                      ) {
                        let _data = {
                          product_id: item.id,
                          name: item.name,
                          percent_agency: item.agency_price?.percent_agency,
                          main_price: item.agency_price?.main_price,
                          level_agency: level_agency,
                          distribute_name: null,
                          element_distribute_name: null,
                          sub_element_distribute_name: null,
                          element_distribute_price: null,
                          sub_element_distribute_price: null,
                        };

                        dataSheetInventory.push(_data);
                      } else {
                        if (
                          distribute?.element_distributes?.length > 0 &&
                          productItem.element_distribute_name
                        ) {
                          distribute.element_distributes.forEach(
                            (element, _index) => {
                              if (
                                distribute.element_distributes[0]
                                  ?.sub_element_distributes?.length > 0 &&
                                productItem.sub_element_distribute_name
                              ) {
                                element.sub_element_distributes.forEach(
                                  (sub_element) => {
                                    if (
                                      sub_element.name ==
                                        productItem.sub_element_distribute_name &&
                                      element.name ==
                                        productItem.element_distribute_name
                                    ) {
                                      dataSheetInventory.push({
                                        product_id: item.id,
                                        name: item.name,
                                        percent_agency:
                                          item.agency_price?.percent_agency,
                                        main_price:
                                          item.agency_price?.main_price,
                                        level_agency: level_agency,
                                        distribute_name: distribute.name,
                                        element_distribute_name: element.name,
                                        element_distribute_price: null,
                                        sub_element_distribute_name:
                                          sub_element.name,
                                        sub_element_distribute_price:
                                          sub_element.price,
                                      });
                                    }
                                  }
                                );
                              } else {
                                if (
                                  element.name ==
                                  productItem.element_distribute_name
                                ) {
                                  dataSheetInventory.push({
                                    product_id: item.id,
                                    name: item.name,
                                    percent_agency:
                                      item.agency_price?.percent_agency,
                                    main_price: item.agency_price?.main_price,
                                    level_agency: level_agency,
                                    distribute_name: distribute.name,
                                    element_distribute_name: element.name,
                                    element_distribute_price: element.price,
                                    sub_element_distribute_name: null,
                                    sub_element_distribute_price: null,
                                  });
                                }
                              }
                            }
                          );
                        }
                      }
                    }
                  }
                }
              }
            }

            componentExportProductAgency(dataSheetInventory);
          }
        }
      })
      .finally(() => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
      });
  };
};

const componentExportProductAgency = (dataProductAgency) => {
  var newArray = [];

  for (const item of dataProductAgency) {
    var newItem = {};
    var arangeKeyItem = {
      product_id: item.product_id,
      name: item.name,
      distribute_name: item.distribute_name,
      percent_agency: item.percent_agency,
      main_price: item.main_price,
      level_agency: item.level_agency,
      element_distribute_name: item.element_distribute_name,
      sub_element_distribute_name: item.sub_element_distribute_name,
      price_agency: "",
      // element_distribute_price: item.element_distribute_price,
      // sub_element_distribute_price: item.sub_element_distribute_price,
    };
    // eslint-disable-next-line no-loop-func
    Object.entries(arangeKeyItem).forEach(([key, value], index) => {
      if (key == "product_id") {
        newItem["Mã sản phẩm"] = formatStringCharactor(value);
      }
      if (key == "name") {
        newItem["Tên sản phẩm"] = formatStringCharactor(value);
      }
      if (key == "distribute_name") {
        newItem["Tên phân loại chính"] = value;

        if (item["sub_element_distribute_name"]) {
          newItem[
            "DS phân loại"
          ] = `${item["element_distribute_name"]},${item["sub_element_distribute_name"]}`;
        } else {
          newItem["DS phân loại"] = `${item["element_distribute_name"] ?? ""}`;
        }
      }
      // if (key == "percent_agency") {
      //   newItem["Hoa hồng(%)"] = value;
      // }
      if (key == "price_agency") {
        newItem["Giá đại lý"] =
          item.sub_element_distribute_price ||
          item.element_distribute_price ||
          item.main_price;
      }
    });

    newArray.push(newItem);
  }
  var header = [];
  if (newArray.length > 0) {
    Object.entries(newArray[0]).forEach(([key, value], index) => {
      header.push(key);
    });
  }
  saveAsProductAgencyExcel(
    { data: newArray, header: header },
    "DS_sản phẩm_cấu_hình_đại_lý"
  );
};

export const fetchAllAttributeP = (store_code) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    attributePApi.fetchAllData(store_code).then((res) => {
      if (res.data.code !== 401)
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
      dispatch({
        type: Types.FETCH_ALL_ATTRIBUTE_PRODUCT,
        data: res.data.data,
      });
    });
  };
};

export const updateAttributeP = (store_code, data) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    attributePApi
      .updateAttributeP(store_code, data)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        attributePApi.fetchAllData(store_code).then((res) => {
          if (res.data.code !== 401)
            dispatch({
              type: Types.FETCH_ALL_ATTRIBUTE_PRODUCT,
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
          type: Types.ALERT_UID_STATUS,
          alert: {
            type: "danger",
            title: "Lỗi",
            disable: "show",
            content: error?.response?.data?.msg,
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
  };
};

export const destroyAttributeP = ($this, store_code, data) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    attributePApi

      .updateAttributeP(store_code, data)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        attributePApi.fetchAllData(store_code).then((res) => {
          if (res.data.code !== 401)
            dispatch({
              type: Types.FETCH_ALL_ATTRIBUTE_PRODUCT,
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
          if (typeof $this.list_attribute[$this.name] !== "undefined") {
            delete $this.list_attribute[$this.name];
            $this._this.setState({ list_attribute: $this.list_attribute });
          }
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
  };
};

export const uploadAvataProduct = (file) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    uploadApi
      .upload(file)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        dispatch({
          type: Types.UPLOAD_PRODUCT_IMG,
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
  };
};

export const editStock = (
  store_code,
  branch_id,
  data,
  page = 1,
  params = null
) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    productApi
      .editStock(store_code, branch_id, data)
      .then((res) => {
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
            content: res.data.msg,
          },
        });
        productApi
          .fetchAllProductV2(store_code, branch_id, page, params)
          .then((res) => {
            dispatch({
              type: Types.SHOW_LOADING,
              loading: "hide",
            });
            if (res.data.code !== 401)
              dispatch({
                type: Types.FETCH_ALL_PRODUCT,
                data: res.data.data,
              });
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
  };
};

export const editListStock = (
  store_code,
  branch_id,
  data,
  page = 1,
  params = null,
  onSuccess = () => {}
) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    productApi
      .editListStock(store_code, branch_id, data)
      .then((res) => {
        if (onSuccess) onSuccess();
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
            content: res.data.msg,
          },
        });
        productApi
          .fetchAllProductV2(store_code, branch_id, page, params)
          .then((res) => {
            dispatch({
              type: Types.SHOW_LOADING,
              loading: "hide",
            });
            if (res.data.code !== 401)
              dispatch({
                type: Types.FETCH_ALL_PRODUCT,
                data: res.data.data,
              });
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
  };
};

export const uploadListImgProduct = function (files, imageType) {
  return async (dispatch) => {
    var images = [];
    dispatch({
      type: Types.LOADING_UPLOAD_ALL_PRODUCT_IMG,
      loading: true,
    });
    for (let i = 0; i < files.length; i++) {
      const fd = new FormData();
      fd.append(`image`, await compressed(files[i]));
      if (imageType) {
        fd.append(`image_type`, imageType);
      }
      try {
        var res = await uploadApi.upload(fd);
      } catch (error) {
        dispatch({
          type: Types.ALERT_UID_STATUS,
          alert: {
            type: "danger",
            title: "Lỗi",
            disable: "hide",
            content: error?.response?.data?.msg,
          },
        });
      }
      if (res.data.code == 400) {
        {
          dispatch({
            type: Types.ALERT_UID_STATUS,
            alert: {
              type: "danger",
              title: "Lỗi",
              disable: "show",
              content: res.data.msg,
            },
          });
        }
      } else {
        images.push(res.data.data);
      }
      if (i == files.length - 1) {
        dispatch({
          type: Types.UPLOAD_ALL_PRODUCT_IMG,
          data: images,
        });
      }
    }
    dispatch({
      type: Types.LOADING_UPLOAD_ALL_PRODUCT_IMG,
      loading: false,
    });
  };
};
export const uploadListImgProductV2 = function (files) {
  return async (dispatch) => {
    var images = [];
    for (let i = 0; i < files.length; i++) {
      const fd = new FormData();

      fd.append(`image`, await compressed(files[i]));
      try {
        var res = await uploadApi.upload(fd);
      } catch (error) {
        dispatch({
          type: Types.ALERT_UID_STATUS,
          alert: {
            type: "danger",
            title: "Lỗi",
            disable: "hide",
            content: error?.response?.data?.msg,
          },
        });
      }
      if (res.data.code == 400) {
        {
          dispatch({
            type: Types.ALERT_UID_STATUS,
            alert: {
              type: "danger",
              title: "Lỗi",
              disable: "show",
              content: res.data.msg,
            },
          });
        }
      } else {
        images.push(res.data.data);
      }
      if (i == files.length - 1) {
        dispatch({
          type: Types.UPLOAD_ALL_PRODUCT_IMG_V2,
          data: images,
        });
      }
    }
  };
};

export const uploadImgDistribute = (file, imageId, listImages) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    uploadApi

      .upload(file)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        var listImg = [...listImages];
        var item = {
          data: res.data.data,
          index: imageId.index,
          // key: imageId.key,
          // keyItem: imageId.keyItem,
        };
        listImg[0] = item;
        dispatch({
          type: Types.UPLOAD_ALL_DISTRIBUTE_IMG,
          data: listImg,
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
  };
};

export const postProduct = (store_code, data) => {
  return (dispatch) => {
    const _value_price = data.price.toString().replace(/,/g, "");
    const _value_quantity_in_stock = data.quantity_in_stock
      .toString()
      .replace(/,/g, "");
    if (
      isNaN(Number(_value_price)) ||
      isNaN(Number(_value_quantity_in_stock))
    ) {
      dispatch({
        type: Types.ALERT_UID_STATUS,
        alert: {
          type: "danger",
          title: "Lỗi ",
          disable: "show",
          content: "Giá tiền sai định dạng hoặc bị để trống",
        },
      });
      return;
    }
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    productApi
      .createProduct(store_code, data)
      .then((res) => {
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
            content: res.data.msg,
          },
        });
        history.goBack();
      })
      .catch(function (error) {
        var content = "";
        if (typeof error.response.data.msg == "undefined")
          content = "Vui lòng chọn ảnh và nhập đầy đủ các thông tin";
        else content = error.response.data.msg;
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
            content: content,
          },
        });
      });
  };
};

export const postProductV2 = (store_code, branch_id, data, funcModal) => {
  return (dispatch) => {
    const _value_price = data.price.toString().replace(/,/g, "");
    const _value_quantity_in_stock = data.quantity_in_stock
      .toString()
      .replace(/,/g, "");
    if (
      isNaN(Number(_value_price)) ||
      isNaN(Number(_value_quantity_in_stock))
    ) {
      dispatch({
        type: Types.ALERT_UID_STATUS,
        alert: {
          type: "danger",
          title: "Lỗi ",
          disable: "show",
          content: "Giá tiền sai định dạng hoặc bị để trống",
        },
      });
      return;
    }
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    productApi
      .createProductV2(store_code, branch_id, data)
      .then((res) => {
        if (funcModal) {
          funcModal(res.data.data?.id);
        }
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
            content: res.data.msg,
          },
        });
        history.goBack();
      })
      .catch(function (error) {
        var content = "";
        // if (typeof error.response.data.msg == "undefined")
        //   content = "Vui lòng chọn ảnh và nhập đầy đủ các thông tin";
        // else
        content = error?.response?.data?.msg || "Lỗi hệ thống";

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
            content: content,
          },
        });
      });
  };
};

export const postMultiProduct = (store_code, data) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    productApi
      .createMultiProduct(store_code, data)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        dispatch({ type: Types.IMPORT_FILE_PRODUCTS, data: res.data.data });
        dispatch({
          type: Types.ALERT_UID_STATUS,
          alert: {
            type: "success",
            title: "Thành công ",
            disable: "show",
            content: `<div>
            <span>- Tổng số lượng import: ${res.data.data.total_products_request} </span></br>
            <span>     - Tổng số bỏ qua khi trùng tên: ${res.data.data.total_skip_same_name}</span></br>
            <span>  - Tổng số thay đổi khi trùng tên: ${res.data.data.total_changed_same_name}</span></br>
            <span>   - Tổng số thất bại: ${res.data.data.total_failed}</span></br>
            <span> - Tổng số được thêm mới: ${res.data.data.total_new_add}</span>
                      </div>
            `,
          },
        });
        productApi.fetchAllData(store_code, 1, null).then((res) => {
          if (res.data.code !== 401)
            dispatch({
              type: Types.FETCH_ALL_PRODUCT,
              data: res.data.data,
            });
        });
      })
      .catch(function (error) {
        var content = "";
        if (typeof error.response.data.msg == "undefined")
          content = "Vui lòng kiểm tra lại các trường dữ liệu";
        else content = error.response.data.msg;
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
            content: content,
          },
        });
      });
  };
};

export const postMultiProductInventory = (
  store_code,
  branch_id,
  data,
  onSuccess
) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    productApi
      .createMultiProductInventory(store_code, branch_id, data)
      .then((res) => {
        if (onSuccess) onSuccess();
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
          },
        });
      })
      .catch(function (error) {
        var content = "";
        if (typeof error.response.data.msg == "undefined")
          content = "Vui lòng kiểm tra lại các trường dữ liệu";
        else content = error.response.data.msg;
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
            content: content,
          },
        });
      });
  };
};

export const updateAgencyPrice = (
  store_code,
  data,
  productId,
  page,
  url = null,
  isNotReplace = true,
  onSuccess = () => {}
) => {
  return (dispatch) => {
    if (data.main_price) {
      const _value_price = data.main_price.toString().replace(/,/g, "");
      if (isNaN(Number(_value_price))) {
        dispatch({
          type: Types.ALERT_UID_STATUS,
          alert: {
            type: "danger",
            title: "Lỗi ",
            disable: "show",
            content: "Sai định dạng hoặc bị để trống",
          },
        });
        return;
      }
    }

    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    productApi
      .updateAgencyPrice(store_code, data, productId)
      .then((res) => {
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
            content: res.data.msg,
          },
        });
        if (isNotReplace) {
          if (url) history.replace(url);
          // history.push(`/product/index/${store_code}/${page}`);
          else history.goBack();
        }
        if (onSuccess) {
          onSuccess();
        }
      })
      .catch(function (error) {
        var content = "";
        if (typeof error.response.data.msg == "undefined")
          content = "Vui lòng chọn ảnh và nhập đầy đủ các thông tin";
        else content = error.response.data.msg;
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
            content: content,
          },
        });
      });
  };
};

export const updateListAgencyPrice = (
  store_code,
  data,
  onSuccess = () => {}
) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    productApi
      .updateListAgencyPrice(store_code, data)
      .then((res) => {
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
            content: res.data.msg,
          },
        });

        if (onSuccess) {
          onSuccess();
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
            content: "Error",
          },
        });
      });
  };
};

export const updatePriceOneProduct = (store_code, productId, price) => {
  const data = {
    price: price,
  };
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    productApi
      .updatePriceOneProduct(store_code, productId, data)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        dispatch({
          type: Types.SUCCESS_EDIT_ITEM_PRODUCT_IN_LIST,
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
          },
        });
      });
  };
};

export const updateNameOneProduct = (store_code, productId, name) => {
  const data = {
    name: name,
  };
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    productApi
      .updateNameOneProduct(store_code, productId, data)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        dispatch({
          type: Types.SUCCESS_EDIT_ITEM_PRODUCT_IN_LIST,
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
          },
        });
      });
  };
};

export const updateOneFieldProduct = (
  store_code,
  name_field,
  value_field,
  productId,
  page
) => {
  const data = {
    one_field: true,
    name_field,
    value_field,
  };
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    productApi
      .updateProduct(store_code, data, productId, page)
      .then((res) => {
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
            content: res.data.msg,
          },
        });
        history.push(`/product/index/${store_code}?page=${page}`);
      })
      .catch(function (error) {
        var content = "";
        if (typeof error.response.data.msg == "undefined")
          content = "Vui lòng chọn ảnh và nhập đầy đủ các thông tin";
        else content = error.response.data.msg;
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
            content: content,
          },
        });
      });
  };
};

export const updateProduct = (
  store_code,
  data,
  productId,
  page,
  params,
  funcModal
) => {
  return (dispatch) => {
    const _value_price = data.price.toString().replace(/,/g, "");
    const _value_quantity_in_stock = data.quantity_in_stock
      .toString()
      .replace(/,/g, "");
    if (
      isNaN(Number(_value_price)) ||
      isNaN(Number(_value_quantity_in_stock))
    ) {
      dispatch({
        type: Types.ALERT_UID_STATUS,
        alert: {
          type: "danger",
          title: "Lỗi ",
          disable: "show",
          content: "Sai định dạng hoặc bị để trống",
        },
      });
      return;
    }
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    productApi
      .updateProduct(store_code, data, productId)
      .then((res) => {
        funcModal();
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
            content: res.data.msg,
          },
        });
        // history.goBack();
      })
      .catch(function (error) {
        var content = "";
        if (typeof error.response.data.msg == "undefined")
          content = "Vui lòng chọn ảnh và nhập đầy đủ các thông tin";
        else content = error.response.data.msg;
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
            content: content,
          },
        });
      });
  };
};

export const updateDistribute = (
  store_code,
  data,
  productId,
  branchId,
  form,
  page,
  params,
  funcModal
) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    productApi
      .updateDistribute(store_code, data, productId, branchId)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        dispatch(
          updateProduct(store_code, form, productId, page, params, funcModal)
        );
      })
      .catch(function (error) {
        dispatch({
          type: Types.ALERT_UID_STATUS,
          alert: {
            type: "danger",
            title: "Lỗi",
            disable: "show",
            content: error?.response?.data?.msg || error,
          },
        });
      });
    // .finally(() => {
    //   dispatch(
    //     updateProduct(store_code, form, productId, page, params, funcModal)
    //   );
    // });
  };
};

export const updateDistributeWithoutBranch = (store_code, data, productId) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    productApi
      .updateDistributeWithoutBranch(store_code, data, productId)
      .then((res) => {
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
            content: res.data.msg,
          },
        });

        dispatch({
          type: Types.SUCCESS_EDIT_ITEM_PRODUCT_IN_LIST,
          data: res.data.product,
        });
      })
      .catch(function (error) {
        dispatch({
          type: Types.ALERT_UID_STATUS,
          alert: {
            type: "danger",
            title: "Lỗi",
            disable: "show",
            content: error?.response?.data?.msg || error,
          },
        });
      })
      .finally(() => {});
  };
};

export const removeItemImgDis = (data) => {
  return {
    type: Types.UPLOAD_ALL_DISTRIBUTE_IMG,
    data: data,
  };
};

export const destroyProduct = (store_code, id, brandId, page, params) => {
  const branch_id = getBranchId();
  const branch_ids = getBranchIds();
  const branchIds = branch_ids ? branch_ids : branch_id;
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    productApi
      .destroyProduct(store_code, id)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        productApi
          .fetchAllProductV2(store_code, branchIds, page, params)
          .then((res) => {
            if (res.data.code !== 401)
              dispatch({
                type: Types.FETCH_ALL_PRODUCT,
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

export const destroyMultiProduct = (store_code, data, page, params) => {
  const branch_id = getBranchId();
  const branch_ids = getBranchIds();
  const branchIds = branch_ids ? branch_ids : branch_id;
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    productApi
      .destroyMultiProduct(store_code, { list_id: data })
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        productApi
          .fetchAllProductV2(store_code, branchIds, page, params)
          .then((res) => {
            if (res.data.code !== 401)
              dispatch({
                type: Types.FETCH_ALL_PRODUCT,
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

export const fetchProductAgencyPrice = (store_code, id, agency_id) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    productApi
      .fetchProductAgencyPrice(store_code, id, agency_id)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        if (res.data.code !== 401)
          dispatch({
            type: Types.FETCH_ID_PRODUCT_AGENCY_PRICE,
            data: res.data.data,
          });
      });
  };
};

export const fetchProductId = (store_code, id) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    productApi.fetchProductId(store_code, id).then((res) => {
      dispatch({
        type: Types.SHOW_LOADING,
        loading: "hide",
      });
      if (res.data.code !== 401)
        dispatch({
          type: Types.FETCH_ID_PRODUCT,
          data: res.data.data,
        });
    });
  };
};
export const uploadVideoProduct = (file) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    uploadApi
      .uploadVideo(file)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        dispatch({
          type: Types.UPLOAD_PRODUCT_VIDEO,
          data: res.data.data,
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
  };
};

export const changePercentCol = (store_code, data, onSuccess = () => {}) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    productApi
      .changePercentCol(store_code, data)
      .then((res) => {
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
            content: res.data.msg,
          },
        });
        if (onSuccess) onSuccess();
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

export const getAmountProductNearlyOutStock = (store_code, branch_id) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    productApi
      .getAmountProductNearlyOutStock(store_code, branch_id)
      .then((res) => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });

        if (res.data.code === 200)
          dispatch({
            type: Types.FETCH_AMOUNT_PRODUCT_NEARLY_OUT_STOCK,
            data: res.data.data?.total_product_or_discount_nearly_out_stock,
          });
      })
      .catch(function (error) {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
        // dispatch({
        //   type: Types.ALERT_UID_STATUS,
        //   alert: {
        //     type: "danger",
        //     title: "Lỗi",
        //     disable: "show",
        //     content: error?.response?.data?.msg,
        //   },
        // });
      });
  };
};

export const getProductRetailSteps = (store_code, branch_id, idProduct) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show",
    });
    productApi
      .getProductRetailSteps(store_code, branch_id, idProduct)
      .then((res) => {
        if (res.data.code !== 401)
          dispatch({
            type: Types.FETCH_ALL_PRODUCT_RETAIL_STEPS,
            data: res.data.data,
          });
      })
      .finally(() => {
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide",
        });
      });
  };
};
