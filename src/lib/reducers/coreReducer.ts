import {
    addChild,
    addChildren,
    modifyItemById,
    PageItem,
    PREFAB_CLASS,
    removeChild
} from '@bitmetro/cms-common';
import { createReducer } from '@reduxjs/toolkit';

import { contentEditorActions } from '../actions';
import { DragInfo, DropTarget } from '../models';
import { createDropzone, DROPZONE_ID } from '../utils';

export interface ContentEditorInnerState {
    content: PageItem;
    selectedItem: PageItem;
    resizingColumn: boolean;
    draggingItem: DragInfo;
    dropTarget: DropTarget;
    droppingItem: boolean;
    addItemMenuOpen: boolean;
    undoStack: PageItem[];
}

export const INITIAL_STATE: ContentEditorInnerState = {
    content: null,
    selectedItem: null,
    resizingColumn: false,
    draggingItem: null,
    dropTarget: null,
    droppingItem: false,
    addItemMenuOpen: false,
    undoStack: null
};

export const contentEditorReducerCore = createReducer<ContentEditorInnerState>(INITIAL_STATE, builder =>
    builder
        .addCase(contentEditorActions.setContent, (state, action) => ({
            ...state,
            content: action.payload,
            undoStack: !state.undoStack ? [action.payload] : state.undoStack
        }))
        .addCase(contentEditorActions.selectItem, (state, action) => ({
            ...state,
            selectedItem: action.payload
        }))
        .addCase(contentEditorActions.setResizingColumn, (state, action) => ({
            ...state,
            resizingColumn: action.payload
        }))
        .addCase(contentEditorActions.updateSelectedItem, (state, action) => ({
            ...state,
            selectedItem: action.payload,
            content:
                modifyItemById(
                    state.content,
                    state.selectedItem.id,
                    item => ({
                        ...item,
                        ...action.payload
                    })
                )
        }))

        .addCase(contentEditorActions.dragItem, (state, action) => ({
            ...state,
            draggingItem: action.payload,
            dropTarget: !!action.payload ? state.dropTarget : null,
            addItemMenuOpen: false,
            content:
                action.payload
                    ? removeChild(
                        state.content,
                        action.payload.item.id
                    )
                    : state.content
        }))
        .addCase(contentEditorActions.setDropTarget, (state, action) => ({
            ...state,
            dropTarget: action.payload,
            content: addChild(
                removeChild(state.content, DROPZONE_ID),
                action.payload.container.id,
                createDropzone(state.draggingItem.height, action.payload.container.id),
                action.payload.index
            )
        }))
        .addCase(contentEditorActions.startDroppingItem, state => ({
            ...state,
            droppingItem: true
        }))
        .addCase(contentEditorActions.dropItem, state => ({
            ...state,
            draggingItem: null,
            dropTarget: null,
            droppingItem: false,
            content:
                state.draggingItem.item.itemType === PREFAB_CLASS
                    ? addChildren(
                        removeChild(state.content, DROPZONE_ID),
                        state.dropTarget.container.id,
                        state.draggingItem.item.children.map(child => ({
                            ...child,
                            parentId: state.dropTarget.container.id
                        })),
                        state.dropTarget.index
                    )
                    : addChild(
                        removeChild(state.content, DROPZONE_ID),
                        state.dropTarget.container.id,
                        {
                            ...state.draggingItem.item,
                            parentId: state.dropTarget.container.id
                        },
                        state.dropTarget.index
                    )
        }))

        .addCase(contentEditorActions.openAddItemMenu, (state, action) => ({
            ...state,
            addItemMenuOpen: action.payload
        }))

        .addCase(contentEditorActions.deleteSelectedItem, state => ({
            ...state,
            draggingItem: null,
            selectedItem: null,
            content: removeChild(state.content, state.selectedItem.id)
        }))
        .addCase(contentEditorActions.undo, state => ({
            ...state,
            content: state.undoStack.length > 1
                ? state.undoStack[state.undoStack.length - 2]
                : state.content,
            undoStack: state.undoStack.length > 1
                ? state.undoStack.slice(0, state.undoStack.length - 1)
                : state.undoStack
        }))
);
