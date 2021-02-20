import {
    BackgroundSettings,
    DefaultThemeSettings,
    ItemEditorSettings,
    SettingsContainer,
    useThemeSettings
} from '@bitmetro/react-page-editor';
import * as React from 'react';

import { SlantProps } from './component';

export const SlantItemBackgroundSettings: React.FC<ItemEditorSettings<SlantProps>> = ({ data, onUpdate }) => {
    const themeSettings = useThemeSettings<DefaultThemeSettings>();

    return (
        <SettingsContainer title="Background">
            <BackgroundSettings
                title="Background colour"
                data={data.background}
                themeSettings={themeSettings}
                onChange={background => onUpdate({
                    ...data,
                    background
                })}
            />
        </SettingsContainer>
    );
};
