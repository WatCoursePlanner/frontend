import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import React, {useState} from "react";
import {CourseInfo} from "../../proto/courses";
import styled from "styled-components";
import { StyledIconButton } from ".";

export type CourseTableRowProps = {
    row: CourseInfo
}

const CodeCell = styled(TableCell)`
    width: 138px
`

const CourseTableRow = ({row}: CourseTableRowProps) => {
    const [hovered, setHovered] = useState(false);
    const [shortListed, setShortListed] = useState(false);
    const toggleHover = () => setHovered(!hovered);
    return (
        <TableRow
            hover
            tabIndex={-1}
            onMouseEnter={toggleHover}
            onMouseLeave={toggleHover}>
            <CodeCell align="left">{row.code}</CodeCell>
            <TableCell align="left">{row.name}</TableCell>
            <TableCell align="right">
                {
                    hovered ?
                        <StyledIconButton
                            className={shortListed ? "" : "material-icons-outlined"}
                            theme={shortListed ? 'primary' : ''}
                            icon={'shopping_cart'}
                            onClick={() => setShortListed(!shortListed)}
                        />
                        : null
                }
            </TableCell>
        </TableRow>
    )
}

export default CourseTableRow
