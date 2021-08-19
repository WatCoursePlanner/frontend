import { MenuItem } from "@material-ui/core";
import { ListDivider } from "@rmwc/list";
import { Menu, MenuProps, MenuSurfaceAnchor } from "@rmwc/menu";
import "@rmwc/menu/styles";
import { cleanScrollBarWithWhiteBorder } from "@watcourses/constants/styles";
import { Schedule_TermSchedule, termToJSON } from "@watcourses/proto/courses";
import { StudentProfileStore } from "@watcourses/stores/StudentProfileStore";
import { capitalize } from "@watcourses/utils/helpers";
import { observer } from "mobx-react";
import React from "react";
import styled from "styled-components";

interface IAddOrMoveCourseToTermMenuProps {
  title: string,
  open: boolean,
  onClose: () => unknown,
  onSelect: (term: Schedule_TermSchedule) => unknown
}

@observer
export class AddOrMoveCourseToTermMenu extends React.Component<IAddOrMoveCourseToTermMenuProps> {
  render() {
    const {
      title,
      open,
      onClose,
      onSelect,
      children,
    } = this.props;

    const studentProfile = StudentProfileStore.get().workingStudentProfile;

    const terms = studentProfile.schedule?.terms;

    if (!terms) {
      return null;
    }

    const shownYears: number[] = [];

    return (
      <MenuSurfaceAnchor>
        <StyledMenu
          open={open}
          onClose={onClose}
        >
          <MenuTitle>{title}</MenuTitle>
          {terms.map((term, index) => {
            const showYear = !shownYears.includes(term.year);
            if (showYear) {
              shownYears.push(term.year);
            }
            return (
              <MenuTerm
                key={index}
                showYear={showYear}
                term={term}
                onSelect={() => {
                  onSelect(term);
                  onClose();
                }}
              />
            );
          })}
        </StyledMenu>
        {children}
      </MenuSurfaceAnchor>
    );
  }
}

interface IMenuTermProps {
  term: Schedule_TermSchedule,
  showYear: boolean,
  onSelect: () => void,
}

const MenuTerm = ({term, showYear, onSelect}: IMenuTermProps) => {
  return (<>
    {showYear && (<>
      <ListDivider/>
      <Year>{term.year}</Year>
    </>)}
    <MenuItem onClick={onSelect}>
      {capitalize(termToJSON(term.term))} ({term.termName})
    </MenuItem>
  </>);
};

const StyledMenu = styled(Menu)<MenuProps>`
  ${cleanScrollBarWithWhiteBorder};
`;

const Year = styled.span`
  font-size: 10px;
  opacity: .6;
  font-weight: 500;
  min-height: 18px;
  margin: 16px 0 0 16px;
`;

const MenuTitle = styled.h4`
  margin: 8px 16px;
`;
