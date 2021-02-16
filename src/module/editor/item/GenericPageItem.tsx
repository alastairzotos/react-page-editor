import { PageItem, PREFAB_CLASS } from '@bitmetro/cms-common';
import * as React from 'react';

import { DROPZONE_CLASS } from '../../utils';
import { Dropzone } from '../editting/Dropzone';

import { ItemWrapper } from './ItemWrapper';

export interface GenericPageItemProps {
    item: PageItem;
}

export const GenericPageItem: React.FC<GenericPageItemProps> = ({ item }) => {
    if (item.itemType === DROPZONE_CLASS) {
        return <Dropzone {...item.props} />;
    }

    if (item.itemType === PREFAB_CLASS) {
        return (
            <>
            {
                item.children.map(child => (
                    <GenericPageItem key={child.id} item={child} />
                ))
            }
            </>
        );
    }

    return <ItemWrapper item={item} />;
};
