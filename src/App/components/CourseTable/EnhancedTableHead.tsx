import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Tooltip from "@material-ui/core/Tooltip";
import React from "react";
import styled from "styled-components";

import { ICourseDisplayData, Order } from "./CourseTableUtils";
import { StyledIconButton } from "./index";

interface IEnhancedTableProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof ICourseDisplayData,
  ) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

interface IHeadCell {
  id: keyof ICourseDisplayData;
  label: string;
  numeric: boolean;
}

const headCells: IHeadCell[] = [
  {id: "code", numeric: false, label: "Code"},
  {id: "name", numeric: false, label: "Name"},
  {id: "like", numeric: true, label: "Like"},
  {id: "useful", numeric: true, label: "Useful"},
  {id: "easy", numeric: true, label: "Easy"},
];

export const EnhancedTableHead = ({
  order,
  orderBy,
  onRequestSort,
}: IEnhancedTableProps) => {
  const createSortHandler = (property: keyof ICourseDisplayData) => (
    event: React.MouseEvent<unknown>,
  ) => onRequestSort(event, property);

  return (
    <TableHead>
      <TableRow>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <VisuallyHidden>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </VisuallyHidden>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell align="right">
          <Tooltip title="Filter Courses">
            <StyledIconButton icon={'filter_list'}/>
          </Tooltip>
        </TableCell>
      </TableRow>
    </TableHead>
  );
};

const VisuallyHidden = styled.span`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  top: 20px;
  width: 1px;
`;
