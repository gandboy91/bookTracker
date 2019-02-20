import {nbsp, NBSP, RETURN_ARROW, RIGHT_ARROW} from "./chars";

export const TABS = [
    {
        tab: 'toread',
        title: 'To read'
    },
    {
        tab: 'inprogress',
        title: 'In progress'
    },
    {
        tab: 'done',
        title: 'Done'
    },
];

export const TAB_TO_ACTION = new Map([
    ['toread', {
        title: `start${NBSP}reading${NBSP}${RIGHT_ARROW}`,
        destination: 'inprogress'
    }],
    ['inprogress', {
        title: `finish${NBSP}reading${NBSP}${RIGHT_ARROW}`,
        destination: 'done'
    }],
    ['done', {
        title: `return${NBSP}in${NBSP}«to${NBSP}read»${NBSP}${RETURN_ARROW}`,
        destination: 'toread'
    }],
])

export const STORAGE_KEY = 'trackerState';