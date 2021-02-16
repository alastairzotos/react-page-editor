import { ThemeSettings } from '@bitmetro/cms-common';

import { defaultTheme, DefaultThemeSettings } from '../../defaultTheme';
import { EditorTheme, ThemeItem } from '../models';

export const extendTheme = <B extends ThemeSettings, N extends B, O extends EditorTheme<N>>(
    base: EditorTheme<B>,
    newTheme: O
): O => {
    const items = [...(base.items || []), ...(newTheme.items || [])]
        .reduce((itemList, item, index) => {
            const foundIndex = itemList.findIndex((i, ind) => i.name === item.name && ind !== index);
            if (foundIndex >= 0) {
                return [
                    ...itemList.slice(0, foundIndex),
                    new ThemeItem(item.name, {
                        ...itemList[foundIndex].toProps(),
                        ...item.toProps()
                    }),
                    ...itemList.slice(foundIndex + 1)
                ];
            }

            return [...itemList, item];
        }, [] as ThemeItem<any>[]);

    return {
        ...base,
        ...newTheme,
        themeSettings: {
            ...(!!base.themeSettings ? base.themeSettings : null),
            ...(!!newTheme.themeSettings ? newTheme.themeSettings : null)
        },
        items,
        itemMap: items.reduce((itemList, item) => ({
            ...itemList,
            [item.name]: item
        }), {}),
        prefabs: {
            ...base.prefabs,
            ...newTheme.prefabs
        }
    };
};

export const extendDefaultTheme = <T extends DefaultThemeSettings, O extends EditorTheme<T>>(
    newTheme: O
) =>
    extendTheme<DefaultThemeSettings, T, O>(defaultTheme, newTheme);
