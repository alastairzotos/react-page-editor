import { Typography } from '@material-ui/core';
import { lighten, makeStyles } from '@material-ui/core/styles';
import * as React from 'react';
import { useSelector } from 'react-redux';

import { getDropTarget, isDroppingItem } from '../../selectors';
import { DropzoneProps, DROPZONE_ID } from '../../utils';
import { toolsColour } from '../common';

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: lighten(toolsColour, 0.5),
        width: '100%',
        outline: `1px dashed ${toolsColour}`,
        boxShadow: `0 0 3px 0 ${toolsColour}`,
        transition: 'height 0.2s ease-in-out',
        textAlign: 'center',
        color: theme.palette.text.hint
    }
}));

export const Dropzone: React.FC<DropzoneProps> = ({ height }) => {
    const classes = useStyles();

    const droppingItem = useSelector(isDroppingItem);
    const dropTarget = useSelector(getDropTarget);

    return (
        <div
            id={DROPZONE_ID}
            className={classes.root}
            style={{
                height: droppingItem ? height : 30
            }}
        >
            {!!dropTarget && !!dropTarget.container && (
                <Typography variant="overline">
                {
                    dropTarget.container.itemType.replace(/_/g, ' ').trim()
                }
                </Typography>
            )}
        </div>
    );
};
