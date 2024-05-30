import * as Types from "../constants/ActionType";

export const changeBranch = (branchData) => {
  return (dispatch) => {
 
      dispatch({
        type: Types.CHANGE_BRANCH,
        data : branchData
      })
  };
};