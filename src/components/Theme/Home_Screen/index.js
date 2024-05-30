import React, { Component } from "react";
import * as themeAction from "../../../actions/theme";
import { connect } from "react-redux";
import { shallowEqual } from "../../../ultis/shallowEqual";
import * as Env from "../../../ultis/default";
import ItemTheme from "./ItemTheme";
import Custom_Screen from "../Custom_Screen";
import ModalDefaultReset from "./ModalDefaultReset";
import styled from "styled-components";
import ModalDetailsTheme from "./ModalDetailsTheme";

const HomeScreenStyles = styled.div`
  .theme__list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-top: 20px;
  }
  @media screen and (max-width: 992px) {
    .theme__list {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media screen and (max-width: 768px) {
    .theme__list {
      grid-template-columns: repeat(1, 1fr);
    }
  }
`;

class Home_Screen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      home_page_type: null,
      is_custom: false,
      showDetailsTheme: false,
      infoDetailsTheme: {},
    };

    //1         10  => [11, 10, 10, 8, 6],
    //2         4  => [4, 4, 4, 4, 1],
    //3         9  => [10, 9, 9, 2, 5],
    //4         1  => [1, 1, 1, 1, 1],
    //5         2  => [2, 2, 2, 2, 1],
    //6         3  => [3, 3, 3, 3, 1],
    //7         5  => [5, 5, 5, 5, 2],
    //8         6  => [7, 7, 4, 3, 1],
    //9         7  => [8, 8, 7, 4, 2],
    //10         8 => [9, 4, 5, 5, 5],
    //11        11  => [12, 11, 11, 9, 7]

    this.initTheme = [
      {
        isVip: false,
        index: 10,
        themeTop: "../images/Thoitrang_top_10.jpg",
        theme: "../images/Thoitrang_10.png",
        arr_index_component: [11, 10, 10, 8, 6],
        demo_link: "https://shopthoitrang.myiki.vn/",
        name: "Thời trang",
        banner_type: "Banner trải dài",
        banner_height: "677",
        banner_width: "1481",
        description:
          "Giao diện được thiết kế trẻ trung, phong cách phù với bán các sản phẩm mỹ phẩm, thời trang",
        carrers: "Thời trang, trang điểm",
      },
      {
        isVip: false,
        index: 4,
        themeTop: "../images/Mypham_top_4.jpg",
        theme: "../images/Mypham_4.png",
        arr_index_component: [4, 4, 4, 4, 1],
        demo_link: "https://myphamdemo.myiki.vn/",
        name: "Mỹ phẩm",
        banner_type: "Banner trải dài",
        banner_height: "475",
        banner_width: "1481",
        description:
          "Giao diện được thiết kế trẻ trung, phong cách phù với bán các sản phẩm mỹ phẩm, thời trang",
        carrers: "Thời trang, Mỹ phẩm",
      },
      {
        isVip: false,
        index: 9,
        themeTop: "../images/Thucphamsach_top_9.jpg",
        theme: "../images/Thucphamsach_9.png",
        arr_index_component: [10, 9, 9, 2, 5],
        demo_link: "https://thucphamsach.myiki.vn/",
        name: "Thực phẩm",
        banner_type: "Banner kết hợp danh mục và quảng cáo",
        banner_height: "355",
        banner_width: "702",
        description:
          "Giao diện phù hợp với bán các sản phẩm liên quan đến đồ ăn, hoa quả",
        carrers: "Đồ ăn, hoa quả",
      },
      {
        isVip: false,
        index: 1,
        themeTop: "../images/Dienthoailaptop_top_1.jpg",
        theme: "../images/Dienthoailaptop_1.png",
        arr_index_component: [1, 1, 1, 1, 1],
        demo_link: "https://mobiledemo.myiki.vn/",
        name: "Đồ điện tử",
        banner_type: "Banner kết hợp danh mục và quảng cáo",
        banner_height: "426",
        banner_width: "743",
        description:
          "Giao diện giúp cho cửa hàng có thể dễ dàng bán các sản phẩm điện tử cho chính mình",
        carrers: "Đồ điện tử, gia dụng",
      },
      {
        isVip: false,
        index: 2,
        themeTop: "../images/Mevabe_top_2.jpg",
        theme: "../images/Mevabe_2.png",
        arr_index_component: [2, 2, 2, 2, 1],
        demo_link: "https://shopmevabe.myiki.vn/",
        name: "Đồ trẻ em",
        banner_type: "Banner kết hợp danh mục",
        banner_height: "410",
        banner_width: "915",
        description:
          "Giao diện được thiết kế phù hợp trẻ trung, tươi mới phù hợp với bán các sản phẩm cho bé",
      },
      {
        isVip: false,
        index: 3,
        themeTop: "../images/Noithat_top_3.jpg",
        theme: "../images/Noithat_3.png",
        arr_index_component: [3, 3, 3, 3, 1],
        demo_link: "https://noithatdemo.myiki.vn/",
        name: "Đồ nội thất",
        banner_type: "Banner trải dài",
        banner_height: "1530",
        banner_width: "580",
        description:
          "Giao diện được thiết kế phù hợp với bán các sản phẩm nội thát",
        carrers: "Nội thất, Trang điểm",
      },
      {
        isVip: false,
        index: 5,
        themeTop: "../images/Vanphongpham_top_5.jpg",
        theme: "../images/Vanphongpham.png",
        arr_index_component: [5, 5, 5, 5, 2],
        demo_link: "https://vanphongphamdemo.myiki.vn/",
        name: "Văn phòng phẩm",
        banner_type: "Banner kết hợp danh mục và quảng cáo",
        banner_height: "410",
        banner_width: "673",
        description:
          "Giao diện được thiết kế đẹp mắt phù hợp với các sản phẩm văn phòng",
        carrers: "Văn phòng phẩm",
      },
      {
        isVip: false,
        index: 6,
        themeTop: "../images/Doanvat_top_6.jpg",
        theme: "../images/Doanvat_6.png",
        arr_index_component: [7, 7, 4, 3, 1],
        demo_link: "https://nowshopdemo.myiki.vn/",
        name: "Đồ ăn vặt",
        banner_type: "Banner trải dài",
        banner_height: "412",
        banner_width: "1170",
        description:
          "Giao diện được thiết kế với gam màu rực rỡ phù hợp với bán các sản phẩm đồ ăn, hoa quả",
        carrers: "Đồ ăn, hoa quả",
      },
      {
        isVip: false,
        index: 7,
        themeTop: "../images/Dogiadung_top_7.jpg",
        theme: "../images/Dogiadung_7.png",
        arr_index_component: [8, 8, 7, 4, 2],
        demo_link: "https://dogiadungdemo.myiki.vn/",
        name: "Đồ gia dụng",
        banner_type: "Banner kết hợp danh mục và quảng cáo",
        banner_height: "410",
        banner_width: "685",
        description:
          "Giao diện được thiết kết phù hợp với các sản phẩm đồ gia dụng, đồ điện tử",
        carrers: "Đồ gia dụng, đồ điện tử",
      },
      {
        isVip: false,
        index: 8,
        themeTop: "../images/Hoaquanhapkhau_top_8.jpg",
        theme: "../images/Hoaquanhapkhau_8.png",
        arr_index_component: [9, 4, 5, 5, 5],
        demo_link: "https://shophoaquademo.myiki.vn/",
        name: "Hoa quả",
        banner_type: "Banner trải dài",
        banner_height: "1481",
        banner_width: "440",
        description:
          "Giao diện được thiết kế phù hợp với bán các mặt hàng đồ ăn, hoa quả",
        carrers: "Đồ ăn, hoa quả",
      },
      {
        isVip: true,
        index: 11,
        themeTop: "../images/Dodientu_giadung_top_11.jpg",
        theme: "../images/Dodientu_giadung_11.png",
        arr_index_component: [12, 11, 11, 9, 7],
        demo_link: "https://dientuvip1.myiki.vn/",
        name: "Điện tử VIP 1",
        banner_type: "Banner trải dài",
        banner_height: "702",
        banner_width: "355",
        description:
          "Giao diện được thiết kế phù hợp với bán các mặt hàng đồ điện tử, gia dụng",
        carrers: "Điện tử",
      },
      {
        isVip: false,
        index: 12,
        themeTop: "../images/bachhoaxanh_12.jpg",
        theme: "../images/bachhoaxanh_12.png",
        arr_index_component: [13, 1, 12, 5, 2],
        demo_link: "https://bachhoaxanh.myiki.vn/",
        name: "Bách hóa xanh",
        banner_type: "Không có banner",
        banner_height: "702",
        banner_width: "355",
        description: "Giao diện được thiết kế phù hợp với bán bách hóa",
        carrers: "Tạp hóa",
      },
    ];
  }
  setShowModalDetailsTheme = (showDetails) => {
    this.setState({
      showDetailsTheme: showDetails,
    });
  };
  setInfoDetailsTheme = (infoDetails) => {
    this.setState({
      infoDetailsTheme: infoDetails,
    });
  };
  getThemeDefault = (index) => {
    var data = null;
    this.initTheme.forEach((e) => {
      if (e.index == index) data = e;
    });

    return data;
  };

  onChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;

    this.setState({
      [name]: value,
    });
  };

  componentDidMount() {
    var theme = this.props.theme;

    if (theme == null || theme == "" || typeof theme.store_id == "undefined") {
    } else {
      this.setState({
        store_id: theme.store_id,
        home_page_type: theme.home_page_type,
        theme_default: this.getThemeDefault(theme.home_page_type),
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      !shallowEqual(nextProps.theme, this.props.theme) ||
      nextProps.tabId != this.props.tabId
    ) {
      var theme = nextProps.theme;
      this.setState({
        store_id: theme.store_id,
        home_page_type: theme.home_page_type,
        theme_default: this.getThemeDefault(theme.home_page_type),
      });
    }
  }

  resetTheme = (theme) => {
    if (theme == null) return;

    var { store_code } = this.props;
    var form = { ...this.props.theme };
    form.header_type = theme.arr_index_component[0];
    form.banner_type = theme.arr_index_component[1];
    form.product_home_type = theme.arr_index_component[2];
    form.post_home_type = theme.arr_index_component[3];
    form.footer_type = theme.arr_index_component[4];

    this.props.updateTheme(store_code, form);
  };

  chooseTheme = (theme) => {
    if (theme == null) return;

    var { store_code } = this.props;
    var form = { ...this.props.theme };

    //         $appThemeExists->header_type = $arr_Data[0];
    //         $appThemeExists->banner_type = $arr_Data[1];
    //         $appThemeExists->product_home_type = $arr_Data[2];
    //         $appThemeExists->post_home_type = $arr_Data[3];
    //         $appThemeExists->footer_type = $arr_Data[4];

    form.home_page_type = theme.index;

    form.header_type = theme.arr_index_component[0];
    form.banner_type = theme.arr_index_component[1];
    form.product_home_type = theme.arr_index_component[2];
    form.post_home_type = theme.arr_index_component[3];
    form.footer_type = theme.arr_index_component[4];

    this.props.updateTheme(store_code, form);
  };

  onChangeCustom = () => {
    this.setState({
      is_custom: !this.state.is_custom,
    });
  };

  render() {
    var { home_page_type, is_custom } = this.state;
    var { badges, store_code, theme } = this.props;

    if (is_custom == true) {
      return (
        <Custom_Screen
          // tabId={tabId}\dashboard\hahaha
          theme_default={this.state.theme_default}
          store_code={store_code}
          chooseTheme={this.chooseTheme}
          resetTheme={this.resetTheme}
          goBack={() => {
            this.onChangeCustom();
          }}
          theme={theme}
        />
      );
    }

    return (
      <HomeScreenStyles className="overview">
        <form role="form">
          <div class="box-body">
            <div class="theme__list">
              {this.initTheme.map((v, i) => {
                if (
                  v.isVip == false ||
                  (v.isVip == true &&
                    (
                      this.props.badges?.config_user_vip?.list_id_theme_vip ??
                      []
                    ).includes(v.index))
                ) {
                  return (
                    <ItemTheme
                      key={i}
                      badges={badges}
                      chooseTheme={this.chooseTheme}
                      home_page_type={home_page_type}
                      v={v}
                      goBack={() => {
                        this.onChangeCustom();
                      }}
                      setShowModalDetailsTheme={this.setShowModalDetailsTheme}
                      setInfoDetailsTheme={this.setInfoDetailsTheme}
                    />
                  );
                }

                return <div></div>;
              })}
            </div>
            {Object.entries(this.state.infoDetailsTheme).length > 0 &&
              this.state.showDetailsTheme && (
                <ModalDetailsTheme
                  themeInfo={this.state.infoDetailsTheme}
                  setShowModalDetailsTheme={this.setShowModalDetailsTheme}
                  chooseTheme={this.chooseTheme}
                />
              )}
          </div>
          <div class="box-footer"></div>
        </form>
      </HomeScreenStyles>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    badges: state.badgeReducers.allBadge,
    theme: state.themeReducers.theme,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    updateTheme: (store_code, theme) => {
      dispatch(themeAction.updateTheme(store_code, theme));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home_Screen);
