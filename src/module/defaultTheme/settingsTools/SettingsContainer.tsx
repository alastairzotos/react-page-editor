import { makeStyles, Typography } from '@material-ui/core';
import { lighten } from '@material-ui/core/styles';
import * as React from 'react';

export interface SettingsContainerProps {
    title?: string;
}

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        paddingBottom: theme.spacing(1),
        backgroundColor: lighten(theme.palette.background.paper, 0.15)
    },
    title: {
        fontSize: 14
    }
}));

export const SettingsContainer: React.FC<SettingsContainerProps> = ({
    title,
    children
}) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Typography className={classes.title} color="textSecondary" gutterBottom>{title}</Typography>

            <>{children}</>
        </div>
    );
};
