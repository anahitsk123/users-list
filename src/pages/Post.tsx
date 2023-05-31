import React, { useState, useEffect } from 'react'
import { useAppDispatch,useAppSelector } from '../hooks/reduxHooks';
import { fetchUsers } from '../store/userActions';


const Posts = () => {
    const [ userId, setUserId ] = useState();
    const dispatch = useAppDispatch();
    const allUsers = useAppSelector(state => state.users.allUsers);
    // const clickHandler = () => {
    //     dispatch(fetchUsers())
    // }
    // // const searchHandler=()=>{
    // //     dispatch(fetchParticularTodo(todo_id))
    // // }
    useEffect(() => {
        dispatch(fetchUsers());
    }, [allUsers, dispatch]);

    return (
        <>
            <div>
                <label>Enter the todo id : </label>
                {/*<input onChange={(event)=>{setTodo_id(parseInt(event.target.value))}} type="number"></input>*/}
                {/*<button onClick={searchHandler}> Find </button>*/}
                <div>
                    <h3>Particular TODO </h3>
                    {
                        // checkparticularTodo() &&
                        // (<div className="todo-container" key={particularTodo.id}>
                        //     <p className="todo-child1">{particularTodo.id}</p>
                        //     <p className="todo-child2">{particularTodo.userId}</p>
                        //     <p className="todo-child3">{particularTodo.title}</p>
                        //     <p className="todo-child4">{particularTodo.completed}</p>
                        // </div>)
                    }

                </div>
            </div>
            <div>
                {/*<button onClick={clickHandler}>All Todos</button>*/}
                <div>
                    <h3>TODO LIST :</h3>
                    <div className="todo-container">
                        <p className="todo-child1">ID</p>
                        <p className="todo-child2">USER ID</p>
                        <p className="todo-child3">TITLE</p>
                    </div>
                    {
                        allUsers.map((user)=>(
                            <div className="todo-container" key={user.id}>
                                <p className="todo-child1">{user.username}</p>
                                <p className="todo-child2">{user.name}</p>
                                {/*<p className="todo-child3">{user.address}</p>*/}
                            </div>
                        ))
                    }
                </div>
            </div>
        </>

    );
}
export default Posts;
