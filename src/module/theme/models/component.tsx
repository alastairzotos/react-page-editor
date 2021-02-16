import { createItem, Dictionary, PageItem } from '@bitmetro/cms-common';
import * as React from 'react';

import { DefaultItemProps, defaultSettingsEditors, generateDefaultProps } from './defaultSettings';
import { Slot } from './slots';

interface ThemeItemProps<P extends Dictionary<any> = {}> {
    isContainer?: boolean;
    hideFromMenu?: boolean;
    useInlineSettings?: boolean;

    slots?: Slot[],

    defaultProps: P;
    Component: React.FC<P>;
    InlineComponent?: React.FC<P>;
    Settings?: React.FC<ItemEditorSettings<P>> | Dictionary<React.FC<ItemEditorSettings<P>>>;
}

export class ThemeItem<P extends DefaultItemProps = DefaultItemProps> {

    constructor(
        public name: string,
        {
            isContainer,
            hideFromMenu,
            useInlineSettings,
            slots,
            defaultProps,
            Component,
            InlineComponent,
            Settings
        }: ThemeItemProps<P>
    ) {
        this.isContainer = isContainer;
        this.hideFromMenu = hideFromMenu;
        this.useInlineSettings = useInlineSettings;
        this.slots = slots;
        this.defaultProps = {
            ...generateDefaultProps(),
            ...defaultProps
        };
        this.Component = Component;
        this.InlineComponent = InlineComponent;

        this.Settings = !!Settings
            ? (
                typeof Settings === 'function'
                    ? { [name]: Settings, ...defaultSettingsEditors }
                    : { ...Settings, ...defaultSettingsEditors }
            )
            : defaultSettingsEditors;
    }
    isContainer?: boolean;
    hideFromMenu?: boolean;
    useInlineSettings?: boolean;
    defaultProps: P;
    slots?: Slot[];

    Component: React.FC<P>;
    InlineComponent?: React.FC<P>;
    Settings?: Dictionary<React.FC<ItemEditorSettings<P>>>;

    create = (props?: P, children?: PageItem[]): PageItem =>
        createItem(
            this.name,
            props || this.defaultProps,
            children || (this.isContainer ? [] : null),
            this.generateSlotItems()
        )

    toProps = (): ThemeItemProps<P> => ({
        isContainer: this.isContainer,
        hideFromMenu: this.hideFromMenu,
        useInlineSettings: this.useInlineSettings,
        slots: this.slots,
        defaultProps: this.defaultProps,
        Component: this.Component,
        InlineComponent: this.InlineComponent,
        Settings: this.Settings
    })

    private generateSlotItems = (): Dictionary<PageItem> =>
        this.slots
            ? this.slots.reduce((slots, slot) => ({
                ...slots,
                [slot.id]: slot.generateItem()
            }), {})
            : null
}

export interface ItemEditorSettings<P> {
    data: P;
    onUpdate: (data: P) => void;
}

export interface ThemeItemMap {
    Page?: ThemeItem<any>;
    [key: string]: ThemeItem<any>;
}
