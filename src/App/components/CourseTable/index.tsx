import React from 'react';
import {makeStyles, Theme} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FilterListIcon from '@material-ui/icons/FilterList';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';

interface Data {
    name: string,
    coursename: string,
    ratings: number,
    useful: number,
    easy: number,
    liked: number,
}

function createData(
    name: string,
    coursename: string,
    ratings: number,
    useful: number,
    easy: number,
    liked: number,
): Data {
    return { name, coursename, ratings, useful, easy, liked };
}

const rows = [
    createData('CS 125', 'Introduction to Computer Science 1', 2042, 21, 9,12),
    createData('ECE 123', 'A Random CS Course', 222, 50, 22,100),
    createData('CS 235', 'Computer Science 1', 42, 21, 9,22),
    createData('CS 135', 'Introduction to Computer Science 1', 2042, 21, 9,22),
    createData('CS 145', 'Introduction to Computer Science 1', 2042, 21, 9,22),
    createData('CS 155', 'Introduction to Computer Science 1', 2042, 21, 9,22),
    createData('CS 165', 'Introduction to Computer Science 1', 2042, 21, 9,22),
    createData('CS 175', 'Introduction to Computer Science 1', 2042, 21, 9,22),
    createData('CS 185', 'Introduction to Computer Science 1', 2042, 21, 9,22),
    createData('CS 195', 'Introduction to Computer Science 1', 2042, 21, 9,22),
    createData('CS 105', 'Introduction to Computer Science 1', 2042, 21, 9,22),
    createData('CS 315', 'Introduction to Computer Science 1', 2042, 21, 9,22),
    createData('CS 415', 'Introduction to Computer Science 1', 2042, 21, 9,22),
];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
    id: keyof Data;
    label: string;
    numeric: boolean;
}

const headCells: HeadCell[] = [
    { id: 'name', numeric: false, label: 'Code' },
    { id: 'coursename', numeric: false, label: 'Name' },
    { id: 'ratings', numeric: true,label: 'Ratings' },
    { id: 'useful', numeric: true, label: 'Useful (%)' },
    { id: 'easy', numeric: true, label: 'Easy (%)' },
    { id: 'liked', numeric: true, label: 'Liked (%)' },
];


interface EnhancedTableProps {
    classes: ReturnType<typeof useStyles>;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
    const { classes, order, orderBy, onRequestSort } = props;
    const createSortHandler = (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell >
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>

                ))}
                <TableCell >
                    <Tooltip title="Filter list">
                        <IconButton aria-label="filter list">
                            <FilterListIcon />
                        </IconButton>
                    </Tooltip>
                </TableCell>
            </TableRow>
        </TableHead>
    );
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
}));

export default function EnhancedTable() {
    const classes = useStyles();
    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof Data>('name');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [clicked, setClicked] = React.useState(100);

    const handleIconClick = (id: React.SetStateAction<number>) => ()=>{
        setClicked(id);
    };


    const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Data) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    /*TODO：not adding favorite at the same time*/

    return (
        <div className={classes.root}>
                <TableContainer>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        size={'medium'}
                        aria-label="enhanced table"
                    >
                        <EnhancedTableHead
                            classes={classes}
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {stableSort(rows, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            tabIndex={-1}
                                            key={row.name}
                                        > <TableCell style={{
                                            paddingLeft: 50,
                                        }}>
                                        </TableCell>
                                            <TableCell component="th" id={labelId} scope="row" padding="none">
                                                {row.name}
                                            </TableCell>
                                            <TableCell align="left">{row.coursename}</TableCell>
                                            <TableCell align="right">{row.ratings}</TableCell>
                                            <TableCell align="right">{row.useful}</TableCell>
                                            <TableCell align="right">{row.easy}</TableCell>
                                            <TableCell align="right">{row.liked}</TableCell>
                                            <TableCell>
                                                <Tooltip title="Add to Shortlist" enterDelay={300} leaveDelay={100}>
                                                    <IconButton onClick={handleIconClick(101)}>
                                                        {clicked ===100 ? <FavoriteBorderOutlinedIcon color="action"/> : <FavoriteOutlinedIcon color="secondary"/> }
                                                    </IconButton>
                                                </Tooltip>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: (53) * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
        </div>
    );
}