import { traverse } from '@bitmetro/cms-common';
import { AnyAction } from 'redux';

import { contentEditorActions } from '../actions';
import { contentIndex } from '../utils';

import { INITIAL_STATE } from './coreReducer';
import { contentEditorUndoReducer } from './undoReducer';

const updateIndexOn = [
    contentEditorActions.setContent,
    contentEditorActions.dropItem,
    contentEditorActions.deleteSelectedItem,
    contentEditorActions.undo
];

const shouldUpdateIndex = (action: AnyAction) =>
    updateIndexOn.find(act => act.match(action));

export const optimisingReducer = (state = INITIAL_STATE, action: AnyAction) => {
    const newState = contentEditorUndoReducer(state, action);

    if (shouldUpdateIndex(action)) {
        traverse(newState.content, item => {
            contentIndex[item.id] = item;
        });

    } else if (contentEditorActions.updateSelectedItem.match(action)) {
        contentIndex[newState.selectedItem.id] = newState.selectedItem;
    }

    return newState;
};
