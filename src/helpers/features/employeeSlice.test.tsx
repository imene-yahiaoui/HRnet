import { configureStore } from "@reduxjs/toolkit";
import employeeReducer, { addEmployeeInfos } from "./employeeSlice";

describe("employee slice", () => {
  it("should add employee information correctly", () => {
    const store = configureStore({
      reducer: {
        employee: employeeReducer,
      },
    });

    // Dispatch action to add employee information
    const employeeData = {
      firstName: "John",
      lastName: "Doe",
      street: "123 Street",
      city: "City of Code",
      state: "Alabama",
      department: "Sales",
      zipCode: "5001",
      dateOfBirth: "01/01/1990",
      startDate: "01/01/2024",
    };
    store.dispatch(addEmployeeInfos(employeeData));

    // Verify state after dispatching the action
    const state = store.getState().employee;
    expect(state.employees).toHaveLength(1);

    // Optionally, you can check the exact employee object stored
    const addedEmployee = state.employees[0];
    expect(addedEmployee).toEqual(employeeData);
  });
});
