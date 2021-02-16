import { PageItem, Prefab } from '@bitmetro/cms-common';

import { rowItem } from '@bitmetro/content-renderer/dist/defaultTheme/items/Row';

export interface PageColumn extends Prefab {
    props: {
        span: number
    }
}

export interface PageRow extends Prefab {
    children: PageColumn[];
}

export const createColumn = (span: number): PageColumn => ({
    itemType: 'Column',
    props: {
        span
    },
    children: []
});

export const createRow = (columns: number): PageRow =>
    rowItem.create(
        null,
        new Array(columns).fill(0).map(() => createColumn(12 / columns)) as PageItem[]
    ) as PageRow;

export const layoutPrefabs: { [key: string]: Prefab } = {
    'Columns (2)': createRow(2),
    'Columns (3)': createRow(3),
    'Columns (4)': createRow(4),
};
