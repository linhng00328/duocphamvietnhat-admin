import { Component } from "react";
import styled from "styled-components";
import Footer from "../../components/Partials/Footer";
import Sidebar from "../../components/Partials/Sidebar";
import Topbar from "../../components/Partials/Topbar";

const ManualStyles = styled.div`
  .manual {
    margin-top: 20px;
    span {
      font-weight: 700;
    }
    .video {
      display: flex;
      justify-content: center;
      margin: 10px 0;
    }
  }
  .appIki {
    margin-top: 50px;
  }
  .contact {
    margin-top: 20px;
    p {
      margin-bottom: 8px;
    }
  }
  h2 {
    font-size: 28px;
  }
  h3 {
    font-size: 24px;
  }
`;

class Manual extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isState: false,
    };
  }
  render() {
    var { store_code } = this.props.match.params;
    return (
      <ManualStyles id="wrapper">
        <Sidebar store_code={store_code} />
        <div className="col-10 col-10-wrapper">
          <div id="content-wrapper" className="d-flex flex-column">
            <Topbar store_code={store_code} />
            <div className="container-fluid">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h4 className="h4 title_content mb-0 text-gray-800">
                  Hỗ trợ và hướng dẫn
                </h4>
              </div>
              <div className="manual">
                <div>
                  <p>
                    {" "}
                    Chào mừng bạn đến với iKiTech - Nền tảng quản lí và bán hàng
                    ĐA KÊNH tốt nhất!{" "}
                  </p>
                  <p>
                    Với lập trường <span>"Lấy khách hàng làm trung tâm"</span>,
                    đặt nhu cầu và kỳ vọng của khách hàng làm kim chỉ nam cho
                    mọi hành động, iKiTech cam kết tận tâm tạo ra sản phẩm và
                    dịch vụ chất lượng, giúp doanh nghiệp vừa, nhỏ và siêu nhỏ,
                    các chủ shop không cần đầu tư nhiều về chi phí, thời gian,
                    không cần lo lắng về quản trị kỹ thuật mà vẫn xây dựng được
                    những website và app bán hàng chuyên nghiệp, phục vụ một
                    cách hiệu quả việc bán hàng, phát triển kinh doanh, cũng như
                    phát triển thương hiệu trên internet.
                  </p>
                  <p>
                    Đến với phần mềm quản lý bán hàng iKiTech bạn sẽ xây dựng
                    được Website bán hàng mang thương hiệu riêng, hỗ trợ bán
                    hàng, quản lý hàng hóa, marketing, chăm sóc khách hàng, kiểm
                    soát nhân viên dễ dàng và hiệu quả. Ngoài ra, iKiTech còn
                    giúp bạn thống kê các số liệu quan trọng thông qua những báo
                    cáo dưới dạng biểu đồ giúp chủ doanh nghiệp, chủ shop đưa ra
                    những chiến lược kinh doanh phù hợp.
                  </p>
                  <p>
                    Cùng tham khảo các bài viết hướng dẫn Web của IkiTech để
                    hiểu hơn về gói dịch vụ này. Bên cạnh đó là biết cách sử
                    dụng các tính năng quản lý bán hàng tuyệt vời mà nó mang lại
                  </p>
                </div>
                <h2>1. Hướng dẫn sử dụng IKITECH WEB</h2>
                <h3>1.1 Tài liệu hướng dẫn sử dụng IKITECH WEB</h3>
                <p>
                  Link tham khảo:{" "}
                  <a
                    href="https://tailieuweb.myiki.vn/"
                    alt="link_suggest"
                    target={"_blank"}
                  >
                    https://tailieuweb.myiki.vn/
                  </a>
                </p>
                <h3>1.2 Video hướng dẫn sử dụng IKITECH WEB</h3>
                <p>
                  Video hướng dẫn:{" "}
                  <a
                    href="https://www.youtube.com/watch?v=TBf0rDEsIk8&list=PLDB1hwWRDPdDxSFv5tKBHBvQ1OpyE_4Io"
                    alt="link_suggest"
                    target={"_blank"}
                  >
                    https://www.youtube.com/watch?v=TBf0rDEsIk8&list=PLDB1hwWRDPdDxSFv5tKBHBvQ1OpyE_4Io
                  </a>
                </p>
                {/* <div className="video">
                  <iframe
                    width="560"
                    height="315"
                    src="https://www.youtube.com/embed/TBf0rDEsIk8"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  ></iframe>
                </div> */}
                <div className="appIki">
                  <h2>2. Hướng dẫn sử dụng APP IKITECH</h2>
                  <h3>2.1 Tài liệu hướng dẫn sử dụng APP IKITECH</h3>
                  <p>
                    Link tham khảo:{" "}
                    <a
                      href=" https://tailieuapp.myiki.vn/"
                      alt="link_suggest"
                      target={"_blank"}
                    >
                      https://tailieuapp.myiki.vn/
                    </a>
                  </p>
                  <h3>2.2 Video hướng dẫn sử dụng APP IKITECH</h3>
                  <p>
                    Video hướng dẫn:{" "}
                    <a
                      href="https://www.youtube.com/watch?v=CzibaqyfRiQ&list=PLDB1hwWRDPdCP5dsAZitpy1PDfT9ZxNTm"
                      alt="link_suggest"
                      target={"_blank"}
                    >
                      https://www.youtube.com/watch?v=CzibaqyfRiQ&list=PLDB1hwWRDPdCP5dsAZitpy1PDfT9ZxNTm
                    </a>
                  </p>
                  {/* <div className="video">
                    <iframe
                      width="560"
                      height="315"
                      src="https://www.youtube.com/embed/CzibaqyfRiQ"
                      title="YouTube video player"
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowfullscreen
                    ></iframe>
                  </div> */}
                  <div>
                    <p>
                      Những ưu điểm nổi trội của App IKITECH Đáp ứng như cầu bán
                      hàng của mọi ngành nghề. Bảo mật tuyệt đối, không lo rò rỉ
                      dữ liệu khách hàng. Có thể bán hàng ngay cả khi mất kết
                      nối internet. Tích hợp hệ thống mã vạch, giúp việc quản lý
                      hàng hóa dễ dàng hơn. Quản lý bán hàng mọi lúc mọi nơi.
                      Quản lý, tính lương nhân viên một cách dễ dàng hiệu quả
                      nhất. Tích hợp nhiều chính sách bán hàng Affiliate. Chi
                      phí cực rẻ phù hợp với mọi doanh nghiệp.
                    </p>
                  </div>
                </div>
                <div className="contact">
                  <h2>CÔNG TY CỔ PHẦN IKI TECH VIỆT NAM</h2>
                  <p>Nền tảng tạo App & Web bán hàng chuyên nghiệp</p>
                  <p>Tel: 0246.0278.753</p>
                  <p>Hotline: 09846.35577</p>
                  <p>Hỗ trợ kỹ thuật: 0976.686.500</p>
                  <p>Email: hello@ikitech.vn</p>
                  <p>
                    Website:{" "}
                    <a href="/ikitech.vn" alt="">
                      ikitech.vn
                    </a>
                  </p>
                </div>
              </div>
            </div>
            <Footer />
          </div>
        </div>
      </ManualStyles>
    );
  }
}

export default Manual;
