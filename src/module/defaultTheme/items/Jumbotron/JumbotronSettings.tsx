import { TextField } from '@material-ui/core';
import * as React from 'react';

import { ItemEditorSettings, useThemeSettings } from '../../../theme';
import { DefaultThemeSettings } from '../../settings';
import { BackgroundSettings } from '../../settingsTools/BackgroundSettings';
import { DefaultTextColourPicker } from '../../settingsTools/DefaultColourPicker';
import { Optional } from '../../settingsTools/Optional';
import { SettingsContainer } from '../../settingsTools/SettingsContainer';
import { SettingsGroup } from '../../settingsTools/SettingsGroup';

import { JumbotronProps } from './Jumbotron';

export const JumbotronTitleSettings: React.FC<ItemEditorSettings<JumbotronProps>> = ({
    data,
    onUpdate
}) => {
    const themeSettings = useThemeSettings<DefaultThemeSettings>();

    return (
        <SettingsGroup
            items={[
                <TextField
                    label="Text"
                    value={data.title.content}
                    fullWidth
                    onChange={e => onUpdate({
                        ...data,
                        title: {
                            ...data.title,
                            content: e.target.value
                        }
                    })}
                />,

                <DefaultTextColourPicker
                    themeSettings={themeSettings}
                    title="Colour"
                    current={data.title.colour}
                    onChange={colour => onUpdate({
                        ...data,
                        title: {
                            ...data.title,
                            colour
                        }
                    })}
                />
            ]}
        />
    );
};

export const JumbotronSubtitleSettings: React.FC<ItemEditorSettings<JumbotronProps>> = ({
    data,
    onUpdate
}) => {
    const themeSettings = useThemeSettings<DefaultThemeSettings>();

    return (
        <SettingsGroup
            items={[
                <TextField
                    label="Text"
                    value={data.subtitle.content}
                    fullWidth
                    onChange={e => onUpdate({
                        ...data,
                        subtitle: {
                            ...data.subtitle,
                            content: e.target.value
                        }
                    })}
                />,

                <DefaultTextColourPicker
                    themeSettings={themeSettings}
                    title="Colour"
                    current={data.subtitle.colour}
                    onChange={colour => onUpdate({
                        ...data,
                        subtitle: {
                            ...data.subtitle,
                            colour
                        }
                    })}
                />,
            ]}
        />
    );
};

export const JumbotronHighlightSettings: React.FC<ItemEditorSettings<JumbotronProps>> = ({
    data,
    onUpdate
}) => {
    const themeSettings = useThemeSettings<DefaultThemeSettings>();

    return (
        <Optional
            title="Highlight text"
            value={data.shouldHighlightText}
            onChange={checked => onUpdate({
                ...data,
                shouldHighlightText: checked
            })}

            whenTrue={
                <BackgroundSettings
                    title="Highlight colour"
                    imagesAllowed={false}
                    data={data.highlightText}
                    themeSettings={themeSettings}
                    onChange={background => onUpdate({
                        ...data,
                        highlightText: background
                    })}
                />
            }
        />
    );
};

export const JumbotronBackgroundSettings: React.FC<ItemEditorSettings<JumbotronProps>> = ({
    data,
    onUpdate
}) => {
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