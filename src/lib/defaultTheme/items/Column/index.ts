import { ThemeItem } from '@bitmetro/content-renderer';
import { ColumnProps } from '@bitmetro/content-renderer/dist/defaultTheme/items/Column/Column';

import { EditorColumn } from './EditorColumn';

export const columnItem = new ThemeItem<ColumnProps>('Column', {
    defaultProps: null,
    isContainer: true,
    hideFromMenu: true,
    Component: undefined,
    InlineComponent: EditorColumn
});
