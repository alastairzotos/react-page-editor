import { createSelector } from 'reselect';

import { ContentEditorState } from '../reducers';

export const getContentEditorRootState = (state: any): ContentEditorState =>
    state as ContentEditorState;

export const getCurrentNamespace = createSelector(
    getContentEditorRootState,
    state => !!state && state.currentNs
);

export const getContentEditorState = createSelector(
    getContentEditorRootState,
    state => !!state && state.editors[state.currentNs]
);

export const getContent = createSelector(
    getContentEditorState,
    state => !!state && state.content
);

export const getSelectedItem = createSelector(
    getContentEditorState,
    state => !!state && state.selectedItem
);

export const isResizingColumn = createSelector(
    getContentEditorState,
    state => !!state && state.resizingColumn
);

export const getDraggingItem = createSelector(
    getContentEditorState,
    state => !!state && state.draggingItem
);

export const getDropTarget = createSelector(
    getContentEditorState,
    state => !!state && state.dropTarget
);

export const isDroppingItem = createSelector(
    getContentEditorState,
    state => !!state && state.droppingItem
);

export const addItemMenuIsOpen = createSelector(
    getContentEditorState,
    state => !!state && state.addItemMenuOpen
);
