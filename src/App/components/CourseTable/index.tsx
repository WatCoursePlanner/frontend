import { TablePagination } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import '@rmwc/circular-progress/styles';
import { IconButton, IconButtonHTMLProps, IconButtonProps } from "@rmwc/icon-button";
import React, { useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import styled from "styled-components";

import { SearchCourseRequest } from "@watcourses/proto/courses";
import { doSearch } from "@watcourses/redux/slices/search";
import studentProfileSlice from "@watcourses/redux/slices/studentProfileSlice";
import { RootState } from "@watcourses/redux/store";

import CourseTableRow from "./CourseTableRow";
import CourseTableRowPlaceholder from "./CourseTableRowPlaceholder";
import { ICourseDisplayData, Order } from "./CourseTableUtils";
import EnhancedTableHead from "./EnhancedTableHead";

const Root = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`

const StyledTableContainer = styled(TableContainer)`
  flex-grow: 1;
  width: auto !important;
  padding-right: 48px;
`

// `filled` needs to be a number instead of boolean
// see https://github.com/styled-components/styled-components/issues/1198#issuecomment-336628848
export const StyledIconButton =
    styled(IconButton)<IconButtonHTMLProps & IconButtonProps & { filled?: number }>`
      color: #5f6368;
      font-family: ${props => props.filled ? "Material Icons" : "Material Icons Outlined"};
    `

const PaginationWrapper = styled.div`
  min-height: 52px;
  padding-right: 48px;
`

type CourseTableProps = ConnectedProps<typeof connector>

const CourseTable = ({doSearchAction, search, shortList, addShortList, removeShortList}: CourseTableProps) => {

    const [order, setOrder] = React.useState<Order>("asc");
    const [orderBy, setOrderBy] = React.useState<keyof ICourseDisplayData>("code");
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(25);

    useEffect(() => {
        doSearchAction(SearchCourseRequest.fromJSON({
            pagination: {
                zeroBasedPage: page,
                limit: rowsPerPage
            },
            searchQuery: search.query
        }))
    }, [page, rowsPerPage, search.query])

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof ICourseDisplayData
    ) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage)
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const setShortList = (code: string, shortlist: boolean) => {
        if (shortlist) {
            addShortList({code, index: null});
        } else {
            removeShortList({code});
        }
    };

    return (
        <Root>
            <StyledTableContainer>
                <Table
                    stickyHeader
                    aria-labelledby="tableTitle"
                    aria-label="enhanced table"
                >
                    <EnhancedTableHead
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                        rowCount={search.loading ? rowsPerPage : search.content.length}
                    />
                    <TableBody>
                        {
                            search.loading || search.error
                                ? Array.from(Array(rowsPerPage).keys())
                                    .map((row) => <CourseTableRowPlaceholder key={row}/>)
                                : search.content.map((row) =>
                                    <CourseTableRow
                                        key={row.code}
                                        row={row}
                                        shortListed={shortList?.includes(row.code) ?? false}
                                        setShortList={setShortList}
                                    />)
                        }
                    </TableBody>
                </Table>
            </StyledTableContainer>
            <PaginationWrapper>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25, 50, 100]}
                    component="div"
                    count={search.pagination?.totalResults ?? 0}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}/>
            </PaginationWrapper>
        </Root>
    );
}

const mapState = (state: RootState) => ({
    search: state.search,
    shortList: state.studentProfile.content?.shortList
})

const mapDispatch = (dispatch: Dispatch) => bindActionCreators({
    doSearchAction: doSearch,
    addShortList: studentProfileSlice.actions.addShortlist,
    removeShortList: studentProfileSlice.actions.removeShortlist
}, dispatch)

const connector = connect(mapState, mapDispatch)

export default connector(CourseTable)
