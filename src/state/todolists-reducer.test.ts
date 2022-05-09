import {
    addTodoListAC, changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC,
    todoListReducer
} from './todolists-reducer';
import {v1} from 'uuid';
import {TodoListType} from "../AppWithReducer";


let todolistId1: string
let todolistId2: string
let startState: Array<TodoListType>

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();

    startState = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]
})

test('correct todoList should be removed', () => {
    const endState = todoListReducer(startState, removeTodoListAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
})

test('new todoList should be added', () => {
    const endState = todoListReducer(startState, addTodoListAC('New TodoList'))

    expect(endState.length).toBe(3);
})

test('correct todoList title value should be changed', () => {
    const endState = todoListReducer(startState, changeTodoListTitleAC('qwe', todolistId1))

    expect(endState[0].title).toBe('qwe');
})

test('correct todoList filter value should be changed', () => {
    const endState = todoListReducer(startState, changeTodoListFilterAC('completed', todolistId2))

    expect(endState[1].filter).toBe('completed');
})
