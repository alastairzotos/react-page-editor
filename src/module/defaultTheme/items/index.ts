import { ThemeItem } from '../../theme';

import { cardItem } from './Card';
import { columnItem } from './Column';
import { containerItem } from './Container';
import { jumbotronItem } from './Jumbotron';
import { pageItem } from './Page';
import { richTextItem } from './RichText';
import { rowItem } from './Row';

export const defaultItems: ThemeItem[] = [
    pageItem,
    rowItem,
    columnItem,
    containerItem,
    richTextItem,
    cardItem,
    jumbotronItem
];
