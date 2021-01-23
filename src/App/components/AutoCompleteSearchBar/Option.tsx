import { Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import * as Fuzzysort from "fuzzysort";
import React from "react";
import ReactHtmlParser from "react-html-parser";

import { AutoCompleteOption } from "./index";

const Option = ({option}: { option: Fuzzysort.KeysResult<AutoCompleteOption> }) => (
    <Grid container alignItems="center">
        <Grid item xs>
            {
                option.obj ?
                    <>
                        <Typography variant="body1" color="textPrimary">
                            {option[0] ? ReactHtmlParser(Fuzzysort.highlight(option[0]) ?? '') : option.obj.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            {option[1] ? ReactHtmlParser(Fuzzysort.highlight(option[1]) ?? '') : option.obj.subTitle}
                        </Typography>
                    </>
                    : <></>
            }
        </Grid>
    </Grid>
)

export default Option
