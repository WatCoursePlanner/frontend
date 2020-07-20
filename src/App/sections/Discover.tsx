import React from 'react'
import CourseTable from "../components/CourseTable";
import styled from "styled-components";

const Root = styled.div`
  height: 100%;
  margin-left: 36px;
  margin-right: 56px;
`

const Discover = () => {
    return (
        <Root>
            <CourseTable/>
        </Root>
    )
}

export default Discover
