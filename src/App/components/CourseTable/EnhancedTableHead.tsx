import React from "react";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import FilterListIcon from "@material-ui/icons/FilterList";
import styled from "styled-components";
import {CourseDisplayData, Order} from "./CourseTableUtils";

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
`

interface HeadCell {
    id: keyof CourseDisplayData;
    label: string;
    numeric: boolean;
}

const headCells: HeadCell[] = [
    {id: "code", numeric: false, label: "Code"},
    {id: "name", numeric: false, label: "Name"},
];

interface EnhancedTableProps {
    onRequestSort: (
        event: React.MouseEvent<unknown>,
        property: keyof CourseDisplayData
    ) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
    const {order, orderBy, onRequestSort} = props;
    const createSortHandler = (property: keyof CourseDisplayData) => (
        event: React.MouseEvent<unknown>
    ) => {
        onRequestSort(event, property);
    };

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
                    <Tooltip title="Filter list">
                        <IconButton aria-label="filter list">
                            <FilterListIcon/>
                        </IconButton>
                    </Tooltip>
                </TableCell>
            </TableRow>
        </TableHead>
    );
}

export default EnhancedTableHead
