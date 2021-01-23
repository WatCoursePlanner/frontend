import React from 'react'
import styled from "styled-components";

import CourseTable from "../components/CourseTable";

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
