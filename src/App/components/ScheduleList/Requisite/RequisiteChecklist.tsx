import { ChipSet } from "@rmwc/chip";
import '@rmwc/chip/styles';
import React from "react";
import styled from "styled-components";

import { CourseDetailState } from "../CourseDetailState";

import { IRequisite } from "./index";
import { RequisiteChip } from "./RequisiteChip";

interface IRequisiteChecklistProps {
  requisites: IRequisite[];
  courseDetailState: CourseDetailState;
}

export const RequisiteChecklist = ({
  requisites,
  courseDetailState,
}: IRequisiteChecklistProps) => {
  return (
    <RootContainer>
      <StyledChipSet>
        {requisites.map((requisite, index) =>
          <RequisiteChip
            courseDetailState={courseDetailState}
            requisite={requisite}
            key={index}
            id={index}
          />,
        )}
      </StyledChipSet>
    </RootContainer>
  );
};

const RootContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledChipSet = styled(ChipSet)`
  margin-left: -8px;
`;
