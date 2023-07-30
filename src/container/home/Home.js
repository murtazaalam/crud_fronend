import React, {useEffect} from 'react';
import { styled } from '@mui/material/styles';
import { makeStyles } from "@mui/styles";
import Header from "../../component/header/Header";
import Footer from "../../component/footer/Footer";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { useDispatch, useSelector } from "react-redux";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import TablePagination from '@mui/material/TablePagination';
import {CSVLink} from 'react-csv';
import { getUsers } from '../../redux/users/usersSlice';

const headers = ['User Id', 'Name', 'Email', 'Phone', 'Gender', 'Status'];

const useStyle = makeStyles({
    useList: {
        padding: '24px',
        height: '1000px'
    },
    tableHeading: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '12px'
    },
    btnExport: {
        height: '32px',
        width: '100px',
        background: 'white',
        border: '1px solid orange',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '16px',
        borderRadius: '5px',
    },
    title: {
        color: 'white'
    },
    cssInputLabel: {
        color: "#d3d3d3"
    }
})

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
}));

const Home = () => {
    const classes = useStyle();
    const dispatch = useDispatch();
    const [page, setPage] = React.useState(0);
    const [sortBy, setSortBy] = React.useState("DESC");
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const {
        userData,
        totalCount,
    } = useSelector(state => state.user)

    const handleChangePage = (event, newPage) => {
        console.log(event, newPage);
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
        dispatch(getUsers({page: page+1, size: rowsPerPage}));
    },[page, rowsPerPage])

    const sortData = (sortOn, sortBy) => {
        dispatch(getUsers({
            page: page+1,
            size: rowsPerPage,
            sort_on: sortOn,
            sort_by: sortBy
        }));
        setSortBy(sortBy === "DESC" ? "ASC" : "DESC")
    }

    const csvData = userData?.records.map((item) => [
        item.user_id, 
        item.user_name, 
        item.user_email, 
        item.user_phone, 
        item.user_gender, 
        item.user_status
    ]);

    return (
        <div>
            <Header />
            <div className={classes.useList}>
                <div className={classes.tableHeading}>
                    <h2 className={classes.title}>Registered user list</h2>
                    <CSVLink
                        data={[...csvData]}
                        headers={headers}
                        style={{
                            color: '#fff'
                        }}
                        filename={"user_data.csv"}>
                        Export to CSV
                    </CSVLink>
                </div>
                <div>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="customized table">
                            <TableHead>
                            <TableRow>
                                <StyledTableCell align="left">Sl No.</StyledTableCell>
                                <StyledTableCell align="left"
                                    onClick={() => sortData("user_id", sortBy)}
                                    sx={{
                                        position: 'relative'
                                    }}>
                                    User Id <SyncAltIcon 
                                            fontSize="small"
                                            sx={{
                                                top: 18,
                                                position: 'absolute',
                                                rotate: '90deg'
                                            }}/>
                                </StyledTableCell>
                                <StyledTableCell 
                                    onClick={() => sortData("user_name", sortBy)}
                                    align="left" 
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center'
                                        }}>
                                    Name <SyncAltIcon 
                                            fontSize="small"
                                            sx={{
                                                rotate: '90deg'
                                        }} />
                                </StyledTableCell>
                                <StyledTableCell 
                                    align="left"
                                    sx={{
                                        position: 'relative'
                                    }}
                                    onClick={() => sortData("user_email", sortBy)}>
                                    Email <SyncAltIcon 
                                            fontSize="small"
                                            sx={{
                                                top: 18,
                                                position: 'absolute',
                                                rotate: '90deg'
                                            }} />
                                </StyledTableCell>
                                <StyledTableCell align="left">Phone</StyledTableCell>
                                <StyledTableCell align="left">Gender</StyledTableCell>
                                <StyledTableCell align="left">Status</StyledTableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {userData ? userData?.records?.map((row, index) => (
                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                    <TableCell align="left">{index+1}</TableCell>
                                    <TableCell align="left">{row.user_id}</TableCell>
                                    <TableCell align="left">
                                        {row.user_name}
                                    </TableCell>
                                    <TableCell align="left">
                                        {row.user_email}
                                    </TableCell>
                                    <TableCell align="left">
                                        {row.user_phone}
                                    </TableCell>
                                    <TableCell align="left">
                                        {row.user_gender}
                                    </TableCell>
                                    <TableCell align="left">
                                        {row.user_status}
                                    </TableCell>
                                </TableRow>))
                                :
                                <TableRow>
                                    <TableCell colSpan={6}>
                                        No Data Found
                                    </TableCell>
                                </TableRow>
                            }
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        sx={{background: '#fff'}}
                        count={totalCount}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Home;