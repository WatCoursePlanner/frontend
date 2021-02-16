import { Chip, ChipHTMLProps, ChipProps } from "@rmwc/chip";
import '@rmwc/chip/styles';
import { action, makeObservable, observable } from "mobx";
import { observer } from "mobx-react";
import React from "react";
import styled from "styled-components";
import { CachedCoursesStore } from "../../../stores/CachedCoursesStore";

import { CourseDetailState } from "../CourseDetailState";
import { Popper } from "../Popper";

import { IRequisite } from "./index";
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

    return (
      <>
        <StyledChip
          ref={chipRef}
          className={'unselectable'}
          onInteraction={toggleActive}
          icon={requisite.met ? "done" : "close"}
          met={requisite.met ? 1 : 0}
          label={requisite.code}
          key={id}
        />
        <Popper
          id={`${id}`}
          open={active}
          anchorEl={chipRef.current}
          placement="bottom-start"
        >
          <div ref={this.wrapperRef}>
            <RequisiteDetail
              onDismiss={onDismiss}
              course={CachedCoursesStore.get().getByCode(requisite.code)}
            />
          </div>
        </Popper>
      </>
    );
  }
}

const StyledChip = styled(Chip)<ChipProps & ChipHTMLProps & { met?: number }>`
  background-color: ${props => props.met ? '#edf7fe' : '#feeded'};

  i {
    color: ${props => props.met ? '#2196f3' : '#ff0000'};
  }
`;
