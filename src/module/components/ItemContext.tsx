import { PageItem } from '@bitmetro/cms-common';
import * as React from 'react';

import { PageItemContext, ThemeItem, ThemeItemContext } from '../theme';

export interface ItemContextProps {
    item: PageItem;
    themeItem: ThemeItem<any>;
}

export const ItemContext: React.FC<ItemContextProps> = ({ item, themeItem, children }) => (
    <PageItemContext.Provider value={item}>
        <ThemeItemContext.Provider value={themeItem}>
            {children}
        </ThemeItemContext.Provider>
    </PageItemContext.Provider>
);
