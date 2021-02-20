import React from "react";

interface IClickOutsideHandlerProps {
  onClickOutside: () => unknown,
  ignoreContainerRefs?: Set<React.RefObject<HTMLElement>>,
}

export class ClickOutsideHandler extends React.Component<IClickOutsideHandlerProps> {
  private wrapperRef: React.RefObject<HTMLDivElement> = React.createRef();

  private isInIgnoredContainers = (event: any) => {
    if (!this.props.ignoreContainerRefs) {
      return false;
    }
    for (const ref of this.props.ignoreContainerRefs) {
      if (ref.current?.contains(event.target)) {
        return true;
      }
    }
    return false;
  };

  private handleClickOutside = (event: any) => {
    if (
      this.wrapperRef &&
      !this.wrapperRef.current?.contains(event.target) &&
      !this.isInIgnoredContainers(event)
    ) {
      this.props.onClickOutside();
    }
  };

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  render() {
    return (
      <div ref={this.wrapperRef}>
        {this.props.children}
      </div>
    );
  }
}
