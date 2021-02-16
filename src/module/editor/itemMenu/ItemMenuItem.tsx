import { darken, makeStyles, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/AddCircleOutline';
import * as React from 'react';

import { Position } from '../../models';

export interface ItemMenuItemProps {
    name: string;
    onStartDrag: (position: Position) => void;
}

const defaultSize = 100;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing(1),
        margin: theme.spacing(1),
        cursor: 'grab',
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: theme.shape.borderRadius,
        width: defaultSize,
        height: defaultSize,
        backgroundColor: 'none',
        transition: 'background-color 200ms ease-in-out',

        '&:hover': {
            backgroundColor: darken(theme.palette.common.white, 0.15)
        }
    },
    iconContainer: {
        display: 'flex',
        justifyContent: 'center',
        textAlign: 'center',
        padding: theme.spacing(1, 0, 2, 0)
    },
    title: {
        fontSize: 12,
        alignSelf: 'center'
    }
}));

export const ItemMenuItem: React.FC<ItemMenuItemProps> = ({
    name,
    onStartDrag
}) => {
    const classes = useStyles();

    const handleDragHandleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();

        onStartDrag({
            x: e.clientX,
            y: e.clientY
        });
    };

    return (
        <div className={classes.root} onMouseDown={handleDragHandleClick}>
            <div className={classes.iconContainer}>
                <AddIcon fontSize="large" />
            </div>
            <Typography variant="caption" className={classes.title}>{name}</Typography>
        </div>
    );
};
