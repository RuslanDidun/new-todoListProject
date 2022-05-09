import React, {useCallback} from "react"
import {AddItemForm} from "./AddItemForm"
import {EditableSpan} from "./EditableSpan"
import {Button} from "@material-ui/core"
import {Delete} from "@material-ui/icons"
import IconButton from "@material-ui/core/IconButton"
import {FilterValueType, TaskType} from "../AppWithReducer";
import {Task} from "./Task";
type TodoListPropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    changeTodoListFilter: (newFilterValue: FilterValueType, todoListID: string) => void
    removeTask: (taskId: string, todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    filter: FilterValueType
    changeTaskStatus: (taskId: string, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
    changeTaskTitle: (taskId: string, title: string, todoListID: string) => void
    changeTodoListTitle: (title: string, todoListID: string) => void
}

export const TodoList = React.memo((props: TodoListPropsType) => {
    // let todoList = useSelector<AppRootStateType, TodoListType>(state => state.todolists.filter(t => t.id === props.id)[0])
    // let tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.id])

    // let dispatch = useDispatch()
    let tasksForTodoList = props.tasks

    if (props.filter === 'active') {
        tasksForTodoList = props.tasks.filter(t => !t.isDone)
    }
    if (props.filter === 'completed') {
        tasksForTodoList = props.tasks.filter(t => t.isDone)
    }

    const removeTask = useCallback((taskId: string) => props.removeTask(taskId, props.id), [props.removeTask, props.id])
    const changeTaskStatus = useCallback((taskId: string) => props.changeTaskStatus(taskId, props.id), [props.changeTaskStatus, props.id])
    const changeTaskTitle = useCallback((taskId: string, newTitle: string) => props.changeTaskTitle(taskId, newTitle, props.id), [props.changeTaskTitle, props.id])

    const tasks = tasksForTodoList.map(t => <Task task={t}
                                                  key={t.id}
                                                  removeTask={removeTask}
                                                  changeTaskStatus={changeTaskStatus}
                                                  changeTaskTitle={changeTaskTitle}
    /> )

    const setAllFilterValue = useCallback(() => props.changeTodoListFilter('all', props.id),[props.changeTodoListFilter, props.id])
    const setActiveFilterValue = useCallback(() => props.changeTodoListFilter('active', props.id),[props.changeTodoListFilter, props.id])
    const setCompletedFilterValue = useCallback(() => props.changeTodoListFilter('completed', props.id),[props.changeTodoListFilter, props.id])

    const removeTodoList = () => props.removeTodoList(props.id)

    const AddTask = useCallback((title: string) => props.addTask(title, props.id), [props.addTask, props.id])

    const changeTodoListTitle = useCallback( (title: string) => props.changeTodoListTitle(title, props.id), [props.changeTodoListTitle, props.id])

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                <IconButton onClick={removeTodoList}>
                    <Delete/>
                </IconButton>
            </h3>

            <AddItemForm addItem={AddTask}/>

            <ul style={{listStyle: "none", padding: "0px"}}>
                {tasks}
            </ul>

            <div>
                <Button
                    style={{marginRight: "5px"}}
                    size={"small"}
                    color={"primary"}
                    variant={props.filter === "all" ? "outlined" : "contained"}
                    onClick={setAllFilterValue}>All</Button>
                <Button
                    style={{marginRight: "5px"}}
                    size={"small"}
                    color={"primary"}
                    variant={props.filter === "active" ? "outlined" : "contained"}
                    onClick={setActiveFilterValue}>Active</Button>
                <Button
                    style={{marginRight: "5px"}}
                    size={"small"}
                    color={"primary"}
                    variant={props.filter === "completed" ? "outlined" : "contained"}
                    onClick={setCompletedFilterValue}>Completed</Button>
            </div>
        </div>
    )
})

