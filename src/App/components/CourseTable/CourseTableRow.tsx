import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import React, { useState } from "react";
import { If, Then } from "react-if";
import styled from "styled-components";

import { CourseInfo } from "../../proto/courses";

import { StyledIconButton } from ".";

export type CourseTableRowProps = {
    row: CourseInfo,
    shortListed: boolean,
    setShortList: (code: string, shortListed: boolean) => void
}

const CodeCell = styled(TableCell)`
  width: 138px
`

const CourseTableRow = ({row, shortListed, setShortList}: CourseTableRowProps) => {
    const [hovered, setHovered] = useState(false);

    const toggleHover = () => setHovered(!hovered);
    return (
        <TableRow
            hover
            tabIndex={-1}
            onMouseOver={() => {
                if (!hovered) {
                    setHovered(true)
                }
            }}
            onMouseEnter={toggleHover}
            onMouseLeave={toggleHover}
        >
            <CodeCell align="left">{row.code}</CodeCell>
            <TableCell align="left">{row.name}</TableCell>
            <TableCell align="right">{Math.round(row.liked * 100)}%</TableCell>
            <TableCell align="right">{Math.round(row.useful * 100)}%</TableCell>
            <TableCell align="right">{Math.round(row.easy * 100)}%</TableCell>
            <TableCell align="right">
                <If condition={hovered || shortListed}>
                    <Then>
                        <StyledIconButton
                            filled={shortListed ? 1 : 0}
                            theme={shortListed ? 'primary' : ''}
                            icon={'shopping_cart'}
                            onClick={() => setShortList(row.code, !shortListed)}/>
                    </Then>
                </If>
            </TableCell>
        </TableRow>
    )
}

export default CourseTableRow
