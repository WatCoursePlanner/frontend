import React from "react";
import Autocomplete from '@material-ui/lab/Autocomplete';
import '@rmwc/icon-button/styles';
import '@rmwc/textfield/styles';
import SearchBar, {SearchBarProps} from "./SearchBar";
import {Typography} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import ReactHtmlParser from 'react-html-parser';
import matchSorter from 'match-sorter';
import {FilterOptionsState} from "@material-ui/lab";

const fuzzysort = require('fuzzysort')

export type AutoCompleteProps = {
    options?: AutoCompleteOption[],
    onAutoCompleteSelect: ((text: string) => void)
}

interface Result {
    readonly score: number
    readonly target: string
}

interface KeysResult extends ReadonlyArray<Result> {
    readonly total: number
    readonly obj?: AutoCompleteOption
}

export type AutoCompleteOption = {
    title: string,
    subTitle: string,
}

const AutoCompleteSearchBar = ({options, searchText, setSearchText, searchCallback, onAutoCompleteSelect}: AutoCompleteProps & SearchBarProps) => {

    const [displayOptions, setDisplayOptions] = React.useState<KeysResult[]>([]);

    const fetch = (input: string) => {
        return fuzzysort.go(input, options, {
            keys: ['title', 'subTitle'],
            limit: 25 // TODO put into a constant file
        })
    }

    React.useEffect(() => {
        let active = true;
        if (searchText === '') {
            setDisplayOptions([])
            return undefined
        }
        const results = fetch(searchText);
        if (active) {
            let newOptions = [] as KeysResult[]
            if (results) {
                newOptions = [...newOptions, ...results]
            }
            setDisplayOptions(newOptions)
        }
        return () => {
            active = false
        };
    }, [searchText])

    const filterOptions = (options: KeysResult[], { inputValue }: FilterOptionsState<KeysResult>) =>
        matchSorter(options, inputValue, {keys: ['obj.title', 'obj.subTitle']});

    return (
        <Autocomplete
            freeSolo
            disableListWrap
            autoComplete
            includeInputInList
            filterSelectedOptions
            filterOptions={filterOptions}
            options={displayOptions}
            getOptionLabel={(option) => (`${option?.obj?.title ?? option}`)}
            onChange={(event, newValue: KeysResult | string | null) => {
                if (!newValue || typeof newValue == "string") return
                onAutoCompleteSelect(newValue?.obj?.title ?? '')
            }}
            inputValue={searchText}
            onInputChange={(event, newInputValue) => {
                setSearchText(newInputValue)
            }}
            renderOption={(option: KeysResult) => {
                return (
                    <Grid container alignItems="center">
                        <Grid item xs>
                            {
                                option.obj ?
                                    <>
                                        <Typography variant="body1" color="textPrimary">
                                            {option[0] ? ReactHtmlParser(fuzzysort.highlight(option[0])) : option.obj.title}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            {option[1] ? ReactHtmlParser(fuzzysort.highlight(option[1])) : option.obj.subTitle}
                                        </Typography>
                                    </>
                                    : <></>
                            }
                        </Grid>
                    </Grid>
                )
            }}
            renderInput={(props) =>
                <SearchBar
                    searchCallback={searchCallback}
                    autoCompleteRenderProps={props}
                    searchText={searchText}
                    setSearchText={setSearchText}/>
            }
        />
    )
}

export default AutoCompleteSearchBar
