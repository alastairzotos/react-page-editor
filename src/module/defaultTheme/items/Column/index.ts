import { ThemeItem } from '../../../theme';

import { Column, ColumnProps } from './Column';
import { EditorColumn } from './EditorColumn';

export const columnItem = new ThemeItem<ColumnProps>('Column', {
    defaultProps: null,
    isContainer: true,
    hideFromMenu: true,
    Component: Column,
    InlineComponent: EditorColumn
});
