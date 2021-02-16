import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import * as React from 'react';

import { DefaultItemProps } from '../../../theme';

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        fontFamily: theme.typography.fontFamily
    }
}));

export const Page: React.FC<DefaultItemProps> = ({ defaultClass, children }) => {
    const classes = useStyles();

    return (
        <div className={clsx(defaultClass, classes.root)}>{children}</div>
    );
};
