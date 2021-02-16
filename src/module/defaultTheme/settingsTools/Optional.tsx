import { Checkbox, FormControlLabel, makeStyles, Typography } from '@material-ui/core';
import * as React from 'react';

export interface OptionalProps {
    title: string;
    titleBelow?: boolean;
    value: boolean;
    onChange: (checked: boolean) => void;
    whenTrue?: React.ReactNode;
    whenFalse?: React.ReactNode;
}

const useStyles = makeStyles(() => ({
    title: {
        fontSize: 14
    }
}));

export const Optional: React.FC<OptionalProps> = ({
    title,
    titleBelow,
    value,
    onChange,
    whenTrue,
    whenFalse
}) => {
    const classes = useStyles();

    return (
        <>
            {titleBelow && (value ? whenTrue : whenFalse)}

            <FormControlLabel
                label={
                    <Typography className={classes.title} color="textSecondary">{title}</Typography>
                }
                control={
                    <Checkbox
                        checked={value}
                        onChange={e => onChange(e.target.checked)}
                        color="primary"
                    />
                }
            />

            {!titleBelow && (value ? whenTrue : whenFalse)}
        </>
    );
};
