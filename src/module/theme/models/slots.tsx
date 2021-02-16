import { createItem, PageItem } from '@bitmetro/cms-common';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import { ContainerEditor } from '../../editor/editting/ContainerEditor';
import { ItemWrapper } from '../../editor/item/ItemWrapper';
import { useEditor } from '../../hooks';
import { usePageItem } from '../../theme';

const RenderSlot: React.FC<{ slot: Slot }> = ({ slot }) => {
    const editor = useEditor();
    const item = usePageItem();

    if (editor) {
        return <ContainerEditor container={item.slots[slot.id]} />;
    }

    return (
        <>
            {
                item.slots[slot.id].children.map(child => (
                    <ItemWrapper key={child.id} item={child} />
                ))
            }
        </>
    );
};

const SLOT_CLASS = '__slot__';

export class Slot {
    constructor(public id: string, ...items: PageItem[]) {
        this.items = items;
    }
    items: PageItem[];

    render = (): React.ReactNode => <RenderSlot slot={this} />

    generateItem = (): PageItem => ({
        ...createItem(SLOT_CLASS),
        children: this.items.map(item => ({
            ...item,
            id: uuidv4()
        }))
    })
}
