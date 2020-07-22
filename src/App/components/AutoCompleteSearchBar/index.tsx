import React from "react";
import Autocomplete, {createFilterOptions} from '@material-ui/lab/Autocomplete';
import '@rmwc/icon-button/styles';
import '@rmwc/textfield/styles';
import SearchBar, {SearchBarProps} from "./SearchBar";

type AutoCompleteProps = {
    option: AutoCompleteOption[],
}

export type AutoCompleteOption = {
    title: string,
    subTitle: string
}

const isAutoCompleteOption = (x: any): x is AutoCompleteOption => true;

const AutoCompleteSearchBar = ({option, searchText, setSearchText}: AutoCompleteProps & SearchBarProps) => {
    const filterOptions = createFilterOptions<AutoCompleteOption>({
        limit: 5,
    });
    return (
        <Autocomplete
            freeSolo
            filterOptions={filterOptions}
            options={option}
            onChange={(event, newValue: string | AutoCompleteOption | null) => {
                //TODO selected from list
                if (!newValue) return
                if (isAutoCompleteOption(newValue) && newValue.title)
                    console.log("[Autocomplete] Selected " + newValue.title)
                else
                    console.log("[Autocomplete] Entered " + newValue)
            }}
            inputValue={searchText}
            onInputChange={(event, newInputValue) => {
                setSearchText(newInputValue)
            }}
            getOptionLabel={(option: AutoCompleteOption) => option.title ?? ''}
            renderInput={(props) =>
                <SearchBar
                    autoCompleteRenderProps={props}
                    searchText={searchText}
                    setSearchText={setSearchText}/>
            }
        />
    )
}

export default AutoCompleteSearchBar
