import React from 'react';
import { Story, Meta } from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {EditableSpan, EditableSpanPropsType} from "./EditableSpan";

export default {
    title: 'Example/EditableSpan',
    component: EditableSpan,
    argTypes: {
        changeTitle: {
            description: 'title has been changed'
        },
        title: {
            defaultValue: 'HTML',
            description: 'Start value Editable Span'
        }
    }
} as Meta;

const Template: Story<EditableSpanPropsType> = (args) => <EditableSpan {...args} />;

export const EditableSpanExample = Template.bind({});
EditableSpanExample.args = {
    changeTitle: action('title has been changed')
};



