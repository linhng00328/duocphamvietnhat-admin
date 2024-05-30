import moment from "moment";
import * as Config from "../constants/Config";
import Resizer from "react-image-file-resizer";
import getChannel, { IKITECH, IKIPOS } from "./channel";
import history from "../history";
import { includes } from "lodash";
import { ikitech_menu } from "./menu/ikitech_menu";
export const randomString = (length) => {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const getDetailAdress = (
  address_detail,
  wards_name,
  district_name,
  province_name
) => {
  var detail = "";

  if (!address_detail && !wards_name && !district_name && !province_name) {
    return "";
  }
  if (address_detail) detail += address_detail;
  if (wards_name) detail += `${wards_name ? ", " : ""}${wards_name}`;
  if (district_name)
    detail += `${address_detail || wards_name ? ", " : ""}${district_name}`;
  if (province_name)
    detail += `${
      address_detail || wards_name || district_name ? ", " : ""
    }${province_name}`;

  return detail;
};

export const contactOrNumber = (data) => {
  if (getChannel() == IKIPOS) {
    return data;
  } else {
    var string = data.slice(0, -2);
    var newString = string
      .toString()
      .replace(/\./g, "")
      .toString()
      .replace(/,/g, "")
      .toString()
      .replace(/-/g, "")
      .toString();
    if (newString == 0) {
      return "Liên hệ";
    } else {
      return data;
    }
  }
};

export const containsSpecialChars = (str) => {
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  return specialChars.test(str);
};

// export const compressed = (file, maxWitdh = 1024, maxHeight = 1024) => {
//   return new Promise((resolve, reject) => {
//     new Compressor(file, {
//       quality: 0.8,
//       maxWitdh,
//       maxHeight,
//       success: (compressedResult) => {
//         resolve(compressedResult);
//       },
//     });
//   });
// };

export const compressed = (file, maxWitdh = 1024, maxHeight = 1024) => {
  const type = file.type.split("/")[1];
  return new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      maxWitdh <= 0 ? 2048 : maxWitdh,
      maxHeight <= 0 ? 2048 : maxHeight,
      type ?? "WEBP",
      50,
      0,
      (uri) => {
        resolve(uri);
      },
      "file"
    );
  });
};

export const isPhone = (phone) => {
  var vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
  return vnf_regex.test(phone);
};
export function removeAscent(str) {
  if (str === null || str === undefined) return str;
  str = str.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  return str;
}

export const isSpecialCharactor = (string) => {
  var vnf_regex = /^[a-zA-Z0-9- ]*$/;
  return vnf_regex.test(removeAscent(string));
};

export const isEmail = (email) => {
  if (email) var email = email.toString().replace(/ /g, "");
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const formatStringCharactor = (data) => {
  return typeof data !== "undefined" && data !== null
    ? data.toString().replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, "")
    : "";
};

export const isEmpty = (data) => {
  if (data == null || typeof data == "undefined") return false;
  return data.toString().replace(/ /g, "").length > 0;
};
export const countString = (data) => {
  if (data == null || typeof data == "undefined") return false;
  return data.toString().replace(/ /g, "").length;
};
export const callUrl = () => {
  var hostname = window.location.hostname;
  var name = "";
  if (
    hostname.includes("localhost") ||
    hostname.includes("ikiglobal.com") ||
    hostname.includes("isempai.net")
  )
    name = Config.API_URL_DEV;
  else name = Config.API_URL_MAIN;
  return name;
};
export const callUrlSocket = () => {
  var hostname = window.location.hostname;
  var name = "";
  if (
    hostname.includes("localhost") ||
    hostname.includes("ikiglobal.com") ||
    hostname.includes("isempai.net")
  )
    name = Config.API_URL_SOCKET_DEV;
  else name = Config.API_URL_SOCKET_MAIN;
  return name;
};

export const loadFileInput = (name, upload = "#", mp4 = false) => {
  window.$(`#${name}`).fileinput({
    theme: "fa",
    overwriteInitial: true,
    uploadUrl: upload,
    allowedFileExtensions: mp4 == true ? ["mp4"] : ["jpg", "png", "jpeg"],
    maxFilesNum: 10,
    slugCallback: function (filename) {
      return filename.replace("(", "_").replace("]", "_");
    },
  });
};

export const formatVND = (str) => {
  return str
    .split("")
    .reverse()
    .reduce((prev, next, index) => {
      return (index % 3 ? next : next + ".") + prev;
    });
};

export const filter_arr = (variable) => {
  return typeof variable == "undefined" || variable == null || variable == ""
    ? []
    : variable;
};

export const filter_var = (variable) => {
  return typeof variable == "undefined" || variable == null ? "" : variable;
};

export const format = (number) => {
  var num = Number(number);
  return num.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
};
export const formatNoD = (number) => {
  if (
    number == "" ||
    number == null ||
    isNaN(Number(number)) ||
    !number ||
    typeof number == "undefined"
  )
    number = 0;

  return number.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  // var number = number.toString().replace(/\./g, ".");
  //  number = parseInt(number);

  // let dollarUSLocale = Intl.NumberFormat("en-US");
  // return dollarUSLocale.format((number ?? 0));
};
export const formatNoDWithEmpty = (number) => {
  if (number == "" || number == null) return "";
  var number = number.toString().replace(/\./g, ".");
  number = parseInt(number);

  let dollarUSLocale = Intl.NumberFormat("en-US");
  return dollarUSLocale.format(number ?? 0);
};

function updateQueryStringParameter(uri, key, value) {
  var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
  var separator = uri.indexOf("?") !== -1 ? "&" : "?";
  if (uri.match(re)) {
    return uri.replace(re, "$1" + key + "=" + value + "$2");
  } else {
    return uri + separator + key + "=" + value;
  }
}

export const insertParam = (params2) => {
  // kvp looks like ['key1=value1', 'key2=value2', ...]
  var kvp = document.location.search.substr(1).split("&");

  let i = 0;

  kvp = kvp.filter(function (item) {
    var has = false;
    for (var [key, value] of Object.entries(params2)) {
      if (item.includes(key)) {
        has = true;
      }
    }
    return !has;
  });

  for (; i < kvp.length; i++) {
    if (kvp[i].startsWith(key + "=")) {
      let pair = kvp[i].split("=");
      pair[1] = value;
      kvp[i] = pair.join("=");
      break;
    }
  }

  for (var [key, value] of Object.entries(params2)) {
    if (i >= kvp.length) {
      kvp[kvp.length] = [key, value].join("=");
    }
    i++;
  }

  // can return this or...
  let params = "?" + kvp.join("&");

  // reload page with new params
  window.history.replaceState(null, null, params);
};

export const setQueryParamInUrl = (key, value) => {
  var url = window.location.pathname + window.location.hash;
  url = updateQueryStringParameter(url, key, value);
  history.replace(url);
};

export const loadExpandTable = () => {
  window.$(".exploder").unbind("click");
  window.$(".exploder").click(function () {
    window.$(this).toggleClass("btn-outline-success btn-outline-danger");

    window.$(this).children("span").toggleClass("fa-plus fa-minus");

    window.$(this).closest("tr").next("tr").toggleClass("hide");

    if (window.$(this).closest("tr").next("tr").hasClass("hide")) {
      window.$(this).closest("tr").next("tr").children("td").slideUp();
    } else {
      window.$(this).closest("tr").next("tr").children("td").slideDown(350);
    }
  });
};

export const getDateForChartHour = () => {
  var from = moment().format("YYYY-MM-DD");
  var to = from;
  return {
    from,
    to,
  };
};

export const formatNumber = (value) => {
  var _value = value;
  var numStr =
    typeof _value !== "undefined" && _value != null
      ? _value.toString().replace(/\./g, "").replace(/,/g, "").replace(/-/g, "")
      : "";
  var numStr = parseFloat(numStr);
  return isNaN(numStr) ? 0 : numStr;
};

export const getQueryParams = (name) => {
  return new URLSearchParams(window ? window.location.search : {}).get(name);
};

export const formatNumberV2 = (str) => {
  if (str === undefined || str === null) return "";
  const strFormat = str
    .toString()
    .replace(/[A-Za-z`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/g, "");
  if (Number(strFormat) >= 1000) {
    return strFormat
      .split("")
      .reverse()
      .reduce((prev, next, index) => {
        return (index % 3 ? next : next + ".") + prev;
      });
  } else if (Number(strFormat) >= 0 && Number(strFormat) < 1000) {
    return Number(strFormat);
  } else {
    return "";
  }
};

export const removeSignNumber = (value) => {
  var _value = value;
  var numStr =
    typeof _value !== "undefined"
      ? _value.toString().replace(/\./g, "").replace(/,/g, "").replace(/-/g, "")
      : "";
  var numStr = parseFloat(numStr);
  return isNaN(numStr) ? 0 : numStr;
};

export const getDateForChartDay = () => {
  console.log(moment().day());

  return {
    from: moment().format("YYYY-MM-DD"),
    to: moment().format("YYYY-MM-DD"),
  };
};

export const stringToInit = (value) => {
  var _value = value;
  var numStr = _value;
  var numStr = parseFloat(numStr);
  return isNaN(numStr) ? 0 : numStr;
};

export const getDateForChartWeek = () => {
  console.log(moment().day());
  if (moment().day() == 0) {
    return {
      from: moment().subtract(6, "days").format("YYYY-MM-DD"),
      to: moment().format("YYYY-MM-DD"),
    };
  }
  var weekStart = moment().clone().weekday(1).format("YYYY-MM-DD");
  var from = weekStart;
  var to = moment().format("YYYY-MM-DD");
  return {
    from,
    to,
  };
};
export const getDateForChartMonth = () => {
  var monthStart = moment().startOf("month").format("YYYY-MM-DD");
  console.log("monstart", monthStart);
  var from = monthStart;
  var to = moment().format("YYYY-MM-DD");
  return {
    from,
    to,
  };
};
export const getDateForChartYear = () => {
  var monthStart = moment().format("YYYY");
  var from = "01-01-" + monthStart;
  var to = moment().format("YYYY-MM-DD");
  return {
    from,
    to,
  };
};
export const removeVietnameseTones = (str) => {
  try {
    return (str = false
      ? null
      : str
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/\s/g, "")
          .trim());
  } catch (error) {
    return str;
  }
};

export const handleReloadBranch = (listBranches, pathName, returnBolean) => {
  const url_branches = [];
  ikitech_menu.forEach((menuParent) => {
    menuParent.link.forEach((item) => {
      if (item.isShowWhenManyBranch) {
        if (item.children?.length > 0) {
          item.children.forEach((child) => {
            if (child.isShowWhenManyBranch) {
              url_branches.push(child.to);
            }
          });
        } else {
          url_branches.push(item.to);
        }
      }
    });
  });

  const urlNavigate = pathName ? pathName : "";
  if (returnBolean) {
    const isPermission = listBranches
      ? url_branches.some((branch) => urlNavigate.includes(branch) === true)
      : true;
    return isPermission;
  } else {
    const isReloadHome = listBranches
      ? !url_branches.some((branch) => urlNavigate.includes(branch) === true)
      : false;
    if (isReloadHome) {
      window.location.href = "/";
    } else {
      window.location.reload();
    }
  }
};
