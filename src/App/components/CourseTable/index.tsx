import { TablePagination } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";

import {
  IconButton,
  IconButtonHTMLProps,
  IconButtonProps,
} from "@rmwc/icon-button";
import searchCourses from "@watcourses/api/Course/search";
import {
  SearchCourseRequest,
  SearchCourseResponse,
  Sort_Order,
  Sort_SortBy,
} from "@watcourses/proto/courses";
import { StudentProfileStore } from "@watcourses/stores/StudentProfileStore";
import { buildProto } from "@watcourses/utils/buildProto";
import {
  action,
  computed,
  IReactionDisposer,
  makeObservable,
  observable,
  reaction,
  when,
} from "mobx";
import { observer } from "mobx-react";
import {
  fromPromise,
  FULFILLED,
  IPromiseBasedObservable,
  PENDING,
} from "mobx-utils";
import React from "react";
import styled from "styled-components";

import { CourseTableRow } from "./CourseTableRow";
import { CourseTableRowPlaceholder } from "./CourseTableRowPlaceholder";
import { ICourseDisplayData, Order } from "./CourseTableUtils";
import { EnhancedTableHead } from "./EnhancedTableHead";

const Root = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const StyledTableContainer = styled(TableContainer)`
  flex-grow: 1;
  width: auto !important;
  padding-right: 48px;
`;

/**
 * `filled` needs to be a number instead of boolean
 * see https://github.com/styled-components/styled-components/issues/1198#issuecomment-336628848
 */
export const StyledIconButton = styled(IconButton)<IconButtonHTMLProps &
  IconButtonProps & {
  filled?: number
}>`
  color: #5f6368;
  font-family: ${props => props.filled
  ? "Material Icons"
  : "Material Icons Outlined"};
`;

const PaginationWrapper = styled.div`
  min-height: 52px;
  padding-right: 48px;
`;

interface ICourseTableProps {
  searchQuery: string;
}

const searchOrderMap: Map<Order, Sort_Order> = new Map<Order, Sort_Order>([
  ["asc", Sort_Order.ASC],
  ["desc", Sort_Order.DESC],
]);

const searchOrderByMap: Map<keyof ICourseDisplayData, Sort_SortBy> =
  new Map<keyof ICourseDisplayData, Sort_SortBy>([
    ["code", Sort_SortBy.CODE],
    ["name", Sort_SortBy.TITLE],
    ["like", Sort_SortBy.LIKED],
    ["useful", Sort_SortBy.USEFUL],
    ["easy", Sort_SortBy.EASY],
  ]);

@observer
export class CourseTable extends React.Component<ICourseTableProps> {

  @observable
  private searchResultPromise?: IPromiseBasedObservable<SearchCourseResponse>;

  @observable
  private cachedSearchResult: SearchCourseResponse =
    buildProto<SearchCourseResponse>({
      pagination: {
        totalPages: 0,
        totalResults: 0,
      },
      results: [],
    });

  @computed
  get isLoading(): boolean {
    return this.searchResultPromise?.state === PENDING;
  }

  @computed
  get searchResult(): SearchCourseResponse {
    return this.searchResultPromise?.case({
      fulfilled: (response) => response,
    }) ?? this.cachedSearchResult;
  }

  @observable
  order: Order = "asc";

  @observable
  orderBy: keyof ICourseDisplayData = "code";

  @observable
  page: number = 0;

  @observable
  rowsPerPage: number = 25;

  @action
  private doSearch = () => {
    this.searchResultPromise = fromPromise(
      searchCourses(buildProto<SearchCourseRequest>({
        pagination: {
          zeroBasedPage: this.page,
          limit: this.rowsPerPage,
        },
        searchQuery: this.props.searchQuery,
        sort: {
          order: searchOrderMap.get(this.order),
          sortBy: searchOrderByMap.get(this.orderBy),
        },
      })),
    );
  };

  @action
  private handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof ICourseDisplayData,
  ) => {
    const isAsc = this.orderBy === property && this.order === "asc";
    this.order = isAsc ? "desc" : "asc";
    this.orderBy = property;
  };

  @action
  private handleChangePage = (_: unknown, newPage: number) => {
    this.page = newPage;
  };

  @action
  private handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    this.rowsPerPage = parseInt(event.target.value, 10);
    this.page = 0;
  };

  @action
  private setShortList = (code: string, shouldAdd: boolean) => {
    if (shouldAdd) {
      StudentProfileStore.get().addCourseToShortList({
        code,
        index: -1,
      });
    } else {
      StudentProfileStore.get().removeCourseFromShortlist({
        indexOrCode: code,
      });
    }
  };

  private readonly searchReactionDisposer: IReactionDisposer;

  private readonly searchResultDisposer: IReactionDisposer;

  constructor(props: ICourseTableProps) {
    super(props);
    makeObservable(this);
    this.searchReactionDisposer = reaction(
      () => [
        this.orderBy,
        this.order,
        this.page,
        this.rowsPerPage,
        this.props.searchQuery,
      ],
      () => this.doSearch(),
      {fireImmediately: true},
    );
    this.searchResultDisposer = when(
      () => this.searchResultPromise?.state === FULFILLED,
      () => {
        this.cachedSearchResult = this.searchResult;
      },
    );
  }

  componentWillUnmount() {
    this.searchReactionDisposer();
    this.searchResultDisposer();
  }

  render() {
    return (
      <Root>
        <StyledTableContainer>
          <Table
            stickyHeader
            aria-labelledby="tableTitle"
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              order={this.order}
              orderBy={this.orderBy}
              onRequestSort={this.handleRequestSort}
              rowCount={
                this.isLoading
                  ? this.rowsPerPage
                  : this.searchResult.results.length}
            />
            <TableBody>
              {
                this.isLoading
                  ? Array.from(Array(this.rowsPerPage).keys())
                    .map((row) =>
                      <CourseTableRowPlaceholder key={row}/>,
                    )
                  : this.searchResult.results.map((row) =>
                    <CourseTableRow
                      key={row.code}
                      row={row}
                      shortListed={
                        StudentProfileStore.get().isInShortList(row.code)
                      }
                      setShortList={this.setShortList}
                    />,
                  )
              }
            </TableBody>
          </Table>
        </StyledTableContainer>
        <PaginationWrapper>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 50, 100]}
            component="div"
            count={this.searchResult.pagination?.totalResults ?? 0}
            rowsPerPage={this.rowsPerPage}
            page={this.page}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
          />
        </PaginationWrapper>
      </Root>
    );
  }
}
