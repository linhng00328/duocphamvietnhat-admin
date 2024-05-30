import * as userLocalApi from "../data/local/user";
import { callUrl, isEmpty } from "../ultis/helpers";
import { getStoreCode } from "../ultis/branchUtils";

export const handleImageUploadBefore = (files, info, uploadHandler) => {
  try {
    uploadImageCallBack(files[0]).then((data) => {
      var response = {
        result: [
          {
            url: data.data.link,
            name: files[0].name,
            size: files[0].size,
          },
        ],
      };
      uploadHandler(response);
    });
  } catch (err) {
    uploadHandler(null);
  }
};

export const uploadImageCallBack = (file, store_code = null) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `${callUrl() + "/store/" + getStoreCode() + "/images"}`);
    xhr.setRequestHeader("token", userLocalApi.getToken());
    const data = new FormData();
    data.append("image", file);
    xhr.send(data);
    xhr.addEventListener("load", () => {
      const response = JSON.parse(xhr.responseText);
      console.log(response.data);
      resolve({
        data: {
          link: response.data?.image_url,
        },
      });
    });
    xhr.addEventListener("error", () => {
      const error = JSON.parse(xhr.responseText);
      console.log(error);
      reject(error);
    });
  });
};

export const embedVideoCallBack = (link) => {
  if (link.indexOf("youtube") >= 0) {
    link = link.replace("watch?v=", "embed/");
    link = link.replace("/watch/", "/embed/");
    link = link.replace("youtu.be/", "youtube.com/embed/");
  }
  return link;
};
