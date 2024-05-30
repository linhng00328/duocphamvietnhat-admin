import React, { Component } from "react";
import Barcode from "react-barcode";
import { shallowEqual } from "../../../ultis/shallowEqual";
import './Barcode7272.css'
import { format } from '../../../ultis/helpers'

class BarcodePagePrint extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: props.products,
            product_map_list: props.product_map_list,
        }
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {

        if (!shallowEqual(nextProps.products, this.props.products)) {


            this.setState({
                products: nextProps.products,
                product_map_list: this.getDatasProducts(nextProps.product_map_list)
            })
        }

    }

    getPageMargins = () => {
        return `@page { margin: ${0} ${0} ${0} ${0} !important;padding: ${0} ${0} ${0} ${0} !important; }`;
    };


    getPrintStyle = () => {
        return `@print @media print { html, body {  overflow: initial !important; }} `;
    };




   

    buildPage() {

        var product_map_list = this.state.product_map_list
        const lengthProduct = product_map_list?.length ?? 0;

        const { heightOnePage, row, column , widthTable} = this.props
        const maxLengthPage = Math.ceil(lengthProduct / (column * row))

   
        return [
            <div style={{
                height: heightOnePage * (maxLengthPage)
            }}>



                {

                    Array.from(Array(maxLengthPage).keys()).map((pageIndex) => {
                        return <div style={{
                            height: heightOnePage
                        }}>


                            <table style={{
                                tableLayout: "fixed",
                                width: widthTable != null ? widthTable : "100%",
                                
                                // height: "100%",

                            }}>
                                {this.buildItemsTable(pageIndex)}
                            </table>


                        </div>

                    })

                }



            </div>
        ]
    }

    buildItemsTable = (pageIndex) => {

    

        const { widthPrint, heightPrint, column, row, itemTemHight, widthBarcode } = this.props

        var arrColumn = new Array(column ?? 1).fill(0);
        var arrRow = new Array(row ?? 1).fill(0);

        var arrPro = this.state.product_map_list;


        if (arrPro == null || arrPro.length == 0) {
            return <></>
        }

        return arrRow.map((row2, indexRow) => {
            return <tr>
                {
                    arrColumn.map((col2, indexCol) => {


                        var index =pageIndex*(column*row)  + (column * indexRow + indexCol);
                    
                        if(pageIndex>0) {
                            index=index-1;
                        }


                        var product = arrPro[index]
                        return <td>
                            <div style={{
                                display: "flex",
                                flexFlow: "column",
                                alignItems: "center",
                                height: itemTemHight,
                                fontWeight: 300,
                                fontFamily: 'Nunito, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'
                            }}>  <div style={{
                                fontSize: 8
                            }}>{product?.name}</div>
                                <Barcode
                                    fontSize={0}
                                    width={widthBarcode ?? 0.9}
                                    textMargin={0}
                                    format={"CODE128"}
                                    height={25}
                                    margin={0}
                                    marginLeft={10}
                                    marginRight={10}
                                    textPosition={"center"}
                                    displayValue={false}
                                    value={product?.barcode} />
                                <div style={{
                                    fontSize: 8
                                }}>{product?.barcode}
                                </div>
                                <div style={{
                                    fontSize: 8
                                }}>{product?.price == null ? <></> : format(Number(product?.price))}
                                </div>
                            </div>
                        </td>

                    })
                }

            </tr>

        })

    }



    render() {
        const { widthPrint, heightPrint, paddingTop } = this.props

        return <div style={{

        }}>

            <style type="text/css" media="print">{`

       @page { size: ${widthPrint}mm ${heightPrint}mm; }
       @media print { html, body {  overflow: initial !important; padding-top:${paddingTop===0 ? "0px" : "15px"} }}
       
       `}</style>

            <style>{this.getPageMargins()}</style>

            {/* <div style={{
                display: "flex",
                flexWrap: "wrap",
            }}>
                {this.buidItems()}

            </div>  */}

            {this.buildPage()}

            {/* <table style={{
                tableLayout: "fixed",
                width: "100%",
                height: "100%",

            }}>
                {this.buildItemsTable()}
            </table> */}

        </div>
    }
}

export default BarcodePagePrint;
