import { makeStyles } from '@material-ui/core';
import cx from 'clsx';
import * as React from 'react';

export interface ISpacerProps {
    left?: number;
    right?: number;
    top?: number;
    bottom?: number;
}

const createStyles = ({
    left = 0,
    right = 0,
    top = 0,
    bottom = 0
}: ISpacerProps) =>
    makeStyles(theme => ({
        left: {
            paddingLeft: theme.spacing(left)
        },
        right: {
            paddingRight: theme.spacing(right)
        },
        top: {
            paddingTop: theme.spacing(top)
        },
        bottom: {
            paddingBottom: theme.spacing(bottom)
        }
    }));

export const Spacer: React.FC<ISpacerProps> = props => {
    const classes = createStyles(props)();

    return (
        <div
            className={cx(
                classes.left,
                classes.right,
                classes.top,
                classes.bottom
            )}
        >
        </div>
    );
};
