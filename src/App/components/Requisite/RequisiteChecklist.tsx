import React from "react";
import styled from "styled-components";
import {Chip, ChipHTMLProps, ChipProps, ChipSet} from "@rmwc/chip"

import '@rmwc/chip/styles';
import { Requisite } from ".";

type RequisiteChecklistProps = {
    requisites: Requisite[];
}

const RootContainer = styled.div`
  display: flex;
  flex-direction: row;
`

const StyledChipSet = styled(ChipSet)`
  margin-left: -8px;
`

const StyledChip = styled(Chip)<ChipProps & ChipHTMLProps & { met?: number }>`
  background-color: ${props => props.met ? '#edf7fe' : '#feeded'};
  i {
    color: ${props => props.met ? '#2196f3' : '#ff0000'};
  }
`

const RequisiteChecklist = ({requisites}: RequisiteChecklistProps) => {
    return (
        <RootContainer>
            <StyledChipSet>
                {
                    requisites.map((requisite, index) =>
                        <StyledChip
                            className={'unselectable'}
                            onInteraction={() => console.log(`[Chip] TODO selected ${requisite.code}`)}
                            icon={requisite.met ? "done" : "close"}
                            met={requisite.met ? 1 : 0}
                            label={requisite.code}
                            key={index}
                        />)
                }
            </StyledChipSet>
        </RootContainer>
    )
}

export default RequisiteChecklist
