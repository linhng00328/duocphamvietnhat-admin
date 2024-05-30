import React, { Component } from "react";
import JsBarcode from "jsbarcode";

class BarcodeComponent extends Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    this.generateBarcode();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.number !== this.props.number) {
      this.generateBarcode();
    }
  }

  generateBarcode() {
    if (this.canvasRef.current) {
      JsBarcode(this.canvasRef.current, this.props.number, {
        format: "CODE128", // Loại mã vạch (CODE128 là một loại phổ biến)
        displayValue: this.props.displayValue, // Hiển thị giá trị bên cạnh mã vạch
        fontSize: 12,
        margin: 10,
        height: 40,
        ...this.props.style,
      });
    }
  }

  render() {
    return (
      <div>
        {/* Canvas để hiển thị mã vạch */}
        <canvas ref={this.canvasRef}></canvas>
      </div>
    );
  }
}

export default BarcodeComponent;
