import { Grid } from '@material-ui/core';
import * as React from 'react';

import { DefaultItemProps } from '../../../theme';

export interface ColumnProps extends DefaultItemProps {
    span: number;
}

export const Column: React.FC<ColumnProps> = ({ span, children }) => {
    return (
        <Grid item sm={span as any}>{children}</Grid>
    );
};
