import { AutocompleteRenderInputParams } from "@material-ui/lab";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { buildProto } from "@watcourses/utils/buildProto";
import * as Fuzzysort from "fuzzysort";
import { action, makeObservable, observable, reaction, toJS } from "mobx";
import { disposeOnUnmount, observer } from "mobx-react";
import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";

import { Option } from "./Option";
import { SearchBar } from "./SearchBar";
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
  onAutoCompleteSelect: ((text: string) => void);
}

interface IAutoCompleteProps extends IAutoCompleteCallbackProps {
  autoCompleteRenderProps?: AutocompleteRenderInputParams,
  onSearch: ((query: string) => void),
  options: AutoCompleteOption[],
}

const AutoCompleteMaxResults = 10;
const AutoCompleteThreshold = -5000;

const sortByWeight = (options: AutoCompleteOption[]) => {
  const getWeight = (a: AutoCompleteOption) => (
    (a.weight ?? 0) + (a.score ?? 0)
  );
  return options.sort((a, b) =>
    (getWeight(b) - getWeight(a)),
  );
};

@observer
class AutoCompleteSearchBarBase extends React.Component<IAutoCompleteProps & RouteComponentProps> {
  @observable
  private displayOptions: AutoCompleteOption[] = [];

  @observable
  private searchText: string = "";

  private fetchOptions = (input: string) => {
    return Fuzzysort.go(input, this.props.options, {
      keys: ['title', 'subTitle'],
      limit: AutoCompleteMaxResults,
      allowTypo: true,
      threshold: AutoCompleteThreshold,
    });
  };

  @action
  setSearchText = (text?: string) => {
    this.searchText = text ?? "";
    this.displayOptions = this.fetchOptions(this.searchText)
      .map(keysResult => buildProto<AutoCompleteOption>({
        title: keysResult.obj.title,
        subTitle: keysResult.obj.subTitle,
        titleResult: keysResult[0],
        subTitleResult: keysResult[1],
        score: keysResult.score,
        weight: keysResult.obj.weight,
      }));
  };

  setSearchTextFromURLParam = () => {
    const query = (new URLSearchParams(location.search)).get("query") ?? "";
    this.setSearchText(query);
  };

  constructor(props: IAutoCompleteProps & RouteComponentProps) {
    super(props);
    makeObservable(this);
    this.setSearchTextFromURLParam();
  }

  componentDidUpdate(prevProps: Readonly<IAutoCompleteProps & RouteComponentProps>, prevState: Readonly<{}>, snapshot?: any) {
    if (this.props.location !== prevProps.location) {
      this.setSearchTextFromURLParam();
    }
  }

  render() {
    const {
      onSearch,
      onAutoCompleteSelect,
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
        getOptionLabel={(option) => (option.title ?? option)}
        onChange={(
          event,
          newValue: AutoCompleteOption | string | null,
        ) => {
          if (!newValue || typeof newValue === "string") {
            return;
          }
          (document.activeElement as HTMLElement).blur();
          onAutoCompleteSelect(newValue.title);
        }}
        inputValue={this.searchText}
        value={this.searchText}
        onInputChange={(event, newInputValue) => {
          this.setSearchText(newInputValue);
        }}
        renderOption={(option) => <Option option={option}/>}
        renderInput={(props) =>
          <SearchBar
            onSearch={(query: string) => {
              onSearch(query);
              (document.activeElement as HTMLElement).blur();
            }}
            autoCompleteRenderProps={props}
            searchText={this.searchText}
            setSearchText={this.setSearchText}
          />
        }
      />
    );
  }
}

export const AutoCompleteSearchBar = withRouter(AutoCompleteSearchBarBase);
