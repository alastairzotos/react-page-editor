import { generateDefaultLayoutProps, ThemeItem } from '@bitmetro/react-page-editor';

import { SlantItemComponent, SlantProps } from './component';
import { SlantItemBackgroundSettings } from './settings';

export const slantItem = new ThemeItem<SlantProps>('Slant', {
    isContainer: true,
    defaultProps: {
        angle: 2,
        background: null,
        layout: {
            ...generateDefaultLayoutProps(),
            paddingTop: 20,
            paddingBottom: 20,
            paddingLeft: 4,
            paddingRight: 4
        }
    },
    Component: SlantItemComponent,
    Settings: {
        Background: SlantItemBackgroundSettings
    }
});
