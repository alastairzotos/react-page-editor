import { FormControl } from '@material-ui/core';
import * as React from 'react';

import { Spacer } from '../../atomic/atoms/Spacer';

export interface SettingsGroupProps {
    items: React.ReactNode[];
}

export const SettingsGroup: React.FC<SettingsGroupProps> = ({ items }) => {

    return (
        <>
            <FormControl fullWidth>
                {
                    items.map((item, index) => (
                        <React.Fragment key={index}>
                            {item}

                            <Spacer top={2} />
                        </React.Fragment>
                    ))
                }
            </FormControl>
        </>
    )
};
