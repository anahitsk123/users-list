import { createBrowserRouter } from 'react-router-dom';

import Users from './pages/Users';
// import { Posts } from './pages/Post';


export const routes = createBrowserRouter([
    { path: '/', element: <Users /> },
    { path: '/users', element: <Users /> },
    // { path: '/users/:id/posts', element: <Posts /> },
]);
