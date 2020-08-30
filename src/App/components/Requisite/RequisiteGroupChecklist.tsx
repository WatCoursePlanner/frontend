import React from "react";
import {RequisiteChecklist, RequisiteGroup} from "./index";
import styled from "styled-components";
import {ListItemGraphic, ListItemGraphicProps} from "@rmwc/list";

type RequisiteGroupChecklistProps = {
    requisiteGroups: RequisiteGroup[];
}

const RootContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: -16px;
`

const RequisiteGroupContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: start;
  margin-top: 8px;
`

const RequisiteChecklistWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
`

const RequisiteCount = styled.span`
  font-size: 12px;
  opacity: .8;
`

const StyledListItemGraphic = styled(ListItemGraphic)<ListItemGraphicProps & React.HTMLProps<HTMLDivElement> & {met: number}>`
    color: ${props => props.met ? '#2196f3' : '#ff0000'};
    margin-right: 16px;
    margin-top: 8px;
`

const RequisiteGroupChecklist = ({requisiteGroups}: RequisiteGroupChecklistProps) => {
    return (
        <RootContainer>
            {
                requisiteGroups.map((requisiteGroup, index) =>
                    <RequisiteGroupContainer key={index}>
                        <StyledListItemGraphic
                            met={requisiteGroup.met ? 1 : 0}
                            className={'unselectable material-icons-filled'}
                            icon={requisiteGroup.met ? "check_circle" : "cancel"}/>
                        <RequisiteChecklistWrapper>
                            <RequisiteCount>
                                {`${requisiteGroup.requires} of`}
                            </RequisiteCount>
                            <RequisiteChecklist requisites={requisiteGroup.requisites}/>
                        </RequisiteChecklistWrapper>
                    </RequisiteGroupContainer>
                )
            }
        </RootContainer>
    )
}

export default RequisiteGroupChecklist
