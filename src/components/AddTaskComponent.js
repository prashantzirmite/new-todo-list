import React, { useState } from 'react'
import { Modal } from 'semantic-ui-react'

function AddTaskComponent(props) {

    const handleAddTaskClose = () => {
        props.setIsAddingtask(false);
    }
    const handleAddTaskOpen = () => {

    }
    
    const handleAddTask = () => {
        var currentUser = JSON.parse(localStorage.getItem("CurrentUser"));
        var taskTemp = JSON.parse(localStorage.getItem("Tasks"))
        var taskObj = null;
        if (currentUser && taskDescription && taskName) {
            taskObj = { User: currentUser.Email, Task: taskName, Details: taskDescription, Status: 'Pending' }
        }
        if (taskTemp == null)
            taskTemp = [];
        if (taskObj) {
            taskTemp.push(taskObj);
            handleAddTaskClose();
            alert("Task Added in todo List");
        }
        props.setAllTasks(taskTemp);
    }
    const [taskName, setTaskName] = useState();
    const handleTaskName = (e) => {
        if (e && e.target && e.target.value)
            setTaskName(e.target.value)
    }
    const [taskDescription, setTaskDescription] = useState();
    const handleTaskDescription = (e) => {
        if (e && e.target && e.target.value)
            setTaskDescription(e.target.value)
    }
    let isAddingTask = props.isAddingTask;
    return (
        <React.Fragment>
            <Modal
                onClose={handleAddTaskClose}
                onOpen={handleAddTaskOpen}
                open={isAddingTask}
                mountNode={document.getElementById("root")}
                centered
                size='tiny'
            >
                <Modal.Header> <p class="myFont1" style={{ textAlign: "center", fontSize: "2vw" }}>Register Your Task </p></Modal.Header>
                <Modal.Content>
                    <div class="container">
                        <div class="jumbotron" style={{ "background-color": "#ffccff", padding: "10px" }}>
                            <label style={{ fontSize: "20px" }}>Task : </label>
                            <input id="taskname" type="text" class="form-control" onChange={handleTaskName} />
                            <label style={{ fontSize: "20px" }}>Task Description : </label>
                            <textarea id="taskdata" style={{ width: "100%" }} onChange={handleTaskDescription}></textarea>

                        </div>
                    </div>
                </Modal.Content>
                <Modal.Actions>
                    <div className='align-center-grp'>
                        <button id="adtsk" type="button" class="btn btn-info btn-lg" onClick={handleAddTask}>Add Task</button>
                        <button id="shtsk" type="button" class="btn btn-info btn-lg" onClick={handleAddTaskClose}>Cancel</button>
                    </div>
                </Modal.Actions>
            </Modal>
        </React.Fragment>
    )
}

export default AddTaskComponent