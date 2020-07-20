import React, {useEffect} from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import {CourseInfo, SearchCourseRequest, SearchCourseResponse} from "../../proto/courses";
import {URL_BASE} from "../../constants/api";
import EnhancedTableHead from "./EnhancedTableHead";
import CourseTableRow from "./CourseTableRow";
import styled from "styled-components";
import {CourseDisplayData, getComparator, Order, stableSort} from "./CourseTableUtils";
import {IconButton, IconButtonHTMLProps, IconButtonProps} from "@rmwc/icon-button";

const Root = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`

const StyledTable = styled(TableContainer)`
  flex-grow: 1;
  width: auto !important;
  min-width: 750px;
  padding-right: 48px;
`

export const StyledIconButton = styled(IconButton)<IconButtonHTMLProps & IconButtonProps>`
  color: #5f6368;
`

const PaginationWrapper = styled.div`
  min-height: 52px;
  padding-right: 48px;
`

const CourseTable = () => {

    useEffect(() => {
        fetchCourses(SearchCourseRequest.fromJSON(""))
    }, [])

    const [order, setOrder] = React.useState<Order>("asc");
    const [orderBy, setOrderBy] = React.useState<keyof CourseDisplayData>("name");
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(25);
    const [rows, setRows] = React.useState<CourseInfo[]>([]);

    const fetchCourses = async (request: SearchCourseRequest) => {
        const response = await fetch(URL_BASE + "/course/search/")
        const res = await response.json()
        if (res.error) {
            setRows([])
        }
        setRows(SearchCourseResponse.fromJSON(res).results)
    }

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof CourseDisplayData
    ) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    /*TODO：not adding favorite at the same time*/

    return (
        <Root>
            <StyledTable>
                <Table
                    stickyHeader
                    aria-labelledby="tableTitle"
                    aria-label="enhanced table"
                >
                    <EnhancedTableHead
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                        rowCount={rows.length}
                    />
                    <TableBody>
                        {stableSort(rows, getComparator(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) =>
                                <CourseTableRow key={row.code} row={row}/>
                            )}
                    </TableBody>
                </Table>
            </StyledTable>
            <PaginationWrapper>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}/>
            </PaginationWrapper>
        </Root>
    );
}

export default CourseTable
