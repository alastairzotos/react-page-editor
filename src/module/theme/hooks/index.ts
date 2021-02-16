import { Dictionary, PageItem, ThemeSettings } from '@bitmetro/cms-common';
import * as React from 'react';

import { EditorTheme, ThemeItem } from '../models';

export const EditorThemeContext = React.createContext<EditorTheme<any>>(null);
export const PageItemContext = React.createContext<PageItem>(null);
export const ThemeItemContext = React.createContext<ThemeItem<any>>(null);

export const useEditorTheme = <T extends ThemeSettings>() =>
    React.useContext(EditorThemeContext) as EditorTheme<T>;

export const useThemeSettings = <T extends ThemeSettings>() =>
    useEditorTheme<T>().themeSettings;

export const usePageItem = () => React.useContext(PageItemContext);

export const useThemeItem = <P extends Dictionary<any> = {}>() =>
    React.useContext(ThemeItemContext) as ThemeItem<P>;

