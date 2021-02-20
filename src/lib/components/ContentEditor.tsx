import { PageItem } from '@bitmetro/cms-common';
import {
    // defaultTheme,
    defaultThemeSettings,
    EditorTheme,
    EditorThemeContext,
    Slot,
    SlotRendererContext,
    usePageItem
} from '@bitmetro/content-renderer';
import * as React from 'react';
import { ThemeProvider } from 'react-jss';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';

import { defaultTheme } from '../defaultTheme';
import { ContainerEditor } from '../editor/editting/ContainerEditor';
import { contentEditorReducer } from '../reducers';
import { styles } from '../styles';

import { ContentEditorInner } from './ContentEditorInner';

const useLogger = false;
const store = useLogger
    ? createStore(contentEditorReducer, applyMiddleware(logger))
    : createStore(contentEditorReducer);

export interface ContentEditorProps {
    id?: string;
    theme?: EditorTheme<any>;
    content: PageItem;
    onChange: (content: PageItem) => void;
    Wrapper?: React.FC;
}

const RenderSlot: React.FC<{ slot: Slot }> = ({ slot }) => {
    const item = usePageItem();

    return <ContainerEditor container={item.slots[slot.id]} />;
};

const DefaultWrapper: React.FC = ({ children }) =>
    <ThemeProvider theme={defaultThemeSettings}>{children}</ThemeProvider>;

export const ContentEditor: React.FC<ContentEditorProps> = ({
    id = '__default_editor_page__',
    theme = defaultTheme,
    content,
    onChange,
    Wrapper = DefaultWrapper
}) => {

    return (
        <>
            <style>{styles}</style>
            <Provider store={store}>
                <EditorThemeContext.Provider value={theme}>
                    <Wrapper>
                        <SlotRendererContext.Provider value={RenderSlot}>
                            <ContentEditorInner
                                id={id}
                                content={content}
                                onChange={onChange}
                            />
                        </SlotRendererContext.Provider>
                    </Wrapper>
                </EditorThemeContext.Provider>
            </Provider>
        </>
    );
};
