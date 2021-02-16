import { makeStyles, MenuItem, Select, Typography } from '@material-ui/core';
import * as React from 'react';

import {
    DefaultColour,
    defaultColourTypes,
    DefaultTextColour,
    defaultTextColourTypes,
    DefaultThemeSettings
} from '../settings';

interface DefaultColourPickerBaseProps {
    title?: string;
    colourNames: string[];
    colours: { [key: string]: string };
    current: string;
    onChange: (colour: string) => void;
}

const useBaseStyles = makeStyles(() => ({
    root: {
        display: 'flex'
    },
    title: {
        fontSize: 12,
        paddingTop: 10,
        paddingRight: 5
    }
}));

const DefaultColourPickerBase: React.FC<DefaultColourPickerBaseProps> = ({
    title,
    colourNames,
    colours,
    current,
    onChange
}) => {
    const classes = useBaseStyles();

    const [open, setOpen] = React.useState(false);

    return (
        <div className={classes.root}>
            {title && (
                <Typography className={classes.title} color="textSecondary">{title}</Typography>
            )}

            <Select
                fullWidth
                value={current}
                onChange={e => onChange(e.target.value as DefaultColour)}

                onOpen={() => setOpen(true)}
                onClose={() => setOpen(false)}
            >
                {
                    colourNames.map(colour => (
                        <MenuItem key={colour} value={colour} style={{ display: 'flex' }}>
                            {open && (
                                <div
                                    style={{
                                        width: 10,
                                        height: 10,
                                        outline: '1px solid white',
                                        backgroundColor: colours[colour],
                                        marginRight: 5
                                    }}
                                >
                                </div>
                            )}
                            {colour}
                        </MenuItem>
                    ))
                }
            </Select>
        </div>
    );
};

export interface DefaultColourPickerProps {
    title?: string;
    themeSettings: DefaultThemeSettings;
    current: DefaultColour;
    onChange: (colour: DefaultColour) => void;
}

export const DefaultColourPicker: React.FC<DefaultColourPickerProps> = ({
    title,
    themeSettings,
    current,
    onChange
}) => (
        <DefaultColourPickerBase
            title={title}
            colourNames={defaultColourTypes as unknown as string[]}
            colours={themeSettings.palette as any}
            current={current}
            onChange={onChange}
        />
    );

export interface DefaultTextColourPickerProps {
    title: string;
    themeSettings: DefaultThemeSettings;
    current: DefaultTextColour;
    onChange: (colour: DefaultTextColour) => void;
}

export const DefaultTextColourPicker: React.FC<DefaultTextColourPickerProps> = ({
    title,
    themeSettings,
    current,
    onChange
}) => (
        <DefaultColourPickerBase
            title={title}
            colourNames={defaultTextColourTypes as unknown as string[]}
            colours={themeSettings.palette.text}
            current={current}
            onChange={onChange}
        />
    );
