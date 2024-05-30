import getChannel, { IKIPOS } from "./channel";

const posTheme = {
  loginTitle: "IKIPOS",
  backgroundColor: "#E56F25",
  modalNoti: "#E56F25",
  buttonYes: "#F7C23E",
  logoTab: "/images/logo/ikipos_logo_tab.png",
  //   logo: "/images/logo/ikipos_logo.png",
  //   logoLogin: "/images/logo/ikipos_login.jpg",
  logo: "/images/logo/ikitech_logo.jpg",
  logoLogin: "/images/logo/ikitech_login.jpg",
  favicon: "/images/logo/ikipos_logo_tab.png",
};

const ikitechTheme = {
  loginTitle: "IKITECH",
  backgroundColor: "#C12026",
  modalNoti: "#E56F25",
  buttonYes: "#F7C23E",
  logoTab: "/images/logo/ikitech_logo_tab.png",
  // logo: "/images/logo/ikitech_logo.jpg",
  // logoLogin: "/images/logo/ikitech_login.jpg",
  logo: "/images/logo/ikitech_logo.jpg",
  logoLogin: "/images/logo/ikitech_login.jpg",
  favicon: "/images/logo/ikitech_favicon.png",
};

export default function themeData() {
  if (getChannel() == IKIPOS) {
    return posTheme;
  }

  return ikitechTheme;
}
