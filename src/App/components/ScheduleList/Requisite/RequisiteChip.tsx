import { Chip, ChipHTMLProps, ChipProps } from "@rmwc/chip";
import '@rmwc/chip/styles';
import { Popper } from "@watcourses/components/Popper/Popper";
import { CachedCoursesStore } from "@watcourses/stores/CachedCoursesStore";
import { action, makeObservable, observable } from "mobx";
import { observer } from "mobx-react";
import React from "react";
import styled from "styled-components";

import { CourseDetailState } from "../CourseDetailState";

import { IRequisite, RequisiteContent, REQUISITE_ICONS } from "./index";
import { RequisiteDetail } from "./RequisiteDetail";

interface IRequisiteChipProps {
  courseDetailState: CourseDetailState;
  requisite: IRequisite;
  id: number | string;
}

@observer
export class RequisiteChip extends React.Component<IRequisiteChipProps> {

  @observable
  private active: boolean = false;

  @observable
  private wrapperRef: React.RefObject<HTMLDivElement> = React.createRef();

  private chipRef: React.RefObject<HTMLDivElement> = React.createRef();

  @action
  private setActive(_active: boolean) {
    this.active = _active;
    if (!this.wrapperRef) {
      return;
    }
    if (_active) {
      this.props.courseDetailState.registerDescendent(this.wrapperRef);
    } else {
      this.props.courseDetailState.removeDescendent(this.wrapperRef);
    }
  }

  private toggleActive = () => {
    this.setActive(!this.active);
  };

  @action
  private onDismiss = () => {
    this.setActive(false);
  };

  constructor(props: IRequisiteChipProps) {
    super(props);
    makeObservable(this);
  }

  render() {
    const {
      id,
      requisite,
    } = this.props;

    const {
      active,
      chipRef,
      toggleActive,
      onDismiss,
    } = this;

    const course = CachedCoursesStore.get().getByCode(requisite.code);

    return (
      <>
        <StyledChip
          ref={chipRef}
          className={'unselectable'}
          onInteraction={toggleActive}
          icon={requisite.met ? REQUISITE_ICONS.MET : REQUISITE_ICONS.UNMET}
          met={requisite.met ? 1 : 0}
          necessary={requisite.necessary ? 1 : 0}
          label={requisite.code}
          key={id}
        />
        {requisite.content === RequisiteContent.HAS_COURSE && !!course && (
          <Popper
            id={`${id}`}
            open={active}
            anchorEl={chipRef.current}
            placement="bottom-start"
          >
            <div ref={this.wrapperRef}>
              <RequisiteDetail
                onDismiss={onDismiss}
                requisite={requisite}
                course={course}
              />
            </div>
          </Popper>
        )}
      </>
    );
  }
}

const StyledChip = styled(Chip)<ChipProps & ChipHTMLProps & {
  met?: number,
  necessary?: number,
}>`
  background-color: ${props => props.met
  ? '#edf7fe'
  : props.necessary ? '#feeded' : '#f5f5f5'
};

  i {
    color: ${props => props.met
  ? '#2196f3'
  : props.necessary ? '#ff0000' : '#616161'
};
  }
`;
