import React from "react";
import { useTable, useSortBy, usePagination } from "react-table";
import "./style.css";

import LabeledInput from "../../components/labeledInput";

const Table = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    // rows,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    useSortBy,
    usePagination
  );

  return (
    <div className="table-container">
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  {/* Ajouter un indicateur de tri */}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* Pagination */}

      <div className="tableFooter">
        <section>
        <p>
          {" "}
          Showing {pageIndex + 1} to {columns.length + 1} of {data.length}{" "}
          entries{" "}
        </p>
        </section>
    
        <section>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          Previous
        </button>
        <span>
         
         <strong>
           {pageIndex + 1}
         </strong>
       </span>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          Next
        </button>

       
         </section>
          </div>
        <div className="headerTable">
          <section className="showSection">
            <label htmlFor="Show">Show</label>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
              }}
            >
              {[10, 25, 50, 100].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </select>
            <p> entries </p>
          </section>

          <section className="searchSection">
            <LabeledInput
              nameLable="Search:"
              nameId="search"
              type="search"
              name="Search :"
            />
          </section>
      
      </div>
    </div>
  );
};

export default Table;
