import { FormControl, Grid, makeStyles, TextField } from '@material-ui/core';
import * as React from 'react';

import { ItemEditorSettings } from '../../../component';
import { DefaultItemProps } from '../../model';

const camelToSentence = (text: string) => {
    const result = text.replace(/([A-Z])/g, ' $1');
    return result.charAt(0).toUpperCase() + result.slice(1);
};

const useStyles = makeStyles(theme => ({
    gridItem: {
        padding: theme.spacing(1)
    }
}));

export const LayoutSettings: React.FC<ItemEditorSettings<DefaultItemProps>> = ({
    data,
    onUpdate
}) => {
    const classes = useStyles();

    if (!data) return null;

    return (
        <FormControl fullWidth>
            <Grid container>
            {
                Object.keys(data.layout).map(key => (
                    <Grid className={classes.gridItem} item xs={6} key={key}>
                        <TextField
                            label={camelToSentence(key)}
                            type="number"
                            fullWidth
                            value={data.layout[key]}
                            onChange={e => onUpdate({
                                ...data,
                                layout: {
                                    ...data.layout,
                                    [key]: parseInt(e.target.value, 10)
                                } as any
                            })}
                        />
                    </Grid>
                ))
            }
            </Grid>
        </FormControl>
    );
};
