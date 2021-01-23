import { List, ListItem, ListItemMeta, ListItemPrimaryText, ListItemSecondaryText, ListItemText } from "@rmwc/list";
import '@rmwc/list/styles';
import Popup from "@watcourses/components/Popup";
import { CheckResults_Issue } from "@watcourses/proto/courses";
import React from 'react';

export type DegreeRequirementPopupProps = {
    issues: CheckResults_Issue[] | null
}

const DegreeRequirementPopup = ({issues}: DegreeRequirementPopupProps) => {
    if (!issues || issues.length === 0) {
        return (
            <Popup
                title={'Degree Requirement Met'}
                message={'Your schedule has all requirements!'}/>)
    }
    return (
        <Popup
            title={'Degree Requirement Not Met'}
            message={'Your schedule does not meet the following requirements:'}>
            <List twoLine>
                {issues?.map((value, index) => (
                    <ListItem key={index} onClick={() => {
                    }}>
                        <ListItemText>
                            <ListItemPrimaryText>{value.subjectName}</ListItemPrimaryText>
                            <ListItemSecondaryText>{value.relatedCondRaw ?? value.relatedCond}</ListItemSecondaryText>
                        </ListItemText>
                        <ListItemMeta icon="keyboard_arrow_right"/>
                    </ListItem>
                ))}
            </List>
        </Popup>
    )
}

export default DegreeRequirementPopup
