import { makeStyles } from '@material-ui/core';
import * as React from 'react';

const useStyles = makeStyles(() => ({
    overlay: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%'
    }
}));

export const Overlay: React.FC = ({children}) => {
    const classes = useStyles();

    return <div className={classes.overlay}>{children}</div>;
};
