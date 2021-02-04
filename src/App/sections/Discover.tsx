import CourseTable from "@watcourses/components/CourseTable";
import React from 'react'
import styled from "styled-components";

export const Discover = () => {
    return (
        <Root>
            <CourseTable/>
        </Root>
    )
}

const Root = styled.div`
  height: 100%;
  margin-left: 16px;
`
