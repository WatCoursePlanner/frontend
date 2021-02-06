import { CourseTable } from "@watcourses/components/CourseTable";
import React from 'react';
import styled from "styled-components";

interface IDiscoverProps {
  searchQuery: string;
}

export class Discover extends React.Component<IDiscoverProps> {
  render() {
    return (
      <Root>
        <CourseTable searchQuery={this.props.searchQuery}/>
      </Root>
    );
  }
}

const Root = styled.div`
  height: 100%;
  margin-left: 16px;
`;
