/* eslint-disable no-undef */

import Table from "./index";
import { Provider } from "react-redux";
import { store } from "../../store.ts";
import "@testing-library/jest-dom/extend-expect";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Data from "../../assets/json/mockData.json";
const columns = [
  { Header: "Name", accessor: "name" },
  { Header: "Age", accessor: "age" },
  { Header: "Country", accessor: "country" },
];

const data = [
  { name: "John Doe", age: 28, country: "USA" },
  { name: "Jane Smith", age: 34, country: "UK" },
  { name: "Samuel Green", age: 45, country: "Canada" },
];
//for used in the tests
const renderTable = () => {
  return render(
    <BrowserRouter>
      <Provider store={store}>
        <Table columns={columns} data={data} />
      </Provider>
    </BrowserRouter>
  );
};

describe("Table Component with  3 columns ", () => {
  test("renders table with columns and data", () => {
    renderTable();

    // Check if table headers are rendered
    columns.forEach((column) => {
      expect(screen.getByText(column.Header)).toBeInTheDocument();
    });
    // Check if table data is rendered
    data.forEach((row) => {
      Object.values(row).forEach((value) => {
        expect(screen.getByText(String(value))).toBeInTheDocument();
      });
    });
  });

  test("search functionality filters data", () => {
    renderTable();

    // Perform a search
    const searchInput = screen.getByLabelText("Search:");
    fireEvent.change(searchInput, { target: { value: "John" } });

    // Check if filtered data is rendered
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.queryByText("Jane Smith")).not.toBeInTheDocument();
    expect(screen.queryByText("Samuel Green")).not.toBeInTheDocument();
  });

  test("Disabled works correctly", () => {
    renderTable();

    // Initially should show the first page
    expect(screen.getByText("Showing 1 to 3 of 3 entries")).toBeInTheDocument();

    // Check if next page button is present and click it
    const nextButton = screen.getByRole("button", { name: /next/i });
    expect(nextButton).toBeInTheDocument();
    expect(nextButton).toBeDisabled();
  });

  test("sort functionality works correctly", () => {
    renderTable();

    // Click on Age header to sort by age
    const ageHeader = screen.getByText("Age");
    fireEvent.click(ageHeader);

    // Check if data is sorted by age
    const rows = screen.getAllByRole("row");

    expect(rows[1]).toHaveTextContent("John Doe");
    expect(rows[2]).toHaveTextContent("Jane Smith");
    expect(rows[3]).toHaveTextContent("Samuel Green");

    // Click again to sort by age
    fireEvent.click(ageHeader);
    expect(rows[1]).toHaveTextContent("John Doe");
    expect(rows[2]).toHaveTextContent("Jane Smith");
    expect(rows[3]).toHaveTextContent("Samuel Green");
  });
});

/// have a tabel whith all columns and many datas

const Allcolumns = [
  {
    Header: "First Name",
    accessor: "firstName",
  },
  {
    Header: "Last Name",
    accessor: "lastName",
  },
  {
    Header: "Start Date",
    accessor: "startDate",
  },
  {
    Header: "Department",
    accessor: "department",
  },
  {
    Header: "Date of Birth",
    accessor: "dateOfBirth",
  },
  {
    Header: "Street",
    accessor: "street",
  },
  {
    Header: "City",
    accessor: "city",
  },
  {
    Header: "State",
    accessor: "state",
  },
  {
    Header: "Zip Code",
    accessor: "zipCode",
  },
];
const renderTablewithAllDatas = () => {
  return render(
    <BrowserRouter>
      <Provider store={store}>
        <Table columns={Allcolumns} data={Data} />
      </Provider>
    </BrowserRouter>
  );
};
describe("Table Component with All columns ", () => {
  // check next and Previous
  test("pagination works correctly", () => {
    renderTablewithAllDatas();

    // Initially should show the first page
    expect(
      screen.getByText("Showing 1 to 10 of 20 entries")
    ).toBeInTheDocument();
    expect(screen.getByText("123 Pine Street")).toBeInTheDocument();
    expect(screen.getByText("654 Maple Street")).toBeInTheDocument();
    // Check if next page button is present and click it
    const nextButton = screen.getByRole("button", { name: /next/i });
    expect(nextButton).toBeInTheDocument();
    fireEvent.click(nextButton);

    // Check if the second page is shown
    expect(screen.getByText("987 Oak Street")).toBeInTheDocument();
    expect(screen.getByText("Greenfield")).toBeInTheDocument();
    expect(screen.queryByText("	Bridgetown")).not.toBeInTheDocument();
    //retourn to Previous page

    const nextPrevious = screen.getByRole("button", { name: /Previous/i });
    expect(nextPrevious).toBeInTheDocument();
    fireEvent.click(nextPrevious);
    expect(screen.getByText("123 Pine Street")).toBeInTheDocument();
    expect(screen.getByText("654 Maple Street")).toBeInTheDocument();
  });
  ///chek select
  test("changes page size correctly", () => {
    renderTablewithAllDatas();
    expect(
      screen.getByText("Showing 1 to 10 of 20 entries")
    ).toBeInTheDocument();

    // Find the page size select input
    const pageSizeSelect = screen.getByLabelText("Show");

    // Change the page size to 25
    fireEvent.change(pageSizeSelect, { target: { value: "25" } });

    // Check if the number of entries shown is updated
    expect(
      screen.getByText("Showing 1 to 20 of 20 entries")
    ).toBeInTheDocument();
  });

  //check btn page
  test("pagination button 2  pages render correctly", () => {
    renderTablewithAllDatas();

    const SecendButtons = screen.getByRole("button", { name: /2/i });
    fireEvent.click(SecendButtons);

    // Check if the second page is shown
    expect(screen.getByText("987 Oak Street")).toBeInTheDocument();
    expect(screen.getByText("Greenfield")).toBeInTheDocument();
    expect(screen.queryByText("	Bridgetown")).not.toBeInTheDocument();
  });
});
