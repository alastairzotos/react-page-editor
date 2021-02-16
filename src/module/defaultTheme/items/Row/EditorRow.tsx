import { modifyItems, PageItem } from '@bitmetro/cms-common';
import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { contentEditorActions } from '../../../actions';
import { PageColumn } from '../../../prefabs';
import { getContent, isResizingColumn } from '../../../selectors';
import { DefaultItemProps, usePageItem } from '../../../theme';
import { EditorColumn } from '../Column/EditorColumn';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    dragging: {
        cursor: 'ew-resize'
    }
}));

export const EditorRow: React.FC<DefaultItemProps> = ({ defaultClass }) => {
    const item = usePageItem();
    const row = item;

    const classes = useStyles();

    const dispatch = useDispatch();

    const currentContent = useSelector(getContent);

    const [resizerHovered, setResizerHovered] = React.useState(-1);
    const [resizerPos, setResizerPos] = React.useState(-1);

    const resizerDragging = useSelector(isResizingColumn);

    const setResizerDragging = (dragging: boolean) => {
        dispatch(contentEditorActions.setResizingColumn(dragging));
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault();

        if (resizerDragging && resizerHovered > 0) {
            const rowRect = e.currentTarget.getBoundingClientRect();

            const leftColumnIndex = resizerHovered - 1;
            const rightColumnIndex = resizerHovered;

            const totalSpanToLeftColumn = row.children
                .slice(0, leftColumnIndex)
                .reduce((total, col) => total + col.props.span, 0);

            const leftColumnStartPos = (totalSpanToLeftColumn / 12) * rowRect.width + rowRect.x;

            const newLeftColumnSpan = Math.round(
                ((e.clientX - leftColumnStartPos) / rowRect.width) * 12
            );

            const leftColumn = row.children[leftColumnIndex];
            const rightColumn = row.children[rightColumnIndex];

            const leftColumnSpan = leftColumn.props.span;
            const rightColumnSpan = rightColumn.props.span;

            const leftColumnSpanDiff = newLeftColumnSpan - leftColumnSpan;
            const newRightColumnSpan = rightColumnSpan - leftColumnSpanDiff;

            if (newLeftColumnSpan > 0 && newRightColumnSpan > 0 && newLeftColumnSpan !== leftColumnSpan && newRightColumnSpan !== rightColumnSpan) {
                dispatch(
                    contentEditorActions.setContent(
                        modifyItems(
                            currentContent,
                            it =>
                                it.id === (row.children[leftColumnIndex] as PageItem).id
                                    ? { ...it, props: { span: newLeftColumnSpan } }
                                    : (
                                        it.id === (row.children[rightColumnIndex] as PageItem).id
                                            ? { ...it, props: { span: newRightColumnSpan } }
                                            : it
                                    )
                        )
                    )
                )
            }
        }
    };

    return (
        <div
            className={clsx(defaultClass, classes.root, {
                [classes.dragging]: resizerDragging
            })}

            onMouseMove={handleMouseMove}

            onMouseUp={() => {
                if (resizerDragging) {
                    setResizerDragging(false);
                    setResizerHovered(-1);
                }
            }}
        >
            {
                row.children.map((column, columnIndex) => (
                    <EditorColumn
                        key={columnIndex}
                        span={column.props.span}
                        column={column as PageColumn}
                        showResizer={columnIndex === resizerPos || columnIndex === resizerHovered}

                        onResizerClick={click => {
                            if (click) {
                                setResizerDragging(true)
                            }
                        }}

                        onResizerHovered={hovered => {
                            if (hovered) {
                                setResizerHovered(columnIndex);
                            } else if (!resizerDragging) {
                                setResizerHovered(-1);
                            }
                        }}

                        onHover={(hover, pos) => {
                            if (resizerDragging || resizerHovered > 0) return;

                            if (hover && (columnIndex > 0 || pos === 'right')) {
                                setResizerPos(pos === 'left' ? columnIndex : columnIndex + 1);
                            } else {
                                setResizerPos(-1);
                            }
                        }}
                    />
                ))
            }
        </div>
    );
};
