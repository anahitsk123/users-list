import React, { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { fetchUsers } from '../store/userActions';
import { Address } from '../models/userModels';
import { rowsPerPage } from '../utils/constats'

import { Paper, Container, CardHeader, Table, TableBody, TableCell, TableContainer } from '@mui/material';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

interface Column {
    id: string;
    label: string;
    minWidth?: number;
    maxWidth?: number;
    align?: 'left';
    format?: (value: Address) => string;
}

const columns: readonly Column[] = [
    { id: 'username', label: 'Username'},
    { id: 'name', label: 'Full Name'},
    { id: 'email', label: 'Email' },
    {
        id: 'address',
        label: 'Address',
        maxWidth: 50,
        format: (address) => {
            const { street, suite,  city, zipcode } = address;
            return `${street}, ${suite}, ${city}, ${zipcode}`
        }
    }
];

function createData (
    username: string,
    name: string,
    email: string,
    address: Address,
): any {
    return { username, name, email, address };
}

const Users = () => {
    const dispatch = useAppDispatch();
    const allUsers = useAppSelector(state => state.users.allUsers);
    const rows = allUsers.map((user) =>
        createData(user.username, user.name, user.name, user.address));
    const [page, setPage] = useState(0);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [allUsers, dispatch]);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    return (
        <Container>
            <CardHeader title='User List' />
            <Paper sx={{ overflow: 'hidden' }}>
                <TableContainer>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{
                                            minWidth: column.minWidth,
                                            width: column.maxWidth,
                                            fontWeight: 'bolder'
                                        }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                const title = column.format ? column.format(value) : value;
                                                return (
                                                    <TableCell
                                                        key={column.id}
                                                        align={column.align}
                                                        className={`Row-${column.id}`}
                                                        title={title}
                                                    >
                                                        {title}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    rowsPerPageOptions={[rowsPerPage]}
                    onPageChange={handleChangePage}
                />
            </Paper>
        </Container>
    );
};
export default Users;
