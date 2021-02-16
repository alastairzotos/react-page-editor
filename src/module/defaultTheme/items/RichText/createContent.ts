import { ContentState, convertToRaw, EditorState } from 'draft-js';

import { RichTextProps } from './RichText'

export const createRichTextContent = (text: string): RichTextProps => ({
    content: JSON.stringify(
        convertToRaw(
            EditorState.createWithContent(ContentState.createFromText(text)).getCurrentContent()
        )
    )
});
