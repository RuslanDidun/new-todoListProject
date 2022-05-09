import React, {useCallback} from "react"
import "./App.css"
import {TodoList} from "./components/TodoList"
import {AddItemForm} from "./components/AddItemForm"
import {AppBar} from "@material-ui/core"
import IconButton from "@material-ui/core/IconButton"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import Toolbar from "@material-ui/core/Toolbar"
import {Menu} from "@material-ui/icons"
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"
import {
    addTodoListAC, changeTodoListFilterAC,
    changeTodoListTitleAC, removeTodoListAC
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValueType = 'all' | 'active' | 'completed'

export type TodoListType = {
    id: string
    title: string
    filter: FilterValueType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {
    let todoLists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todolists)
    let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    let dispatch = useDispatch()

    const removeTask = useCallback((taskId: string, todoListID: string) => {
        dispatch(removeTaskAC(taskId, todoListID))
    }, [dispatch])

    const addTask = useCallback( (title: string, todoListID: string) => {
        dispatch(addTaskAC(title, todoListID))
    }, [dispatch])

    const changeTaskStatus = useCallback( (taskId: string, todoListID: string) => {
        dispatch(changeTaskStatusAC(taskId, todoListID))
    }, [dispatch])

    const changeTaskTitle = useCallback( (taskId: string, title: string, todoListID: string) => {
        dispatch(changeTaskTitleAC(taskId, title, todoListID ))
    }, [dispatch])

    const changeTodoListFilter = useCallback( (newFilterValue: FilterValueType, todoListID: string) => {
        dispatch(changeTodoListFilterAC(newFilterValue, todoListID))
    }, [dispatch])

    const removeTodoList = useCallback( (todoListID: string) => {
        dispatch(removeTodoListAC(todoListID))
    }, [dispatch])

    const addTodoList = useCallback( (title: string) => {
        dispatch(addTodoListAC(title))
    }, [dispatch])

    const changeTodoListTitle = useCallback( (title: string, todoListID: string) => {
        dispatch(changeTodoListTitleAC(title, todoListID))
    }, [dispatch])

    const todoListComponents = todoLists.map(tl => {
        return <Grid item key={tl.id}>
            <Paper elevation={6} style={{padding: "20px"}}>
                <TodoList
                    id={tl.id}
                    title={tl.title}
                    tasks={tasks[tl.id]}
                    changeTodoListFilter={changeTodoListFilter}
                    removeTask={removeTask}
                    addTask={addTask}
                    filter={tl.filter}
                    changeTaskStatus={changeTaskStatus}
                    removeTodoList={removeTodoList}
                    changeTaskTitle={changeTaskTitle}
                    changeTodoListTitle={changeTodoListTitle}
                />
            </Paper>
        </Grid>
    })

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar style={{justifyContent: "space-between"}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        TodoLists
                    </Typography>
                    <Button variant={"outlined"} color="inherit">Login</Button>
                </Toolbar>
            </AppBar>

            <Container fixed>
                <Grid container style={{padding: "20px 0px"}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>

                <Grid container spacing={5}>
                    {todoListComponents}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux

