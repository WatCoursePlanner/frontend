import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import React from "react";
import ContentLoader from "react-content-loader";
import styled from "styled-components";

export const CourseTableRowPlaceholder = () => (
  <TableRow tabIndex={-1}>
    <CodeCell align="left">
      <ContentLoader width="100" height="20" preserveAspectRatio="none">
        <rect x="0" y="0" width="138" height="20"/>
      </ContentLoader>
    </CodeCell>
    <TableCell align="left">
      <ContentLoader width="300" height="20" preserveAspectRatio="none">
        <rect x="0" y="0" width="100%" height="20"/>
      </ContentLoader>
    </TableCell>
    <TableCell align="right"/>
  </TableRow>
);

const CodeCell = styled(TableCell)`
  width: 138px
`;
