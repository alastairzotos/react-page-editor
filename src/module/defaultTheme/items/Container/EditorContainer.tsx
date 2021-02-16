import clsx from 'clsx';
import * as React from 'react';

import { ContainerEditor } from '../../../editor/editting/ContainerEditor';
import { usePageItem } from '../../../theme';

import { ContainerProps, useContainerStyles } from './Container';

export const EditorContainer: React.FC<ContainerProps> =
    props => {
        const item = usePageItem();
        const classes = useContainerStyles(props);

        return (
            <div className={clsx(props.defaultClass, classes.root)}>
                <ContainerEditor container={item} />
            </div>
        );
    };
