import React from 'react';
import styled from "styled-components";

interface ICoursePageProps {
  code: string;
}

export class CoursePage extends React.Component<ICoursePageProps> {
  render() {
    return (
      <Root>
        <h1>{this.props.code}</h1>
      </Root>
    );
  }
}

// @observer
// class

const Root = styled.div`
  height: 100%;
  margin-left: 16px;
`;
