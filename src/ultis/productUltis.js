export const HAS_SUB = "HAS_SUB";
export const HAS_ELE = "HAS_ELE";
export const NO_ELE_SUB = "NO_ELE_SUB";

export const findImportPrice = (distributes, id) => {
  if (distributes.length > 0) {
    if (distributes[0].element_distributes.length > 0) {
      if (
        distributes[0].element_distributes[0].sub_element_distributes.length > 0
      ) {
        var itemParents = distributes[0];
        var indexElements = itemParents.element_distributes
          .map((e) => e.id)
          .indexOf(id);
        if (indexElements !== -1) {
          var elments = itemParents.element_distributes[indexElements];
          if (elments) return elments;
        }
      } else {
        var itemParent = distributes[0];
        var indexElements = itemParent.element_distributes
          .map((e) => e.id)
          .indexOf(id);
        if (indexElements !== -1) {
          var elments = itemParent.element_distributes[indexElements];
          if (elments) {
            return elments;
          }
        }
      }
    }
  }
};

export const findPrice = (
  product,
  elementDistributeName,
  subElementDistributeName
) => {
  var type = getTypeProductDistribute(product);
  if (type == NO_ELE_SUB) {
    return product.price;
  }
  if (type == HAS_ELE) {
    var distributes = product.distributes;
    var element_distributes = distributes[0].element_distributes;

    const ele = element_distributes.find(
      (e) => e.name == elementDistributeName
    );
    if (ele != null) {
      return ele.price;
    }
  }

  if (type == HAS_SUB) {
    var distributes = product.distributes;

    if (distributes[0].element_distributes.length > 0) {
      var element_distributes = distributes[0].element_distributes;

      const ele = element_distributes.find(
        (e) => e.name == elementDistributeName
      );
      if (ele != null) {
        const sub_element_distributes = ele.sub_element_distributes;

        const sub = sub_element_distributes.find(
          (s) => s.name == subElementDistributeName
        );
        if (sub != null) {
          return sub.price;
        }
      }
    }
  }
  return null;
};

export const findImportPriceSub = (sub_element_distributes, nameElement) => {
  if (sub_element_distributes) {
    var indexDistributes = sub_element_distributes
      .map((e) => e.name)
      .indexOf(nameElement);
    var sub_elements = sub_element_distributes[indexDistributes];
    return sub_elements;
  }
};
export const maxQuantityProduct = (
  product,
  distributeName,
  subDistributeName
) => {
  if (distributeName === null && subDistributeName === null) {
    return product.stock;
  }
  var distributes = product.distributes;
  if (distributes) {
    if (
      distributes[0].element_distributes.length > 0 &&
      distributes[0].element_distributes[0].sub_element_distributes.length > 0
    ) {
      var indexElement = distributes[0].element_distributes
        .map((e) => e.name)
        .indexOf(distributeName);
      var indexSub = distributes[0].element_distributes[
        indexElement
      ].sub_element_distributes
        .map((e) => e.name)
        .indexOf(subDistributeName);

      return distributes[0].element_distributes[indexElement]
        .sub_element_distributes[indexSub].stock;
    }
    if (distributes[0].element_distributes.length > 0) {
      var indexElements = distributes[0].element_distributes
        .map((e) => e.name)
        .indexOf(distributeName);

      return distributes[0].element_distributes[indexElements].stock;
    }
  }

  return product.stock;
};

export const stockOfProduct = (
  product,
  elementDistributeName,
  subElementDistributeName
) => {
  var type = getTypeProductDistribute(product);
  if (type == NO_ELE_SUB) {
    return product.inventory.main_stock;
  }
  if (type == HAS_ELE) {
    const element_distributes =
      product.inventory.distributes[0].element_distributes;
    const ele = element_distributes.find(
      (e) => e.name == elementDistributeName
    );

    if (ele != null) {
      return ele.stock;
    }
  }

  if (type == HAS_SUB) {
    const element_distributes =
      product.inventory.distributes[0].element_distributes;
    const ele = element_distributes.find(
      (e) => e.name == elementDistributeName
    );
    if (ele != null) {
      const sub_element_distributes = ele.sub_element_distributes;

      const sub = sub_element_distributes.find(
        (s) => s.name == subElementDistributeName
      );
      if (sub != null) {
        return sub.stock;
      }
    }
  }

  return null;
};

export const maxQuantityInPos = (
  product,
  distributeName,
  subDistributeName
) => {
  if (getTypeProductDistribute(product) == NO_ELE_SUB) {
    return product.stock;
  }
  var distributes = product.inventory.distributes;
  if (getTypeProductDistribute(product) == HAS_SUB) {
    if (
      distributes[0].element_distributes.length > 0 &&
      distributes[0].element_distributes[0].sub_element_distributes.length > 0
    ) {
      var indexElement = distributes[0].element_distributes
        .map((e) => e.name)
        .indexOf(distributeName);
      var indexSub = distributes[0].element_distributes[
        indexElement
      ].sub_element_distributes
        .map((e) => e.name)
        .indexOf(subDistributeName);
      return distributes[0].element_distributes[indexElement]
        .sub_element_distributes[indexSub].stock;
    }
  }

  if (getTypeProductDistribute(product) == HAS_SUB) {
    if (distributes[0].element_distributes.length > 0) {
      var indexElements = distributes[0].element_distributes
        .map((e) => e.name)
        .indexOf(distributeName);
      return distributes[0].element_distributes[indexElements].stock;
    }

    return product.stock;
  }
};

export const getTypeProductDistribute = (product) => {
  if (product.distributes != null && product.distributes.length > 0) {
    const distributes = product.distributes[0];

    if (
      distributes != null &&
      distributes.element_distributes != null &&
      distributes.element_distributes.length > 0
    ) {
      const element_distributes = distributes.element_distributes;
      if (
        element_distributes[0].sub_element_distributes != null &&
        element_distributes[0].sub_element_distributes.length > 0
      ) {
        return HAS_SUB;
      }
      return HAS_ELE;
    }
  }
  return NO_ELE_SUB;
};

export const findMaxImportPrice = (product) => {
  var max = product.import_price || 0;

  if (getTypeProductDistribute(product) == NO_ELE_SUB) {
    return max;
  }
  if (getTypeProductDistribute(product) == HAS_ELE) {
    if (product.distributes != null && product.distributes.length > 0) {
      const distributes = product.distributes[0];
      if (
        distributes != null &&
        distributes.element_distributes != null &&
        distributes.element_distributes.length > 0
      ) {
        const element_distributes = distributes.element_distributes;
        max = element_distributes[0].import_price;

        element_distributes.forEach((ele) => {
          if (ele.import_price > max) {
            max = ele.import_price;
          }
        });
      }
    }
    return max;
  }
  if (getTypeProductDistribute(product) == HAS_SUB) {
    if (product.distributes != null && product.distributes.length > 0) {
      const distributes = product.distributes[0];

      max =
        distributes.element_distributes[0].sub_element_distributes[0]
          .import_price;
      if (
        distributes != null &&
        distributes.element_distributes != null &&
        distributes.element_distributes.length > 0
      ) {
        const element_distributes = distributes.element_distributes;
        for (var ele of element_distributes) {
          if (
            ele.sub_element_distributes != null &&
            ele.sub_element_distributes.length > 0
          ) {
            const sub_element_distributes = ele.sub_element_distributes;
            sub_element_distributes.forEach((sub) => {
              if (sub.import_price > max) {
                max = sub.import_price;
              }
            });
          }
        }
      }
    }
    return max;
  }

  return max;
};

export const findMinImportPrice = (product) => {
  var min = 0;
  min = product.import_price;

  if (getTypeProductDistribute(product) == NO_ELE_SUB) {
    return min;
  }
  if (getTypeProductDistribute(product) == HAS_ELE) {
    if (product.distributes != null && product.distributes.length > 0) {
      const distributes = product.distributes[0];

      if (
        distributes != null &&
        distributes.element_distributes != null &&
        distributes.element_distributes.length > 0
      ) {
        const element_distributes = distributes.element_distributes;
        min = element_distributes[0].import_price;

        element_distributes.forEach((ele) => {
          if (ele.import_price < min) {
            min = ele.import_price;
          }
        });
      }
    }
    return min;
  }
  if (getTypeProductDistribute(product) == HAS_SUB) {
    if (product.distributes != null && product.distributes.length > 0) {
      const distributes = product.distributes[0];

      min =
        distributes.element_distributes[0].sub_element_distributes[0]
          .import_price;

      if (
        distributes != null &&
        distributes.element_distributes != null &&
        distributes.element_distributes.length > 0
      ) {
        const element_distributes = distributes.element_distributes;

        element_distributes.forEach((ele) => {
          if (
            ele.sub_element_distributes != null &&
            ele.sub_element_distributes.length > 0
          ) {
            const sub_element_distributes = ele.sub_element_distributes;

            sub_element_distributes.forEach((sub) => {
              if (sub.import_price < min) {
                min = sub.import_price;
              }
            });
          }
        });
      }
    }

    return min;
  }

  return min;
};

export const findTotalStock = (product) => {
  if (getTypeProductDistribute(product) == HAS_ELE) {
    var stock = 0;

    if (product.distributes != null && product.distributes.length > 0) {
      const distributes = product.distributes[0];

      if (
        distributes != null &&
        distributes.element_distributes != null &&
        distributes.element_distributes.length > 0
      ) {
        const element_distributes = distributes.element_distributes;
        console.log("element_distributes", element_distributes);
        element_distributes.forEach((ele) => {
          stock += ele.stock;
        });
      }
    }
    return stock;
  }
  if (getTypeProductDistribute(product) == HAS_SUB) {
    var stocks = 0;
    if (product.distributes != null && product.distributes.length > 0) {
      const distributes = product.distributes[0];

      if (
        distributes != null &&
        distributes.element_distributes != null &&
        distributes.element_distributes.length > 0
      ) {
        const element_distributes = distributes.element_distributes;

        element_distributes.forEach((ele) => {
          if (
            ele.sub_element_distributes != null &&
            ele.sub_element_distributes.length > 0
          ) {
            const sub_element_distributes = ele.sub_element_distributes;

            sub_element_distributes.forEach((sub) => {
              stocks += sub.stock;
            });
          }
        });
      }
    }

    return stocks;
  }

  return stock;
};

export const findTotalStockPos = (product) => {
  if (typeof product.inventoryProduct != "undefined") {
    if (product == null || product.inventoryProduct == null) {
      return 0;
    } else {
      product.inventory = product.inventoryProduct;
      product.distributes = product.distributeProduct;
    }
  } else {
    if (product == null || product.inventory == null) {
      return 0;
    }
  }

  if (getTypeProductDistribute(product) == NO_ELE_SUB) {
    return product.inventory.main_stock;
  }
  if (getTypeProductDistribute(product) == HAS_ELE) {
    var stock = 0;

    if (
      product?.inventory?.distributes != null &&
      product.inventory.distributes.length > 0
    ) {
      const distributes = product.inventory.distributes[0];

      if (
        distributes != null &&
        distributes.element_distributes != null &&
        distributes.element_distributes.length > 0
      ) {
        const element_distributes = distributes.element_distributes;

        element_distributes.forEach((ele) => {
          stock += ele.stock;
        });
      }
    }
    return stock;
  }
  if (getTypeProductDistribute(product) == HAS_SUB) {
    var stocks = 0;
    if (
      product?.inventory?.distributes != null &&
      product.inventory.distributes.length > 0
    ) {
      const distributes = product.inventory.distributes[0];

      if (
        distributes != null &&
        distributes.element_distributes != null &&
        distributes.element_distributes.length > 0
      ) {
        const element_distributes = distributes.element_distributes;

        element_distributes.forEach((ele) => {
          if (
            ele.sub_element_distributes != null &&
            ele.sub_element_distributes.length > 0
          ) {
            const sub_element_distributes = ele.sub_element_distributes;

            sub_element_distributes.forEach((sub) => {
              stocks += sub.stock;
            });
          }
        });
      }
    }

    return stocks;
  }

  return stock;
};
