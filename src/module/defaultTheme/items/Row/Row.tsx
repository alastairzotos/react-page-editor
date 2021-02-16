import { Grid } from '@material-ui/core';
import * as React from 'react';

import { DefaultItemProps } from '../../../theme';

export const Row: React.FC<DefaultItemProps> = ({ defaultClass, children }) =>
    <Grid className={defaultClass} container>{children}</Grid>;
