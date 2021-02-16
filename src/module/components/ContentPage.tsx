import { PageItem } from '@bitmetro/cms-common';
import * as React from 'react';

import { defaultTheme } from '../defaultTheme';
import {
    DefaultItemProps,
    EditorTheme,
    EditorThemeContext,
    useDefaultStyles,
    useEditorTheme
} from '../theme';

import { ItemContext } from './ItemContext';

interface RenderItemProps {
    item: PageItem;
}

const RenderItem: React.FC<RenderItemProps> = ({ item }) => {
    const theme = useEditorTheme();
    const themeItem = theme.itemMap[item.itemType];

    const classes = useDefaultStyles(item.props || {});

    if (!themeItem) {
        return (
            <p>Unknown item {item.itemType}</p>
        );
    }

    const Component = themeItem.Component as React.FC<DefaultItemProps>;

    return (
        <ItemContext item={item} themeItem={themeItem}>
            {
                themeItem.isContainer
                    ? (
                        <Component defaultClass={classes.root} {...item.props}>
                            {
                                item.children.map(child => (
                                    <RenderItem key={child.id} item={child} />
                                ))
                            }
                        </Component>
                    )
                    : <Component defaultClass={classes.root} {...item.props} />
            }
        </ItemContext>
    );
};


export interface ContentPageProps {
    content: PageItem;
    theme?: EditorTheme<any>;
}

export const ContentPage: React.FC<ContentPageProps> = ({
    content,
    theme = defaultTheme
}) => (
    <EditorThemeContext.Provider value={theme}>
        <RenderItem item={content} />;
    </EditorThemeContext.Provider>
);
