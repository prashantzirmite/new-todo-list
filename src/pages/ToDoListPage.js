import React, { useState } from 'react'
import { useEffect } from 'react';
import './pageStyles.css';
import { Bars } from 'react-loader-spinner';
import AddTaskComponent from '../components/AddTaskComponent';
import { Input } from 'semantic-ui-react';
import _ from 'lodash';


function ToDoListPage(props) {
    const [isAddingTask, setIsAddingtask] = useState(false);
    const [displayTasksOfUser, setDisplayTasksOfUser] = useState(true);
    const navigate = props.navigate;
    useEffect(() => {
        if (!props.isLoggedIn) {
            navigate('/signin');
        }
    })
    const [allTasks, setAllTasks] = useState([]);
    useEffect(() => {
        localStorage.setItem("Tasks", JSON.stringify(allTasks));
    }, [allTasks])

    useEffect(() => {
        const tasks = JSON.parse(localStorage.getItem('Tasks'));
        if (tasks) {
            setAllTasks(tasks);
        }
    }, []);

    let isLodding = props.isLodding;
    let isLoggedIn = props.isLoggedIn;

    const handleSignOut = () => {
        navigate("/signin");
        props.setIsloggedIn(false);
    }
    const handleAddTask = () => {
        setIsAddingtask(true);
    }
    const handleShowUserTask = () => {
        setDisplayTasksOfUser(true);
    }
    const taskStatusChange = (e, { task }) => {
        let tempAllTasks = JSON.parse(localStorage.getItem('Tasks'));
        let index = _.findIndex(tempAllTasks, ["Task", task.Task]);
        if (index > -1) {
            if (tempAllTasks[index].Status === "Pending")
                tempAllTasks[index].Status = "Complete"
            else
                tempAllTasks[index].Status = "Pending"
        }
        setAllTasks(tempAllTasks);
    }
    const taskDelete = (e, { task }) => {
        let tempAllTasks = JSON.parse(localStorage.getItem('Tasks'));
        let index = _.findIndex(tempAllTasks, ["Task", task.Task]);
        if(index>-1){
            tempAllTasks.splice(index,1);
        }
        setAllTasks(tempAllTasks);
    }
    const showUserTasks = () => {
        var currentUser = JSON.parse(localStorage.getItem("CurrentUser"));
        var tasks = allTasks; //JSON.parse(localStorage.getItem("Tasks"));
        return (
            <div className='out1'>
                {tasks && tasks.length > 0 ?
                    <table className='table'>
                        <thead>
                            <tr><th>Task Name</th>
                                <th>Task Details</th>
                                <th>Status</th>
                                <th>Change Status</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                tasks.map(task => {
                                    if (currentUser.Email === task.User) {
                                        return (
                                            <tr>
                                                <td> {task.Task} </td>
                                                <td>{task.Details}</td>
                                                <td><input id='st1' type='text' disabled value={task.Status} /></td>
                                                <td><Input id='ch' type='button' value='Change Status' onClick={(e) => { taskStatusChange(e, { task }) }} /></td>
                                                <td><Input id='del' type='button' value='Delete' onClick={(e) => { taskDelete(e, { task }) }} /></td>
                                            </tr>
                                        )
                                    }else{
                                        return <></>
                                    }
                                })
                            }
                        </tbody>
                    </table> :
                    <h1> No tasks to show..!</h1>}
            </div>
        )
        // }

    }
    return (
        <React.Fragment>
            {isLodding && <Bars
                height="30%"
                width="30%"
                color="#4fa94d"
                ariaLabel="bars-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={isLodding}
            />
            }
            {isLoggedIn && <div>
                <div className="container">
                    <div className="jumbotron" style={{ backgroundColor: "#ccfff5" }}>
                        <h1 className="custom-center myFont1">User Desk </h1>
                        <div className='align-center-grp'>
                            <span style={{ "font-size": "20px", paddingLeft: "25px" }} id="un"></span>
                            <button className="btn btn-success" onClick={handleSignOut}>SignOut</button>
                        </div>
                        <h4 className="custom-center myFont1">Task List </h4>
                        <div className='align-center-grp'>
                            <button className="btn btn-success" onClick={handleAddTask}>Add Task</button>
                            <button className="btn btn-success" onClick={handleShowUserTask}>Show Task/s</button>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="jumbotron" style={{ backgroundColor: "#ffccff" }}>
                        {displayTasksOfUser && <div id="user-tasks">
                            {showUserTasks()}
                        </div>
                        }
                    </div>
                </div>
            </div>
            }
            {isAddingTask && <AddTaskComponent
                isAddingTask={isAddingTask}
                setIsAddingtask={setIsAddingtask}
                setAllTasks={setAllTasks}
                allTasks={allTasks} />}
        </React.Fragment>
    )
}

export default ToDoListPage