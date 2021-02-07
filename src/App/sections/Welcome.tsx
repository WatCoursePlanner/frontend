import { Container } from "@material-ui/core";
import TranscriptReader from "@watcourses/components/TranscriptReader";
import React from 'react';
import { AppContainer } from "react-hot-loader";

const Welcome = () => {
  return (
    <Container>
      <AppContainer>
        <TranscriptReader/>
      </AppContainer>
    </Container>
  );
};

export default Welcome;
