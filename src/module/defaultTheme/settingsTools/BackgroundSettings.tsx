import { Checkbox, FormControlLabel, TextField } from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import * as React from 'react';

import { Spacer } from '../../atomic/atoms/Spacer';
import { BackgroundImageSettingsProps, BackgroundSettingsProps } from '../models';
import { DefaultThemeSettings } from '../settings';

import { DefaultColourPicker } from './DefaultColourPicker';
import { Optional } from './Optional';
import { SettingsContainer } from './SettingsContainer';

interface BackgroundImageSettingsCompProps {
    value: BackgroundImageSettingsProps;
    onChange: (value: BackgroundImageSettingsProps) => void;
}

const BackgroundImageSettings: React.FC<BackgroundImageSettingsCompProps> = ({
    value,
    onChange
}) => {
    return (
        <SettingsContainer title="Background image">
            <TextField
                label="URL"
                type="text"
                fullWidth
                value={value ? value.url || '' : ''}
                onChange={e => onChange({
                    ...value,
                    url: e.target.value
                })}
            />

            <Spacer top={2} />

            <FormControlLabel
                label="Parallax scrolling"
                control={
                    <Checkbox
                        checked={value ? value.parallax || false : false}
                        onChange={e =>
                            onChange({
                                ...value,
                                parallax: e.target.checked
                            })
                        }
                        color="primary"
                    />
                }
            />
        </SettingsContainer>
    );
};

export interface IBackgroundSettingsProps {
    title?: string;
    imagesAllowed?: boolean;
    data: BackgroundSettingsProps;
    themeSettings: DefaultThemeSettings;
    onChange: (data: BackgroundSettingsProps) => void;
}

export const BackgroundSettings: React.FC<IBackgroundSettingsProps> = ({
    title,
    imagesAllowed = true,
    data,
    themeSettings,
    onChange
}) => {
    const bgColour = (
        <DefaultColourPicker
            title={title}
            themeSettings={themeSettings}
            current={data && data.colour ? data.colour || 'none' : 'none'}
            onChange={value => onChange({
                ...data,
                colour: value
            })}
        />
    );

    return (
        <>
            {
                imagesAllowed
                    ? (
                        <Optional
                            title="Use background image"
                            titleBelow={true}
                            value={!!data && !!data.useImage}
                            onChange={checked => onChange({
                                ...data,
                                useImage: checked
                            })}

                            whenTrue={
                                <BackgroundImageSettings
                                    value={data ? data.image : undefined}
                                    onChange={value => onChange({
                                        ...data,
                                        image: value
                                    })}
                                />
                            }

                            whenFalse={bgColour}
                        />
                    )
                    : bgColour
            }
        </>
    );
};

export const createBackgroundProps = (background: BackgroundSettingsProps, themeSettings: DefaultThemeSettings): CSSProperties => ({
    backgroundColor:
        !!background && !!background.colour
            ? themeSettings.palette[background.colour]
            : 'inherit',
    backgroundImage:
        !!background && !!background.image && background.useImage
            ? `url(${background.image.url})`
            : 'none',

    ...(
        !!background && !!background.image && background.useImage && !!background.image.parallax
            ? ({
                backgroundAttachment: 'fixed',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover'
            })
            : {}
    )
});
