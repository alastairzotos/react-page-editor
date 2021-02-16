
import { DefaultItemProps, ThemeItem } from '../../../theme';

import { EditorRow } from './EditorRow';
import { Row } from './Row';

export const rowItem = new ThemeItem<DefaultItemProps>('Row', {
    defaultProps: {},
    isContainer: true,
    hideFromMenu: true,
    Component: Row,
    InlineComponent: EditorRow
});
