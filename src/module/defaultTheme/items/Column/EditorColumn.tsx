import { PageItem } from '@bitmetro/cms-common';
import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import * as React from 'react';
import { useSelector } from 'react-redux';

import { ContainerEditor } from '../../../editor/editting/ContainerEditor';
import { PageColumn } from '../../../prefabs';
import { isResizingColumn } from '../../../selectors';

import { ColumnProps } from './Column';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        transition: 'width .2s ease-in-out'
    },
    content: {
        width: '100%'
    },
    hasResizer: {
        paddingLeft: theme.spacing(1) - 4
    },
    resizer: {
        left: -2,
        width: 4,
        backgroundColor: theme.palette.action.focus,
        cursor: 'ew-resize'
    },
    resizerHover: {
        backgroundColor: theme.palette.action.active,
    },
    addBtnContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
}))

export interface EditorColumnProps extends ColumnProps {
    column: PageColumn;
    showResizer: boolean;
    onHover: (hover: boolean, pos?: 'left' | 'right') => void;
    onResizerHovered: (hover: boolean) => void;
    onResizerClick: (click: boolean) => void;
}

export const EditorColumn: React.FC<EditorColumnProps> = ({
    column,
    showResizer,
    onHover,
    onResizerHovered,
    onResizerClick
}) => {
    const classes = useStyles();

    const isResizing = useSelector(isResizingColumn);

    const [resizerHovered, setResizerHovered] = React.useState(false);

    const handleHover = (hovered: boolean, pos?: 'left' | 'right') => {
        onHover(hovered, pos);
    };

    const handleResizerHover = (hovered: boolean) => {
        onResizerHovered(hovered);
        setResizerHovered(hovered);
    };

    const handleResizerClick = (click: boolean) => {
        onResizerClick(click);
    };

    return (
        <div
            className={classes.root}
            onMouseMove={e => {
                e.preventDefault();

                const rect = e.currentTarget.getBoundingClientRect();
                const offset = e.clientX - rect.x;
                const pos = Math.abs(Math.round(offset / rect.width));
                handleHover(true, !!pos ? 'right' : 'left');
            }}

            onMouseLeave={() => handleHover(false)}

            style={{
                width: `${((column.props.span / 12) * 100)}%`
            }}
        >
            {showResizer && (
                <div
                    className={
                        clsx(classes.resizer, {
                            [classes.resizerHover]: resizerHovered || isResizing
                        })
                    }

                    onMouseEnter={() => handleResizerHover(true)}
                    onMouseLeave={() => handleResizerHover(false)}

                    onMouseDown={() => handleResizerClick(true)}
                    onMouseUp={() => handleResizerClick(false)}
                >
                </div>
            )}
            <div
                className={clsx(classes.content, {
                    [classes.hasResizer]: showResizer
                })}
            >
                <ContainerEditor container={column as PageItem} />
            </div>
        </div>
    );
};
