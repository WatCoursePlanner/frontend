import React from 'react';
import Popup from "../Popup";
import {List, ListItem, ListItemMeta, ListItemPrimaryText, ListItemSecondaryText, ListItemText} from "@rmwc/list";
import '@rmwc/list/styles';

const DegreeRequirementPopup = () => {
  return (
    <Popup
      title={'Degree Requirement Not Met'}
      message={'Your schedule does not meet the following requirements:'}>
      <List twoLine>
        {Array(10).join(0).split(0).map((value, index) => (
          <ListItem key={index} onClick={() => {
          }}>
            <ListItemText>
              <ListItemPrimaryText>Choose 1 of</ListItemPrimaryText>
              <ListItemSecondaryText>CS 123, CS 234</ListItemSecondaryText>
            </ListItemText>
            <ListItemMeta icon="keyboard_arrow_right"/>
          </ListItem>
        ))}
      </List>
    </Popup>
  )
}

export default DegreeRequirementPopup
