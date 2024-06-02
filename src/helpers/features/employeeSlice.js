import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  employees: [],
};

const employeeInfos = createSlice({
  name: "employee",
  initialState,
  reducers: {
    addEmployeeInfos: (state, action) => {
      state.employees.push(action.payload);
    },
  },
});

const { reducer, actions } = employeeInfos;

export const { addEmployeeInfos } = actions;
export default reducer;
