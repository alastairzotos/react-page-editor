import { FormControl, TextField } from '@material-ui/core';
import * as React from 'react';

import { ItemEditorSettings, useThemeSettings } from '../../../theme';
import { DefaultThemeSettings } from '../../settings';
import { BackgroundSettings } from '../../settingsTools/BackgroundSettings';
import { Optional } from '../../settingsTools/Optional';

import { ContainerProps } from './Container';

export const ContainerSettings: React.FC<ItemEditorSettings<ContainerProps>> = ({
    data,
    onUpdate
}) => {
    const themeSettings = useThemeSettings<DefaultThemeSettings>();

    return (
        <>
            <FormControl fullWidth>
                <Optional
                    title="Use background"
                    value={data.hasBackground}
                    onChange={checked => onUpdate({
                        ...data,
                        hasBackground: checked
                    })}

                    whenTrue={
                        <BackgroundSettings
                            data={data.background}
                            themeSettings={themeSettings}
                            onChange={background => onUpdate({
                                ...data,
                                background
                            })}
                        />
                    }
                />
            </FormControl>
        </>
    );
};
