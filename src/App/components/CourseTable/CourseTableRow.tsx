import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { CourseInfo } from "@watcourses/proto/courses";
import { action, makeObservable, observable } from "mobx";
import { observer } from "mobx-react";
import React  from "react";
import { If, Then } from "react-if";
import styled from "styled-components";

import { StyledIconButton } from ".";

interface ICourseTableRowProps {
  row: CourseInfo,
  shortListed: boolean,
  setShortList: (code: string, shortListed: boolean) => void
}

@observer
export class CourseTableRow extends React.Component<ICourseTableRowProps> {

  @observable
  private hovered: boolean = false;

  @action
  private toggleHover = () => {
    this.hovered = !this.hovered;
  };

  constructor(props: ICourseTableRowProps) {
    super(props);
    makeObservable(this);
  }

  render() {
    const {
      hovered,
      toggleHover
    } = this;
    const {
      row,
      shortListed,
      setShortList,
    } = this.props;
    return (
      <TableRow
        hover
        tabIndex={-1}
        onMouseOver={() => {
          if (!hovered) {
            toggleHover();
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
    );
  }
}

const CodeCell = styled(TableCell)`
  width: 138px
`;
