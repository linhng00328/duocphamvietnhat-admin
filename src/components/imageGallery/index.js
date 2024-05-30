import dialog from "suneditor/src/plugins/modules/dialog";
import moment from "moment"
import "./style.css";

export const lazyImageObserver = () => {
  if ("IntersectionObserver" in window) {
    return new IntersectionObserver(function (entries, observer) {
      const _this = this;
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          let lazyImage = entry.target;
          // lazyImage.src = lazyImage.dataset.src;
          // lazyImage.srcset = lazyImage.dataset.srcset;
          lazyImage.parentNode.classList.remove("loading");
          _this.unobserve(lazyImage);
        }
      });
    });
  }
};

const imageGallery = {
  name: "imageGallery",
  display: "dialog",
  title: "Imagens",
  innerHTML: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.75 15.77">
      <g><path d="M8.77,8.72a.88.88,0,0,1-.61-.27.82.82,0,0,1-.25-.61.89.89,0,0,1,.25-.62A.82.82,0,0,1,8.77,7a.81.81,0,0,1,.61.25.83.83,0,0,1,.27.62.81.81,0,0,1-.25.61.91.91,0,0,1-.63.27Zm9.62-5a1.74,1.74,0,0,1,1.76,1.76V17.76a1.74,1.74,0,0,1-1.76,1.76H6.16A1.74,1.74,0,0,1,4.4,17.76V5.51A1.74,1.74,0,0,1,6.16,3.75H18.39Zm0,1.75H6.16v8L8.53,11.8a.94.94,0,0,1,.54-.17.86.86,0,0,1,.54.2L11.09,13l3.64-4.55a.78.78,0,0,1,.34-.25.85.85,0,0,1,.42-.07.89.89,0,0,1,.39.12.78.78,0,0,1,.28.29l2.24,3.67V5.51Zm0,12.24V15.6L15.3,10.53,11.89,14.8a.89.89,0,0,1-.59.32.82.82,0,0,1-.64-.18L9,13.62,6.16,15.74v2Z" transform="translate(-4.4 -3.75)"></path></g>
    </svg>
  `,
  buttonClass: "",
  add: function (core) {
    core.addModule([dialog]);

    const context = core.context;
    context.imageGallery = {};

    let media_dialog = this.setDialog.call(core);
    context.imageGallery.modal = media_dialog;

    context.dialog.modal.appendChild(media_dialog);

    media_dialog = null;
  },
  setDialog: function () {
    const lang = this.lang;
    const dialog = this.util.createElement("DIV");
    this.util.addClass(dialog, "se-dialog-content");

    dialog.style.display = "none";
    dialog.innerHTML = `
        <div class="se-dialog-header">
          <button
            type="button"
            data-command="close"
            class="se-btn se-dialog-close"
            aria-label="${lang.dialogBox.close}"
            title="${lang.dialogBox.close}"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.74 15.74">
              <g><path d="M14.15,11.63l5.61,5.61a1.29,1.29,0,0,1,.38.93,1.27,1.27,0,0,1-.4.93,1.25,1.25,0,0,1-.92.4,1.31,1.31,0,0,1-.94-.4l-5.61-5.61L6.67,19.1a1.31,1.31,0,0,1-.94.4,1.24,1.24,0,0,1-.92-.4,1.27,1.27,0,0,1-.4-.93,1.33,1.33,0,0,1,.38-.93l5.61-5.63L4.79,6a1.26,1.26,0,0,1-.38-.93,1.22,1.22,0,0,1,.4-.92,1.28,1.28,0,0,1,.92-.39,1.38,1.38,0,0,1,.94.38l5.61,5.61,5.61-5.61a1.33,1.33,0,0,1,.94-.38,1.26,1.26,0,0,1,.92.39,1.24,1.24,0,0,1,.4.92,1.29,1.29,0,0,1-.39.93L17,8.81l-2.8,2.82Z" transform="translate(-4.41 -3.76)"></path></g>
            </svg>
          </button>
          <span class="se-modal-title">
          Thư viện ảnh
          </span>
        </div>
        <div class="se-dialog-body se-dialog-fixed-body">
          <div class="loader">
            <div class="loader-wrapper">
              <svg class="loader-svg loader-animation" viewBox="22 22 44 44">
                <circle class="loader-circle" cx="44" cy="44" r="20.2" fill="none" stroke-width="3.6"></circle>
              </svg>
            </div>
          </div>
          <div class="listImages"></div>
        </div>
        <div class="se-dialog-footer">
          <button type="button" data-command="close" class="se-btn-primary">
            <span>${lang.dialogBox.close}</span>
          </button>
        </div>
      `;

    return dialog;
  },
  close: function (event) {
    event.preventDefault();
    event.stopPropagation();

    this.plugins.dialog.close.call(this);
  },
  on: function () {
    this.plugins.imageGallery.loadImages.call(this, this.context);
  },
  init: function () { },
  loadImages: function (core) {
    const obj = this;
    const modal = core.imageGallery.modal;
    const loader = modal.querySelector(".loader");
    const listImages = modal.querySelector(".listImages");
    const lazyImage = lazyImageObserver();

    loader.classList.remove("hide");
    listImages.classList.add("hide");

    this.context.imageGallery._xmlHttp = this.util.getXMLHttpRequest();

    this.context.imageGallery._xmlHttp.onreadystatechange = function () {
      console.log(this)
      if (this.readyState === 4 && this.status === 201) {
        const json = JSON.parse(this.responseText);

        listImages.innerHTML = "";
        console.log(json)
        json.data?.data?.forEach((img) => {
          const url = img.image_url;
          const caption = `${img.filename}`
          const date =  moment(img.created_at).format("DD-MM-YYYY HH:mm:ss")
          const anchor = document.createElement("DIV");
          obj.util.addClass(anchor, "wrapperImage loading");

          const image = document.createElement("img");
          image.src = url;

          const imgCaption = document.createElement("DIV");
          const imgDate = document.createElement("DIV");

          obj.util.addClass(imgCaption, "imgCaption");
          obj.util.addClass(imgDate, "imgDate");
          imgCaption.innerHTML = caption;
          imgDate.innerHTML = date;



          image.addEventListener("click", function (event) {
            obj.plugins.imageGallery.addImage.call(obj, event);
          });

          anchor.appendChild(image);
          anchor.appendChild(imgCaption);
          anchor.appendChild(imgDate);

          listImages.appendChild(anchor);

          /** Apply lazy loading images */
          Array.from(
            document.querySelectorAll(".wrapperImage > img")
          ).forEach((image) => lazyImage.observe(image));
        });

        loader.classList.add("hide");
        listImages.classList.remove("hide");
      }
    };

    this.context.imageGallery._xmlHttp.open(
      "get",
      this.context.option.imageGalleryLoadURL,
      true
    );

    if (this.context.option.requestHeaders) {
      const requestHeaders = this.context.option.requestHeaders;

      Object.entries(requestHeaders).forEach(([key, value]) => {
        this.context.imageGallery._xmlHttp.setRequestHeader(key, value);
      });
    }

    this.context.imageGallery._xmlHttp.send();
  },
  addImage: function (event) {
    const imgsrc = event.srcElement.src;

    /**  https://github.com/JiHong88/SunEditor/blob/d155b1d7d4437002e52b4502a621e25699791f97/src/plugins/dialog/image.js#L537 */
    this.plugins.image.create_image.call(
      this,
      imgsrc,
      "",
      false,
      0,
      0,
      "none",
      null
    );

    this.plugins.dialog.close.call(this);
  },
  open: function () {
    this.plugins.dialog.open.call(
      this,
      "imageGallery",
      "imageGallery" === this.currentControllerName
    );
  }
};

export default imageGallery;
