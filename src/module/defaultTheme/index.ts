import { createTheme } from '../theme';

import { defaultItems } from './items';
import { defaultThemeSettings, DefaultThemeSettings } from './settings';

export const defaultTheme = createTheme<DefaultThemeSettings>(
    'Default',
    defaultThemeSettings,
    defaultItems
);

export * from './settings';
