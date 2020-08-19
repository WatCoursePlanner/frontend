import React from "react";
import Autocomplete from '@material-ui/lab/Autocomplete';
import '@rmwc/icon-button/styles';
import '@rmwc/textfield/styles';
import SearchBar, {SearchBarProps} from "./SearchBar";
import Option from "./Option";
import * as Fuzzysort from "fuzzysort";

export type AutoCompleteOption = {
    title: string,
    subTitle: string,
    weight: number
}

export type AutoCompleteCallbackProps = {
    onAutoCompleteSelect: ((text: string) => void)
}

export type AutoCompleteProps = {
    options: AutoCompleteOption[],
}

const sortByWeight = (options: Fuzzysort.KeysResult<AutoCompleteOption>[]) => {
    return options.sort((a, b) => ((a?.obj?.weight ?? 0) < (b?.obj?.weight ?? 0)) ? -1 : 1)
}

const AutoCompleteSearchBar =
    ({options, searchText, setSearchText, searchCallback, onAutoCompleteSelect}:
         AutoCompleteProps & AutoCompleteCallbackProps & SearchBarProps) => {

        const [displayOptions, setDisplayOptions] = React.useState<Fuzzysort.KeysResult<AutoCompleteOption>[]>([]);

        const fetchOptions = (input: string) => {
            return Fuzzysort.go(input, options, {
                keys: ['title', 'subTitle'],
                limit: 10, // TODO put into a constant file
                allowTypo: true,
                threshold: -5000
            })
        }

        React.useEffect(() => {
            let active = true;
            if (searchText === '') {
                setDisplayOptions([])
                return undefined
            }
            const results = fetchOptions(searchText)
            // console.log(results)
            if (active) {
                let newOptions = [] as Fuzzysort.KeysResult<AutoCompleteOption>[]
                if (results) {
                    newOptions = [...newOptions, ...results]
                }
                setDisplayOptions(newOptions)
            }
            return () => {
                active = false
            };
        }, [searchText])

        return (
            <Autocomplete
                freeSolo
                disableListWrap
                autoComplete
                includeInputInList
                filterSelectedOptions
                filterOptions={sortByWeight}
                options={displayOptions}
                getOptionLabel={(option) => (`${option?.obj?.title ?? option}`)}
                onChange={(event, newValue: Fuzzysort.KeysResult<AutoCompleteOption> | string | null) => {
                    if (!newValue || typeof newValue == "string") return
                    onAutoCompleteSelect(newValue?.obj?.title ?? '')
                }}
                inputValue={searchText}
                onInputChange={(event, newInputValue) => {
                    setSearchText(newInputValue)
                }}
                renderOption={(option) => <Option option={option}/>}
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
