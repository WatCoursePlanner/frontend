import React from "react";
import Autocomplete from '@material-ui/lab/Autocomplete';
import '@rmwc/icon-button/styles';
import '@rmwc/textfield/styles';
import SearchBar, {SearchBarProps} from "./SearchBar";
import styled from "styled-components";
import {Typography} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import ReactHtmlParser from 'react-html-parser';

const fuzzysort = require('fuzzysort')

export type AutoCompleteProps = {
    _options?: AutoCompleteOption[],
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

interface KeysResults extends ReadonlyArray<KeysResult> {
    readonly total: number
}

interface Option {
    description: string;
    structured_formatting: {
        main_text: string;
        secondary_text: string;
        main_text_matched_substrings: [
            {
                offset: number;
                length: number;
            },
        ];
        secondary_text_matched_substrings: [
            {
                offset: number;
                length: number;
            },
        ];
    };
}

export type AutoCompleteOption = {
    title: string,
    subTitle: string,
}

const Title = styled.span`
    min-width: 100px; 
    margin-right: 12px;
    font-weight: 600;
`


const AutoCompleteSearchBar = ({_options, searchText, setSearchText, searchCallback, onAutoCompleteSelect}: AutoCompleteProps & SearchBarProps) => {

    const [value, setValue] = React.useState<KeysResult | null>(null);
    // const [inputValue, setInputValue] = React.useState('');
    const [options, setOptions] = React.useState<KeysResult[]>([]);

    const fetch = (input: string) => {
        return fuzzysort.go(input, _options, {
            keys: [
                'title', 'subTitle'
            ],
        })
    }

    React.useEffect(() => {
        let active = true;
        if (searchText === '') {
            setOptions(value ? [value] : []);
            return undefined;
        }
        const results = fetch(searchText);
        // console.log(results.map((r: any) => r['obj']))
        // console.log(results[0])
        if (active) {
            let newOptions = [] as KeysResult[];
            if (value) {
                newOptions = [value];
            }
            if (results) {
                newOptions = [...newOptions, ...results];
            }
            setOptions(newOptions);
            console.log(newOptions)
        }
        return () => {
            active = false;
        };
    }, [value, searchText]);


    // const filterOptions = createFilterOptions<AutoCompleteOption>({
    //     limit: 25,
    // });
    return (
        <Autocomplete
            disableListWrap
            autoComplete
            includeInputInList
            filterSelectedOptions
            // filterOptions={filterOptions}
            options={options}
            getOptionLabel={(option) => (option && option.obj ? `${option.obj.title} ${option.obj.subTitle}` : '')}
            onChange={(event, newValue: KeysResult | null) => {
                // if (!newValue || typeof newValue != "string") return
                // onAutoCompleteSelect(newValue)
                setOptions(newValue ? [newValue, ...options] : options);
                setValue(newValue);
            }}
            inputValue={searchText}
            onInputChange={(event, newInputValue) => {
                setSearchText(newInputValue)
            }}
            renderOption={(option: KeysResult) => {
                // const matches = option.structured_formatting.main_text_matched_substrings;
                // const parts = parse(
                //     option.structured_formatting.main_text,
                //     matches.map((match: any) => [match.offset, match.offset + match.length]),
                // );
                return (
                    <Grid container alignItems="center">
                        <Grid item xs>
                            {/*        {parts.map((part, index) => (*/}
                            {/*            <span key={index} style={{fontWeight: part.highlight ? 700 : 400}}>*/}
                            {/*  {part.text}*/}
                            {/*</span>*/}
                            {/*        ))}*/}
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
            }
            }
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
