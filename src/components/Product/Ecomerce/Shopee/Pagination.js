import React, { Component } from "react";
import { shallowEqual } from "../../../../ultis/shallowEqual";
class Pagination extends Component {
    constructor(props) {
        super(props);
        this.state = {
            per_page: 0
        }
    }

    passPagination = (page) => {

        this.props.fetchAllProductEcommercePage(page)
    }


    componentWillReceiveProps(nextProps, nextState) {
        if (!shallowEqual(nextProps.products, this.props.products) && nextProps.products.page == 1 || nextState.per_page == 0) {
            this.setState({ per_page: nextProps.products.per_page })
        }
    }

    showData = (links) => {
        var result = [];
        var { page, total_count } = links
        var {per_page} = this.state
        if (typeof total_count == "undefined") {
            return result
        }
        if(isNaN(total_count) || isNaN(per_page) || Number(per_page) == 0)
        {
            return result
        }

        var numPages = Math.ceil(total_count / per_page)
        if(numPages === Infinity)
        {
            return result
        }
        if (numPages > 0) {
            var active = ""
            for (let index = 1; index < numPages + 1; index++) {
                if (index == page)
                    active = "active"
                else
                    active = ""
                result.push(
                    <li class={`page-item ${active} `}><a onClick={() => this.passPagination(index)} class="page-link">{index}</a></li>
                )

            }
        }
        return result

    };

    render() {
        var links = this.props.products
        return (


            <nav aria-label="Page navigation" className={`float-pagination ${this.props.style}`}>
                <ul class="pagination  tab-pagination pg-blue">
                    <li class={`page-item `}><a class="page-link">Trước</a></li>

                    {this.showData(links)}
                    <li class={`page-item `}><a class="page-link">Sau</a></li>

                </ul>
            </nav>


        );
    }
}


export default Pagination;