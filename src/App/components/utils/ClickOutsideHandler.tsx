import React from "react";

interface IClickOutsideHandlerProps {
  onClickOutside: () => unknown
}

export class ClickOutsideHandler extends React.Component<IClickOutsideHandlerProps> {
  private wrapperRef: HTMLDivElement | undefined;

  setWrapperRef = (node: HTMLDivElement) => {
    this.wrapperRef = node;
  };

  handleClickOutside = (event: any) => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
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
      <div ref={this.setWrapperRef}>
        {this.props.children}
      </div>
    );
  }
}
