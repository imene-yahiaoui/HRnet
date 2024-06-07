import React, { useState, useMemo } from "react";
import { useTable, useSortBy, usePagination } from "react-table";
import "./style.css";

const Table = ({ columns, data }) => {
  const [searchInput, setSearchInput] = useState("");

  /**
   * @param  data ,searchInput
   * @return  columns
   * Fonction to filtre search
   */

  const filteredData = useMemo(() => {
    return data.filter((row) => {
      return columns.some((column) =>
        String(row[column.accessor])
          .toLowerCase()
          .includes(searchInput.toLowerCase())
      );
    });
  }, [data, columns, searchInput]);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data: filteredData,
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
                 
                  <div className="arrow">
                    <button
                   
                      disabled={column.isSorted && !column.isSortedDesc}
                    >
                      🔼
                    </button>
                    <button
                    
                      disabled={column.isSorted && column.isSortedDesc}
                    >
                      🔽
                    </button>
                  </div>
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
            <strong>{pageIndex + 1}</strong>
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
          <label htmlFor="Search">Search : </label>
          <input
            className="inputUser"
            type="text"
            id="Search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </section>
      </div>
    </div>
  );
};

export default Table;
