import CourseTable from "@watcourses/components/CourseTable";
import React from 'react'
import styled from "styled-components";

const Root = styled.div`
  height: 100%;
  margin-left: 16px;
`

const Discover = () => {
    return (
        <Root>
            <CourseTable/>
        </Root>
    )
}

export default Discover
