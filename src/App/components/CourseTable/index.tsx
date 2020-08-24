import React, {useEffect} from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import {SearchCourseRequest} from "../../proto/courses";
import EnhancedTableHead from "./EnhancedTableHead";
import CourseTableRow from "./CourseTableRow";
import styled from "styled-components";
import {CourseDisplayData, Order} from "./CourseTableUtils";
import {IconButton, IconButtonHTMLProps, IconButtonProps} from "@rmwc/icon-button";
import {TablePagination} from "@material-ui/core";
import '@rmwc/circular-progress/styles';
import {connect, ConnectedProps} from "react-redux";
import {bindActionCreators, Dispatch} from "redux";
import CourseTableRowPlaceholder from "./CourseTableRowPlaceholder";
import {RootState} from "../../redux/store";
import {doSearch} from "../../redux/slices/search";
import studentProfile from "../../redux/slices/studentProfile";

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

const CourseTable = ({doSearchAction, pagination, rows, loading, error, shortList, addShortList, removeShortList}: CourseTableProps) => {

    const [order, setOrder] = React.useState<Order>("asc");
    const [orderBy, setOrderBy] = React.useState<keyof CourseDisplayData>("code");
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(25);

    useEffect(() => {
        doSearchAction(SearchCourseRequest.fromJSON({
            pagination: {
                zeroBasedPage: page,
                limit: rowsPerPage
            }
        }))
    }, [page, rowsPerPage])

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof CourseDisplayData
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
        if (shortlist) addShortList({code, index: null});
        else removeShortList({code});
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
                        rowCount={loading ? rowsPerPage : rows.length}
                    />
                    <TableBody>
                        {
                            loading || error
                                ? Array.from(Array(rowsPerPage).keys())
                                    .map((row) => <CourseTableRowPlaceholder key={row}/>)
                                : rows.map((row) =>
                                    <CourseTableRow key={row.code}
                                                    row={row}
                                                    shortListed={shortList?.includes(row.code) ?? false}
                                                    setShortList={setShortList}/>)
                        }
                    </TableBody>
                </Table>
            </StyledTableContainer>
            <PaginationWrapper>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25, 50, 100]}
                    component="div"
                    count={(pagination?.totalPages ?? 0) * rowsPerPage} // TODO: backend return accurate total count
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}/>
            </PaginationWrapper>
        </Root>
    );
}

const mapState = (state: RootState) => ({
    loading: state.search.loading,
    error: state.search.error,
    rows: state.search.content,
    pagination: state.search.pagination,
    shortList: state.studentProfile.content?.shortList
})

const mapDispatch = (dispatch: Dispatch) => bindActionCreators({
    doSearchAction: doSearch,
    addShortList: studentProfile.actions.addShortlist,
    removeShortList: studentProfile.actions.removeShortlist
}, dispatch)

const connector = connect(mapState, mapDispatch)

export default connector(CourseTable)

