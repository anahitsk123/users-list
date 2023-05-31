import React, {useState, useEffect, SyntheticEvent} from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import {fetchUserPosts, postActions, removePost} from '../store/postActions';

import {Paper, Container, CardHeader, IconButton} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

import {DataGrid, GridColDef, GridRenderCellParams, GridToolbar} from '@mui/x-data-grid';

const columns: GridColDef[] = [
    {
        field: 'title',
        headerName: 'Title',
        width: 400,
        editable: false,
    },
    {
        field: 'body',
        headerName: 'Body',
        editable: false,
        cellClassName: 'Cell-body',
        filterable: false,
    },
    {
        field: 'id',
        headerName: '',
        width: 90,
        renderCell:
            (params:GridRenderCellParams) =>
                <IconButton>
                    <ClearIcon />
                </IconButton>
    },
];

const Posts = () => {
    const dispatch = useAppDispatch();
    const allPosts = useAppSelector(state => state.posts.allPosts);

    let { id } = useParams();

    useEffect(() => {
        // @ts-ignore
        dispatch(fetchUserPosts(id * 1));
    }, [allPosts, dispatch, id]);

    const removeRowItem = (paramas: any) => {
        // @ts-ignore
        console.log('papapap', paramas)
        if(paramas?.field === 'id') {
            dispatch(removePost(paramas.id * 1));
        }
    }


    return (
        <Container>
            <CardHeader title='Current User Posts' />
            <Paper sx={{ overflow: 'hidden' }}>
                <DataGrid
                    rows={allPosts}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 5,
                            },
                        },
                    }}
                    onCellClick={(params) => removeRowItem(params)}
                    disableColumnFilter
                    disableColumnMenu
                    pageSizeOptions={[5]}
                    disableRowSelectionOnClick
                    disableVirtualization
                    disableColumnSelector
                    disableDensitySelector
                    slots={{ toolbar: GridToolbar }}
                    slotProps={{
                        toolbar: {
                            showQuickFilter: true,
                            quickFilterProps: { debounceMs: 500 },
                        },
                    }}
                />
            </Paper>
        </Container>
    );
};
export default Posts;
