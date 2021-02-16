import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { contentEditorActions } from '../../actions';
import { getDraggingItem, isDroppingItem } from '../../selectors';
import { DROPZONE_ID } from '../../utils';
import { GenericPageItem } from '../item/GenericPageItem';

const useStyles = makeStyles(() => ({
    dragContainer: {
        position: 'absolute',
        display: 'block',
        opacity: 0.7,
        zIndex: 9999
    },
    dragContainerDropping: {
        transition: 'all 0.2s ease-out'
    },
    dragging: {
        cursor: 'grabbing'
    }
}));

export const DraggingItem = React.forwardRef<HTMLDivElement>((_, ref) => {
    const classes = useStyles();

    const dispatch = useDispatch();
    const draggingItem = useSelector(getDraggingItem);
    const droppingItem = useSelector(isDroppingItem);

    const dropzoneEl = !!droppingItem && document.getElementById(DROPZONE_ID);
    const dropzoneRect = !!dropzoneEl && dropzoneEl.getBoundingClientRect();

    const handleDropTransitionEnd = () => {
        if (droppingItem) {
            dispatch(contentEditorActions.dropItem());
        }
    };

    if (!draggingItem) {
        return null;
    }

    return (
        <div
            ref={ref}

            className={clsx(classes.dragContainer, {
                [classes.dragContainerDropping]: droppingItem
            })}

            style={{
                left: !!dropzoneRect
                    ? dropzoneRect.x
                    : draggingItem.position.x,

                top: !!dropzoneRect
                    ? dropzoneRect.y
                    : draggingItem.position.y,

                width: !!dropzoneRect
                    ? dropzoneRect.width
                    : draggingItem.width,

                height: !!dropzoneRect
                    ? dropzoneRect.height
                    : draggingItem.height
            }}

            onTransitionEnd={handleDropTransitionEnd}
        >
            <GenericPageItem item={draggingItem.item} />
        </div>
    );
});