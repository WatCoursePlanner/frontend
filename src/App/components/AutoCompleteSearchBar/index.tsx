import React from "react";
import Autocomplete, {createFilterOptions} from '@material-ui/lab/Autocomplete';
import '@rmwc/icon-button/styles';
import '@rmwc/textfield/styles';
import SearchBar, {SearchBarProps} from "./SearchBar";
import styled from "styled-components";

export type AutoCompleteProps = {
    options?: AutoCompleteOption[],
    onAutoCompleteSelect: ((text: string) => void)
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

const AutoCompleteSearchBar = ({options, searchText, setSearchText, searchCallback, onAutoCompleteSelect}: AutoCompleteProps & SearchBarProps) => {
    const filterOptions = createFilterOptions<AutoCompleteOption | string>({
        limit: 25,
    });
    return (
        <Autocomplete
            freeSolo
            disableListWrap
            filterOptions={filterOptions}
            options={searchText.length > 0 ? options!!.map((option => option.title ?? '')) : []}
            onChange={(event, newValue: string | AutoCompleteOption | null) => {
                if (!newValue || typeof newValue != "string") return
                onAutoCompleteSelect(newValue)
            }}
            inputValue={searchText}
            onInputChange={(event, newInputValue) => {
                setSearchText(newInputValue)
            }}
            renderOption={(option) => (
                <React.Fragment>
                    <Title>{option}</Title>
                    {options?.filter(o => o.title === option)[0]?.subTitle}
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
