import { PageItem, PAGE_CLASS } from '@bitmetro/cms-common';
import { IconButton, makeStyles, Tooltip, Typography } from '@material-ui/core';
import ArrowUp from '@material-ui/icons/ArrowUpward';
import Delete from '@material-ui/icons/Delete';
import DragHandle from '@material-ui/icons/OpenWith';
import clsx from 'clsx';
import * as React from 'react';

import { toolsColour } from '../common';

const useStyles = makeStyles(theme => ({
    tools: {
        display: 'flex',
        position: 'absolute',
        top: 0,
        right: 0,
        backgroundColor: toolsColour,
        color: theme.palette.getContrastText(toolsColour),
        borderBottomLeftRadius: 5,
        zIndex: 1100
    },
    toolIcon: {
        color: theme.palette.getContrastText(toolsColour)
    },
    toolDrag: {
        cursor: 'grab'
    },
    toolDragDragging: {
        cursor: 'grabbing'
    },
    itemTypeText: {
        paddingTop: 5,
        paddingLeft: 5,
        paddingRight: 5
    }
}));

const VariableTooltip: React.FC<{ showTooltip: boolean; title: string; }> = ({
    showTooltip,
    title,
    children
}) => {
    if (showTooltip) {
        return (
            <Tooltip title={title}>{children as any}</Tooltip>
        );
    }

    return <>{children}</>;
};

export interface ItemToolsProps {
    item: PageItem;
    draggable: boolean;
    draggingSelf: boolean;
    visible: boolean;

    handleParentSelectorClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    handleDragHandleClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    handleDeleteClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const ItemTools: React.FC<ItemToolsProps> = ({
    item,
    draggable,
    draggingSelf,
    visible,

    handleParentSelectorClick,
    handleDragHandleClick,
    handleDeleteClick
}) => {
    const classes = useStyles();

    const [hoverTools, setHoverTools] = React.useState(false);

    return (
        (visible || hoverTools) && (
            <div
                className={classes.tools}
                onMouseEnter={() => setHoverTools(true)}
                onMouseLeave={() => setHoverTools(false)}
            >
                <Typography variant="body2" className={classes.itemTypeText}>{item.itemType}</Typography>

                {!!item.parentId && (
                    <Tooltip title="Select parent item">
                        <IconButton
                            size="small"
                            className={classes.toolIcon}
                            onClick={handleParentSelectorClick}
                        >
                            <ArrowUp />
                        </IconButton>
                    </Tooltip>
                )}

                <Tooltip title="Delete">
                    <IconButton
                        size="small"
                        className={classes.toolIcon}
                        onClick={handleDeleteClick}
                    >
                        <Delete />
                    </IconButton>
                </Tooltip>

                {draggable && item.itemType !== PAGE_CLASS && (
                    <VariableTooltip title="Drag" showTooltip={!draggingSelf}>
                        <IconButton
                            size="small"
                            className={clsx(classes.toolIcon, classes.toolDrag, {
                                [classes.toolDragDragging]: draggingSelf
                            })}
                            onMouseDown={handleDragHandleClick}
                        >
                            <DragHandle />
                        </IconButton>
                    </VariableTooltip>
                )}
            </div>
        )
    )
};
