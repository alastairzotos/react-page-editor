import { ThemeSettings } from '@bitmetro/cms-common';
import { StyleSheetFactoryOptions } from 'jss';
import { createUseStyles, Styles, Theming } from 'react-jss';

import { DefaultThemeSettings } from '../../../defaultTheme';

interface BaseOptions<Theme = DefaultThemeSettings> extends StyleSheetFactoryOptions {
    index?: number;
    theming?: Theming<Theme>;
}

interface CreateUseStylesOptions<Theme = DefaultThemeSettings> extends BaseOptions<Theme> {
    name?: string;
}

export const createClasses = <T extends ThemeSettings = DefaultThemeSettings, C extends string = string>(
    styles: Styles<C> | ((theme: T) => Styles<C>),
    options?: CreateUseStylesOptions<T>
) => createUseStyles(styles, options);
