import Autocomplete from '@material-ui/lab/Autocomplete';
import '@rmwc/icon-button/styles';
import '@rmwc/textfield/styles';
import { buildProto } from "@watcourses/utils/buildProto";
import * as Fuzzysort from "fuzzysort";
import { makeObservable, observable, reaction, toJS } from "mobx";
import { disposeOnUnmount, observer } from "mobx-react";
import React from "react";

import Option from "./Option";
import { ISearchBarProps, SearchBar } from "./SearchBar";
import Result = Fuzzysort.Result;

export type AutoCompleteOption = {
  title: string,
  subTitle: string,
  titleResult?: Result | null,
  subTitleResult?: Result | null,
  score?: number,
  weight?: number
}

export interface IAutoCompleteCallbackProps {
  onAutoCompleteSelect: ((text: string) => void)
}

export interface IAutoCompleteProps extends IAutoCompleteCallbackProps,
  ISearchBarProps {
  options: AutoCompleteOption[],
}

const AutoCompleteMaxResults = 10;
const AutoCompleteThreshold = -5000;

const sortByWeight = (options: AutoCompleteOption[]) => {
  const getWeight = (a: AutoCompleteOption) => (
    (a.weight ?? 0) + (a.score ?? 0)
  );
  return options.sort((a, b) =>
    (getWeight(b) - getWeight(a))
  );
};

@observer
export class AutoCompleteSearchBar extends React.Component<IAutoCompleteProps> {

  @observable
  displayOptions: AutoCompleteOption[] = [];

  fetchOptions = (input: string) => {
    return Fuzzysort.go(input, this.props.options, {
      keys: ['title', 'subTitle'],
      limit: AutoCompleteMaxResults,
      allowTypo: true,
      threshold: AutoCompleteThreshold
    });
  };

  @disposeOnUnmount
  searchTextReaction = reaction(
    () => this.props.searchText,
    (searchText) => {
      this.displayOptions = this.fetchOptions(searchText)
        .map(keysResult => buildProto<AutoCompleteOption>({
          title: keysResult.obj.title,
          subTitle: keysResult.obj.subTitle,
          titleResult: keysResult[0],
          subTitleResult: keysResult[1],
          score: keysResult.score,
          weight: keysResult.obj.weight,
        }));
    }
  );

  componentDidMount() {
    makeObservable(this);
  }

  render() {
    const {
      searchText,
      setSearchText,
      onSearch,
      onAutoCompleteSelect
    } = this.props;
    return (
      <Autocomplete
        freeSolo
        disableListWrap
        autoComplete
        includeInputInList
        filterSelectedOptions
        filterOptions={sortByWeight}
        options={toJS(this.displayOptions)}
        getOptionLabel={(option) => (option.title)}
        onChange={(
          event,
          newValue: AutoCompleteOption | string | null
        ) => {
          if (!newValue || typeof newValue === "string") {
            return;
          }
          onAutoCompleteSelect(newValue.title);
        }}
        inputValue={searchText}
        onInputChange={(event, newInputValue) => {
          setSearchText(newInputValue);
        }}
        renderOption={(option) => <Option option={option}/>}
        renderInput={(props) =>
          <SearchBar
            onSearch={onSearch}
            autoCompleteRenderProps={props}
            searchText={searchText}
            setSearchText={setSearchText}
          />
        }
      />
    );
  }
}
