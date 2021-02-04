import { Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import * as Fuzzysort from "fuzzysort";
import React from "react";
import ReactHtmlParser from "react-html-parser";

import { AutoCompleteOption } from "./index";

const Option = ({option}: { option: AutoCompleteOption }) => (
  <Grid container alignItems="center">
    <Grid item xs>
      <Typography variant="body1" color="textPrimary">
        {
          option.titleResult
            ? ReactHtmlParser(Fuzzysort.highlight(option.titleResult) ?? '')
            : option.title
        }
      </Typography>
      <Typography variant="body2" color="textSecondary">
        {
          option.subTitleResult
            ? ReactHtmlParser(Fuzzysort.highlight(option.subTitleResult) ?? '')
            : option.subTitle
        }
      </Typography>
    </Grid>
  </Grid>
);

export default Option;
