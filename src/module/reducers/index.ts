import { AnyAction } from '@reduxjs/toolkit';

import { contentEditorActions } from '../actions';

import { ContentEditorInnerState } from './coreReducer';
import { optimisingReducer } from './optimizingReducer';

export const CONTENT_EDITOR_STATE_NAME = 'cmsContentEditor';

export type ContentEditorState = {
    currentNs: string;
    editors: { [ns: string]: ContentEditorInnerState }
};

const INITIAL_STATES: ContentEditorState = {
    currentNs: null,
    editors: {}
};

export const contentEditorReducer = (state = INITIAL_STATES, action: AnyAction): ContentEditorState => {
    if (contentEditorActions.setNamespace.match(action)) {
        return {
            ...state,
            currentNs: action.payload
        };
    }

    if (!state.currentNs) {
        return state;
    }

    return {
        ...state,
        editors: {
            ...state.editors,
            [state.currentNs]: optimisingReducer(state.editors[state.currentNs], action)
        }
    };
};
