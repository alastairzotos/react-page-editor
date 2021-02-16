import { Typography } from '@material-ui/core';
import clsx from 'clsx';
import * as React from 'react';

import { createClasses, DefaultItemProps } from '../../../theme';
import { BackgroundSettingsProps } from '../../models';
import { DefaultTextColour } from '../../settings';
import { createBackgroundProps } from '../../settingsTools/BackgroundSettings';

export interface JumbotronProps extends DefaultItemProps {
    title: {
        content: string;
        colour: DefaultTextColour;
    };
    subtitle: {
        content: string;
        colour: DefaultTextColour;
    };

    background: BackgroundSettingsProps;
    highlightText?: BackgroundSettingsProps;
    shouldHighlightText?: boolean;
}

const useStyles = createClasses(theme => ({
    root: ({ background }: JumbotronProps) => ({
        width: '100%',
        height: 400,
        ...createBackgroundProps(background, theme)
    }),

    inner: {
        paddingLeft: '20%',
        paddingTop: 200,
    },

    title: ({ title, shouldHighlightText, highlightText }: JumbotronProps) => ({
        color: theme.palette.text[title.colour],
        display: shouldHighlightText ? 'table' : 'block',
        backgroundColor: shouldHighlightText
            ? theme.palette[highlightText ? highlightText.colour : theme.palette.background1]
            : '',
        padding: shouldHighlightText ? theme.spacing : 0,
        margin: shouldHighlightText ? theme.spacing : 0
    }),

    subtitle: ({ subtitle, shouldHighlightText, highlightText }: JumbotronProps) => ({
        padding: shouldHighlightText ? theme.spacing : 0,
        margin: shouldHighlightText
            ? `50px ${theme.spacing}px ${theme.spacing}px ${theme.spacing}px`
            : '50px 0 0 0',
        color: theme.palette.text[subtitle.colour],
        display: shouldHighlightText ? 'table' : 'block',
        backgroundColor: shouldHighlightText
            ? theme.palette[highlightText ? highlightText.colour : theme.palette.background1]
            : ''
    })
}))

export const JumboTron: React.FC<JumbotronProps> =
    props => {
        const classes = useStyles(props);

        return (
            <div className={clsx(props.defaultClass, classes.root)}>
                <div className={classes.inner}>
                    <Typography variant="h2" className={classes.title}>{props.title.content}</Typography>
                    <Typography variant="h4" className={classes.subtitle}>{props.subtitle.content}</Typography>
                </div>
            </div>
        );
    };
