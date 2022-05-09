import React, {useCallback} from "react"
import Checkbox from "@material-ui/core/Checkbox";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@material-ui/core/IconButton";
import {Delete} from "@material-ui/icons";
import {TaskType} from "../AppWithRedux";

export type TaskPropsType = {
    task: TaskType
    changeTaskStatus: (taskId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string) => void
    removeTask: (taskId: string) => void
}

export const Task = React.memo(({task, changeTaskStatus, changeTaskTitle, removeTask}: TaskPropsType ) => {

    const changeTitle = useCallback((title: string) => changeTaskTitle(task.id, title), [changeTaskTitle, task.id])
    const changeStatus = useCallback(() => changeTaskStatus(task.id), [changeTaskStatus, task.id])
    const deleteTask = useCallback(() => removeTask(task.id), [removeTask, task.id])

    return (
        <li key={task.id} className={task.isDone ? "is-done" : ""}>
            <Checkbox
                color={"primary"}
                checked={task.isDone}
                onChange={changeStatus}
            />

            <EditableSpan title={task.title} changeTitle={changeTitle}/>

            <IconButton onClick={deleteTask}>
                <Delete/>
            </IconButton>
        </li>
    )
})

