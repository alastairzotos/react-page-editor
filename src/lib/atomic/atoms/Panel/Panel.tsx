import { makeStyles, Paper, Toolbar, Typography } from '@material-ui/core';
import clsx from 'clsx';
import * as React from 'react';

const useStyles = makeStyles(theme => ({
    sidePanel: {
        width: '100%',
        height: '100%',
        overflowY: 'scroll'
    },
    titleBar: {
        height: 24,
        padding: 3,
        backgroundColor: theme.palette.primary.main
    },
    borderLeft: {
        borderLeft: `1px solid ${theme.palette.divider}`
    },
    borderRight: {
        borderRight: `1px solid ${theme.palette.divider}`
    },
    borderTop: {
        borderTop: `1px solid ${theme.palette.divider}`
    },
    borderBottom: {
        borderBottom: `1px solid ${theme.palette.divider}`
    },
    borderAll: {
        border: `1px solid ${theme.palette.divider}`
    }
}));

export interface IPanelProps {
    title?: string;
    border?: 'left' | 'right' | 'bottom' | 'top' | 'all';
    className?: string;
}

export const Panel: React.FC<IPanelProps> = ({
    title,
    border = 'all',
    className,
    children
}) => {
    const classes = useStyles();

    return (
        <div
            className={clsx(classes.sidePanel, className, {
                [classes.borderLeft]: border === 'left',
                [classes.borderRight]: border === 'right',
                [classes.borderTop]: border === 'top',
                [classes.borderBottom]: border === 'bottom',
                [classes.borderAll]: border === 'all'
            })}
        >
            {title && (
                <Paper
                    className={classes.titleBar}
                >
                    <small>
                        {title}
                    </small>
                </Paper>
            )}
            {children}
        </div>
    );
};
