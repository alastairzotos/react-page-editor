import { PageItem } from '@bitmetro/cms-common';
import * as React from 'react';

interface EditorContext<P extends { [key: string]: any } = {}> {
    isSelected: (item: PageItem) => boolean;
    updateSelectedItem: (data: P) => void;
}

export const EditorContext = React.createContext<EditorContext<any>>(null);

export const useEditor = <P extends { [key: string]: any } = {}>() =>
    React.useContext<EditorContext<P>>(EditorContext);
