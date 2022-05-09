import {v1} from "uuid";
import {AddTodoListAT, RemoveTodoListAT} from "./todolists-reducer";
import {TasksStateType, TaskType} from "../AppWithReducer";

type RemoveTaskType = {
    type: 'DELETE-TASK'
    taskId: string
    todoListId: string
}

type AddTaskType = {
    type: 'ADD-TASK'
    title: string
    todoListId: string
}

type changeTaskStatusType = {
    type: 'CHANGE-TASK-STATUS'
    taskId: string
    todoListId: string
}

export type changeTaskTitleType = {
    type: 'CHANGE-TASK-TITLE'
    taskId: string
    title: string
    todoListID: string
}

type ActionsType = RemoveTaskType | AddTaskType | changeTaskStatusType | changeTaskTitleType | RemoveTodoListAT | AddTodoListAT

export const todoListID_1 = v1()
export const todoListID_2 = v1()

let initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case "DELETE-TASK":
            state[action.todoListId] = state[action.todoListId].filter(t => t.id !== action.taskId)
            return {...state}
        case "ADD-TASK":
            let newTask: TaskType = {id: v1(), title: action.title, isDone: false}
            return {
                ...state,
                [action.todoListId]: [newTask, ...state[action.todoListId]]
            }
        case "CHANGE-TASK-STATUS":
            state[action.todoListId] = state[action.todoListId].map(t => t.id === action.taskId ? {...t, isDone: !t.isDone} : t)
            return {...state}
        case "CHANGE-TASK-TITLE":
            state[action.todoListID] = state[action.todoListID].map(t => t.id === action.taskId ? {...t, title: action.title} : t)
            return {...state}
        case "REMOVE-TODOLIST":
            delete state[action.todoListID]
            return {...state}
        case "ADD-TODOLIST":
            return {...state, [action.todoListID]: []}
        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todoListId: string): RemoveTaskType => {
    return {
        type: 'DELETE-TASK',
        taskId,
        todoListId
    }
}

export const addTaskAC = (title: string, todoListId: string): AddTaskType => {
    return {
        type: 'ADD-TASK',
        title,
        todoListId
    }
}

export const changeTaskStatusAC = (taskId: string, todoListId: string): changeTaskStatusType => {
    return {
        type: 'CHANGE-TASK-STATUS',
        taskId,
        todoListId
    }
}

export const changeTaskTitleAC = (taskId: string, title: string, todoListID: string): changeTaskTitleType => {
    return {
        type: 'CHANGE-TASK-TITLE',
        taskId,
        title,
        todoListID
    }
}