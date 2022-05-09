import React, {useReducer} from "react"
import "./App.css"
import {TodoList} from "./components/TodoList"
import {v1} from "uuid"
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
    changeTodoListTitleAC, removeTodoListAC,
    todoListReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";

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

function AppWithReducer() {
    const todoListID_1 = v1()
    const todoListID_2 = v1()

    const [todoLists, dispatchToTodoLists] = useReducer(todoListReducer, [
        {id: todoListID_1, title: 'What to learn', filter: 'all'},
        {id: todoListID_2, title: 'What to buy', filter: 'all'}
    ])

    const [tasks, dispatchToTasks] = useReducer(tasksReducer, {
        [todoListID_1]: [
            {id: v1(), title: 'HTML', isDone: true},
            {id: v1(), title: 'CSS', isDone: true},
            {id: v1(), title: 'React', isDone: false}
        ],
        [todoListID_2]: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Bread', isDone: true},
            {id: v1(), title: 'React', isDone: false}
        ]
    })

    function removeTask (taskId: string, todoListID: string) {
        dispatchToTasks(removeTaskAC(taskId, todoListID))
    }
    function addTask (title: string, todoListID: string) {
        dispatchToTasks(addTaskAC(title, todoListID))
    }

    function changeTaskStatus (taskId: string, todoListID: string) {
        dispatchToTasks(changeTaskStatusAC(taskId, todoListID))
    }

    function changeTaskTitle (taskId: string, title: string, todoListID: string) {
        dispatchToTasks(changeTaskTitleAC(taskId, title, todoListID ))
    }

    function changeTodoListFilter (newFilterValue: FilterValueType, todoListID: string) {
        dispatchToTodoLists(changeTodoListFilterAC(newFilterValue, todoListID))
    }
    function removeTodoList (todoListID: string) {
        let action = removeTodoListAC(todoListID)
        dispatchToTodoLists(action)
        dispatchToTasks(action)
    }
    function addTodoList (title: string) {
        let action = addTodoListAC(title)
        dispatchToTasks(action)
        dispatchToTodoLists(action)
    }
    function changeTodoListTitle (title: string, todoListID: string) {
        dispatchToTodoLists(changeTodoListTitleAC(title, todoListID))
    }

    function getTasksForTodoList (todoList: TodoListType): Array<TaskType> {
        switch (todoList.filter) {
            case 'active':
                return tasks[todoList.id].filter(t => !t.isDone)
            case 'completed':
                return tasks[todoList.id].filter(t => t.isDone)
            default:
                return tasks[todoList.id]
        }
    }

    const todoListComponents = todoLists.map(tl =>
        <Grid item key={tl.id}>
            <Paper elevation={6} style={{padding: "20px"}}>
                <TodoList
                    id={tl.id}
                    title={tl.title}
                    tasks={getTasksForTodoList(tl)}
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
    )

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

export default AppWithReducer

