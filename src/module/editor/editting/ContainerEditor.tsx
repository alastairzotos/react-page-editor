import { PageItem } from '@bitmetro/cms-common';
import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import * as React from 'react';
import { useSelector } from 'react-redux';

import { getDraggingItem, getDropTarget } from '../../selectors';
import { GenericPageItem } from '../item/GenericPageItem';

export interface ContainerEditorProps {
    container: PageItem;
}

const useStyles = makeStyles(theme => ({
    root: {
        height: '100%',
        backgroundColor: 'none',
        transition: 'background-color 0.2s ease-in-out'
    },
    rootDraggingOverChild: {
        padding: '5px 0'
    },
    filler: {
        flexGrow: 1,
    },
    fillerNoContent: {
        height: 30,
    },
    fillerDragging: {
        outline: `1px dashed ${theme.palette.divider}`
    }
}));

export const DROP_TARGET_CLASS = '__drop_target__';

export const ContainerEditor: React.FC<ContainerEditorProps> = ({ container }) => {
    const classes = useStyles();

    const draggingItem = useSelector(getDraggingItem);
    const dropTarget = useSelector(getDropTarget);

    return (
        <div
            id={container.id}
            className={clsx(classes.root, DROP_TARGET_CLASS, {
                [classes.rootDraggingOverChild]: (
                    !!dropTarget && !!dropTarget.container && container.children &&
                    container.children.find(child => child.id === dropTarget.container.id)
                )
            })}
        >
            {container.children && container.children.map(child => (
                <GenericPageItem
                    key={child.id}
                    item={child}
                />
            ))}

            <div
                className={clsx(classes.filler, {
                    [classes.fillerNoContent]: !container.children || container.children.length === 0,
                    [classes.fillerDragging]: !!draggingItem
                })}
            >
            </div>
        </div>
    );
};
