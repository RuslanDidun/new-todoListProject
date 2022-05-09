import React from 'react';
import { Story, Meta } from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {Task, TaskPropsType} from "./Task";

export default {
    title: 'Example/Task',
    component: Task,
} as Meta;

const Template: Story<TaskPropsType> = (args) => <Task {...args} />;

export const TaskIsDoneExample = Template.bind({});
TaskIsDoneExample.args = {
    task: {id: '1', isDone: true, title: 'CSS'},
    changeTaskStatus: action('task status has been changed'),
    changeTaskTitle: action('task title has been changed'),
    removeTask: action('task has been removed')
};

export const TaskIsNotDoneExample = Template.bind({});
TaskIsNotDoneExample.args = {
    task: {id: '1', isDone: false, title: 'JS'},
    changeTaskStatus: action('task status has been changed'),
    changeTaskTitle: action('task title has been changed'),
    removeTask: action('task has been removed')
};

