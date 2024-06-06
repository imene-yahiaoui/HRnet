import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface EmployeeInfo {
  [key: string]: string;
}

interface EmployeeState {
  employees: EmployeeInfo[];
}

const initialState: EmployeeState = {
  employees: [],
};

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    addEmployeeInfos: (state, action: PayloadAction<EmployeeInfo>) => {
      state.employees.push(action.payload);
    },
  },
});

export const { addEmployeeInfos } = employeeSlice.actions;
export default employeeSlice.reducer;
export const selectEmployees = (state: { user: EmployeeInfo }) =>
  state.user.employees;
