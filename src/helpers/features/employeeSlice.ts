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
    /**
     * Add employee information to the state.
     *
     * @param {EmployeeState} state - The current state of the employee slice.
     * @param {PayloadAction<EmployeeInfo>} action - The action containing the employee information to add.
     */
    addEmployeeInfos: (state, action: PayloadAction<EmployeeInfo>) => {
      state.employees?.push(action.payload);
    },
  },
});

export const { addEmployeeInfos } = employeeSlice.actions;
export default employeeSlice.reducer;

export const selectEmployees = (state: { employee: EmployeeState }) =>
  state.employee.employees;
