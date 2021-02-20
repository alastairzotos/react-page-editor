
import { DefaultItemProps, ThemeItem } from '@bitmetro/content-renderer';

import { EditorRow } from './EditorRow';

export const rowItem = new ThemeItem<DefaultItemProps>('Row', {
    defaultProps: {},
    isContainer: true,
    hideFromMenu: true,
    Component: undefined,
    InlineComponent: EditorRow
});
