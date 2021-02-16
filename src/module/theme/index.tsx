import * as React from 'react';
import { SlotRenderer, usePageItem } from '@bitmetro/content-renderer';
import { ContainerEditor } from '../editor/editting/ContainerEditor';

SlotRenderer.render = slot => {
    const item = usePageItem();

    return <ContainerEditor container={item.slots[slot.id]} />;
};
