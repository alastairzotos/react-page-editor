import { Prefabs, ThemeSettings } from '@bitmetro/cms-common';

import { ThemeItem, ThemeItemMap } from './component';

export interface EditorTheme<S extends ThemeSettings> {
    name: string;
    themeSettings?: S;
    items: ThemeItem[];
    itemMap?: ThemeItemMap;
    prefabs?: Prefabs;
}

export const createTheme = <S extends ThemeSettings>(
    name: string,
    themeSettings: S,
    items: ThemeItem[],
    prefabs?: Prefabs
) => ({
    name,
    themeSettings,
    items,
    prefabs,
    itemMap: items.reduce((itemList, item) => ({
        ...itemList,
        [item.name]: item
    }), {})
});
