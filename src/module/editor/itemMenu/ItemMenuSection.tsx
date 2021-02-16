import { makeStyles, Typography } from '@material-ui/core';
import * as React from 'react';

import { Spacer } from '../../atomic/atoms/Spacer';
import { Position } from '../../models';

import { ItemMenuItem } from './ItemMenuItem';

export interface ItemMenuSectionProps {
    title: string;
    items: string[];
    onStartDrag: (item: string, position: Position) => void;
    addSpacer?: boolean
}

const useStyles = makeStyles(theme => ({
    content: {
        display: 'flex',
        flexWrap: 'wrap'
    }
}));

export const ItemMenuSection: React.FC<ItemMenuSectionProps> = ({
    title,
    items,
    onStartDrag,
    addSpacer = true
}) => {
    const classes = useStyles();

    if (!items || items.length === 0) {
        return null;
    }

    return (
        <>
            {addSpacer && <Spacer top={2} />}
            <Typography>{title}</Typography>

            <div className={classes.content}>
                {
                    items.sort().map((itemName, index) => (
                        <ItemMenuItem
                            key={index}
                            name={itemName}
                            onStartDrag={position => onStartDrag(itemName, position)}
                        />
                    ))
                }
            </div>
        </>
    );
};
