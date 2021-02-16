import { ThemeItem } from '../../../theme';

import { createRichTextContent } from './createContent';
import { RichText, RichTextProps } from './RichText';
import { RichTextSettings } from './RichTextSettings';

export const richTextItem = new ThemeItem<RichTextProps>('RichText', {
    useInlineSettings: true,

    defaultProps: createRichTextContent('Rich text'),

    Component: RichText,
    Settings: RichTextSettings
});
