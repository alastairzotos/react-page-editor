import { PageItem } from '@bitmetro/cms-common';
import * as React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';

import { defaultTheme, EditorTheme, EditorThemeContext } from '@bitmetro/content-renderer';
import { contentEditorReducer } from '../reducers';
import { styles } from '../styles';

import { ContentEditorInner } from './ContentEditorInner';

const useLogger = false;
const store = useLogger
    ? createStore(contentEditorReducer, applyMiddleware(logger))
    : createStore(contentEditorReducer);

export interface ContentEditorProps {
    id: string;
    theme?: EditorTheme<any>;
    content: PageItem;
    onChange: (content: PageItem) => void;
    Wrapper?: React.FC;
}

export const ContentEditor: React.FC<ContentEditorProps> = ({
    id,
    theme = defaultTheme,
    content,
    onChange,
    Wrapper
}) => {
    return (
        <>
            <style>{styles}</style>
            <Provider store={store}>
                <EditorThemeContext.Provider value={theme}>
                    <ContentEditorInner
                        id={id}
                        content={content}
                        onChange={onChange}
                        Wrapper={Wrapper}
                    />
                </EditorThemeContext.Provider>
            </Provider>
        </>
    );
};
