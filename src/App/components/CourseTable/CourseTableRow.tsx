import TableCell from "@material-ui/core/TableCell";
import IconButton from "@material-ui/core/IconButton";
import FavoriteOutlinedIcon from "@material-ui/icons/FavoriteOutlined";
import TableRow from "@material-ui/core/TableRow";
import React from "react";
import {CourseInfo} from "../../proto/courses";
import styled from "styled-components";

export type CourseTableRowProps = {
    row: CourseInfo
}

const CodeCell = styled(TableCell)`
    width: 138px
`

const CourseTableRow = ({row}: CourseTableRowProps) => (
    <TableRow hover tabIndex={-1}>
        <CodeCell align="left">{row.code}</CodeCell>
        <TableCell align="left">{row.name}</TableCell>
        <TableCell align="right">
            <IconButton>
                <FavoriteOutlinedIcon/>
            </IconButton>
        </TableCell>
    </TableRow>
)

export default CourseTableRow
