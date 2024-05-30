import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { connect, shallowEqual } from 'react-redux';

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      hasMore: true,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { listIdsProductsSelected } = this.props;
    if (!shallowEqual(nextProps.listProductsByVoucherId, this.props.listProductsByVoucherId)) {
      let newData = [];
      nextProps.listProductsByVoucherId?.data?.forEach((item) => {
        const isExist = this.checkExsit(listIdsProductsSelected, item.id);
        if (isExist) {
          newData.push(item);
        }
      });
      this.props.setListProductsSelected([...this.props.listProductsSelected, ...newData]);
    }
    return true;
  }

  checkExsit = (listIdsPrd, id) => {
    if (listIdsPrd.length > 0) {
      for (const element of listIdsPrd) {
        if (element == id) {
          return true;
        }
      }
    }
    return false;
  };

  removeItem = (id) => {
    const { listProductsSelected } = this.props;
    const newListProduct = JSON.parse(JSON.stringify(listProductsSelected)) || [];
    const newListIdsProduct = newListProduct.map((item) => item.id);
    const listProductsHasBeenRemove = newListProduct.filter((prd) => prd.id !== id);
    const listIdsPoductsHasBeenRemove = newListIdsProduct.filter((prd) => prd !== id);
    this.props.setListProductsSelected(listProductsHasBeenRemove);
    this.props.setListIdsProductsSelected(listIdsPoductsHasBeenRemove);
  };

  showData = (products) => {
    var result = null;
    if (typeof products === 'undefined') {
      return result;
    }
    if (products.length > 0) {
      result = products.map((data, index) => {
        return (
          <tr>
            <td>{index + 1}</td>
            <td>{data.sku}</td>
            <td>{data.name}</td>
            <td>
              <button
                type="button"
                class="btn btn-danger btn-sm"
                onClick={() => {
                  this.removeItem(data.id);
                  document.querySelector('#inputCheckAll').checked = false;
                }}
              >
                <i class="fa fa-trash"></i>
              </button>
            </td>
          </tr>
        );
      });
    } else {
      return result;
    }
    return result;
  };

  handleFetchData = () => {
    const {
      fetchListProductsById,
      store_code,
      voucherId,
      page,
      setPage,
      listProductsSelected,
      listIdsProductsSelected

    } = this.props;
    const { hasMore } = this.state;
    if (listProductsSelected.length >= listIdsProductsSelected?.length) {
      this.setState({ hasMore: false });
      return;
    }
    if (hasMore) {
      fetchListProductsById(store_code, voucherId, page + 1, 20, () => {
        setPage(page + 1);
      });
    }
  };

  render() {
    var { setDefaultListProducts, listProductsSelected, listIdsProductsSelected } = this.props;
    const { hasMore } = this.state;
    return (
      <React.Fragment>
        <div class="form-group">
          <label for="product_name">Sản phẩm được áp dụng</label>

          <button
            type="button"
            class="btn btn-primary-no-background btn-sm"
            style={{ marginLeft: '10px' }}
            data-toggle="modal"
            data-target="#showListProduct"
            onClick={() => setDefaultListProducts()}
          >
            <i class="fas fa-plus"></i>
            <span class="text">&nbsp;Chọn sản phẩm</span>
          </button>
        </div>
        <div class="form-group">
          <label for="product_name">Danh sách sản phẩm: </label>
          <p style={{ fontWeight: 500 }}>
            Hiển thị: <span style={{color: 'red', fontSize: '18px'}}>{listProductsSelected?.length}</span> trên tổng số:{' '}
            <span style={{fontSize: '18px'}}>{listIdsProductsSelected?.length}</span>{' '}
          </p>

          <div class="col-xs-9 col-sm-9 col-md-9 col-lg-10">
            <div class="table-responsive">
              <InfiniteScroll
                dataLength={listProductsSelected?.length}
                next={this.handleFetchData}
                hasMore={hasMore}
                height={450}
              >
                <table class="table table-border table-hover">
                  <thead>
                    <tr>
                      <th>STT</th>
                      <th>Mã SKU</th>
                      <th>Tên sản phẩm</th>
                      <th>Hành động</th>
                    </tr>
                  </thead>
                  <tbody>{this.showData(listProductsSelected)}</tbody>
                </table>
              </InfiniteScroll>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {};
};
export default connect(null, mapDispatchToProps)(Table);
