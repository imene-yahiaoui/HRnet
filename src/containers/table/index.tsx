import React, { useState, useMemo } from "react";
import {
  useTable,
  useSortBy,
  usePagination,
  Column,
  Row,
  TableInstance,
  TableState,
} from "react-table";
import "./style.css";

// Interface pour les données de la table
interface TableRow {
  [key: string]: any;
}

// Interface pour les propriétés du composant Table
interface TableProps {
  columns: Column<TableRow>[];
  data: TableRow[];
}

// Interface étendue de TableInstance
interface ExtendedTableInstance<D extends object> extends TableInstance<D> {
  page: Row<D>[];
  canPreviousPage: boolean;
  canNextPage: boolean;
  nextPage: () => void;
  previousPage: () => void;
  setPageSize: (size: number) => void;
  gotoPage: (pageIndex: number) => void;
  state: TableState<D> & { pageIndex: number; pageSize: number };
}

// Composant Table
const Table: React.FC<TableProps> = ({ columns, data }) => {
  const [searchInput, setSearchInput] = useState("");

  /**
   * Fonction pour filtrer les données en fonction de la recherche
   */
  const filteredData = useMemo(() => {
    return data?.filter((row) => {
      return columns?.some((column) => {
        const value = row[column.accessor as string];
        return String(value).toLowerCase().includes(searchInput.toLowerCase());
      });
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
    gotoPage,
    state: { pageIndex, pageSize },
  } = useTable<TableRow>(
    {
      columns,
      data: filteredData,
      initialState: { pageIndex: 0 } as Partial<TableState<TableRow>>,
    },
    useSortBy,
    usePagination
  ) as ExtendedTableInstance<TableRow>;

  const totalPages = Math.ceil(filteredData.length / pageSize);

  return (
    <div className="table-container">
      <div className="headerTable">
        <section className="showSection">
          <label htmlFor="pageSizeSelect">Show</label>
          <select
            id="pageSizeSelect"
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
          <label htmlFor="Search">Search:</label>
          <input
            className="inputUser"
            type="text"
            id="Search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </section>
      </div>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => {
            const { key, ...restHeaderGroupProps } = headerGroup.getHeaderGroupProps();
            return (
              <tr key={key} {...restHeaderGroupProps}>
                {headerGroup.headers.map((column) => {
                  const { key, ...restColumnProps } = column.getHeaderProps((column as any).getSortByToggleProps());
                  return (
                    <th key={key} {...restColumnProps}>
                      {column.render("Header")}
                      <div className="arrow">
                        <button
                          disabled={
                            (column as any).isSorted &&
                            !(column as any).isSortedDesc
                          }
                        >
                          🔼
                        </button>
                        <button
                          disabled={
                            (column as any).isSorted && (column as any).isSortedDesc
                          }
                        >
                          🔽
                        </button>
                      </div>
                    </th>
                  );
                })}
              </tr>
            );
          })}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            const { key, ...restRowProps } = row.getRowProps();
            return (
              <tr key={key} {...restRowProps}>
                {row.cells.map((cell) => {
                  const { key, ...restCellProps } = cell.getCellProps();
                  return (
                    <td key={key} {...restCellProps} data-label={cell.column.Header}>
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="tableFooter">
        <section>
          <p>
            Showing {pageIndex + 1} to{" "}
            {Math.min((pageIndex + 1) * pageSize, data?.length)} of{" "}
            {data?.length} entries
          </p>
        </section>

        <section className="numberPAgeSection">
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            Previous
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => gotoPage(i)}
              style={{
                backgroundColor: pageIndex === i ? "#d3d2d272" : "transparent",
              }}
            >
              {i + 1}
            </button>
          ))}
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            Next
          </button>
        </section>
      </div>
    </div>
  );
};

export default Table;
