import React, {useState, useEffect, SyntheticEvent} from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { fetchUsers } from '../store/userActions';
import { Address } from '../models/userModels';
import { rowsPerPage } from '../utils/constats';

import {
    Paper,
    Container,
    CardHeader,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow } from '@mui/material';

interface Column {
    id: string;
    label: string;
    minWidth?: number;
    maxWidth?: number;
    align?: 'left';
    hidden?: boolean;
    format?: (value: Address) => string;
}

const columns: readonly Column[] = [
    { id: 'id', label: 'id', hidden: true },
    { id: 'username', label: 'Username'},
    { id: 'email', label: 'Email' },
    { id: 'name', label: 'Full Name'},
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

const createData =  (
    id: number,
    username: string,
    name: string,
    email: string,
    address: Address,
): any => {
    return { username, name, email, address, id };
}

const Users = () => {
    const dispatch = useAppDispatch();
    const allUsers = useAppSelector(state => state.users.allUsers);
    const navigate = useNavigate();

    const rows = allUsers.map((user) =>
        createData(user.id, user.username, user.name, user.name, user.address));
    const [page, setPage] = useState(0);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [allUsers, dispatch]);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleClick = (event: SyntheticEvent, userId: number) => {
        navigate(`/users/${userId}/posts`);
    }

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
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            tabIndex={-1}
                                            key={row.id}
                                            onClick={(event) => handleClick(event, row.id)}
                                        >
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
