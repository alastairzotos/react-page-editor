import { PageItem } from '@bitmetro/cms-common';
import { createAction } from '@reduxjs/toolkit';

import { DragInfo, DropTarget } from '../models';

export const contentEditorActions = {
    setNamespace: createAction<string>('ce/SET_NAMESPACE'),
    setContent: createAction<PageItem>('ce/SET_CONTENT'),
    selectItem: createAction<PageItem>('ce/SELECT_ITEM'),
    setResizingColumn: createAction<boolean>('ce/SET_RESIZING_COLUMN'),
    updateSelectedItem: createAction<PageItem>('ce/UPDATE_SELECTED_ITEM'),
    dragItem: createAction<DragInfo>('ce/DRAG_ITEM'),
    setDropTarget: createAction<DropTarget>('ce/SET_DROP_TARGET'),
    startDroppingItem: createAction('ce/START_DROPPING_ITEM'),
    dropItem: createAction('ce/DROP_ITEM'),
    openAddItemMenu: createAction<boolean>('ce/OPEN_ADD_ITEM_MENU'),
    deleteSelectedItem: createAction('ce/DELETE_SELECTED_ITEM'),
    undo: createAction('ce/UNDO')
};
