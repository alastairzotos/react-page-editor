import clsx from 'clsx';
import * as React from 'react';

import { createClasses, DefaultItemProps } from '../../../theme';
import { BackgroundSettingsProps } from '../../models';
import { createBackgroundProps } from '../../settingsTools/BackgroundSettings';

export interface ContainerProps extends DefaultItemProps {
    background?: BackgroundSettingsProps;
    hasBackground?: boolean;
}

export const useContainerStyles = createClasses(theme => ({
    root: ({ hasBackground, background }: ContainerProps) => ({
        ...(hasBackground ? createBackgroundProps(background, theme) : {})
    })
}));

export const Container: React.FC<ContainerProps> =
    props => {
        const classes = useContainerStyles(props);

        return <div className={clsx(props.defaultClass, classes.root)}>{props.children}</div>;
    };
