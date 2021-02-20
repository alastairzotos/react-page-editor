import deepEqual from 'deep-equal';
import { AnyAction } from 'redux';

import { contentEditorActions } from '../actions';

import { ContentEditorInnerState, contentEditorReducerCore, INITIAL_STATE } from './coreReducer';

const maxUndo = 30;

const ignoreActionsInUndoStack = [
    contentEditorActions.undo,
    contentEditorActions.dragItem,
    contentEditorActions.startDroppingItem
];

const shouldIgnoreActionForUndoStack = (action: AnyAction) =>
    !!ignoreActionsInUndoStack.find(act => act.match(action));

export const contentEditorUndoReducer = (state = INITIAL_STATE, action: AnyAction): ContentEditorInnerState => {
    const updatedState = contentEditorReducerCore(state, action);
    let undoStack = updatedState.undoStack;

    if (!shouldIgnoreActionForUndoStack(action)) {
        const hasContentChanged = !deepEqual(state.content, updatedState.content, { strict: true });

        if (hasContentChanged) {
            undoStack = [
                ...undoStack,
                updatedState.content
            ];

            if (undoStack.length > maxUndo) {
                undoStack = undoStack.slice(1);
            }
        }
    }

    return {
        ...updatedState,
        undoStack: undoStack.filter(content => !!content)
    };
};

