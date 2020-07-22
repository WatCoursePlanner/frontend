import React from "react";
import Autocomplete, {createFilterOptions} from '@material-ui/lab/Autocomplete';
import '@rmwc/icon-button/styles';
import '@rmwc/textfield/styles';
import SearchBar, {SearchBarProps} from "./SearchBar";

type AutoCompleteProps = {
    options: AutoCompleteOption[],
}

export type AutoCompleteOption = {
    title: string,
    subTitle: string,
}

const AutoCompleteSearchBar = ({options, searchText, setSearchText, searchCallback}: AutoCompleteProps & SearchBarProps) => {
    const filterOptions = createFilterOptions<AutoCompleteOption | string>({
        limit: 5,
    });
    return (
        <Autocomplete
            freeSolo
            disableListWrap
            filterOptions={filterOptions}
            options={searchText.length > 0 ? options.map((option => option.title ?? '')) : []}
            onChange={(event, newValue: string | AutoCompleteOption | null) => {
                //TODO selected from list
                if (!newValue) return
                console.log("[Autocomplete] TODO select " + newValue)
            }}
            inputValue={searchText}
            onInputChange={(event, newInputValue) => {
                setSearchText(newInputValue)
            }}
            renderOption={(option) => (
                <React.Fragment>
                    <span style={{minWidth: 100, marginRight: 12}}>{option}</span>
                    {options.filter(o => o.title === option)[0]?.subTitle}
                </React.Fragment>
            )}
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
