import { ThemeItem } from '../../../theme';

import { JumboTron, JumbotronProps } from './Jumbotron';
import {
    JumbotronBackgroundSettings,
    JumbotronHighlightSettings,
    JumbotronSubtitleSettings,
    JumbotronTitleSettings
} from './JumbotronSettings';

export const jumbotronItem = new ThemeItem<JumbotronProps>('Jumbotron', {
    defaultProps: {
        title: {
            content: 'My Website',
            colour: 'primary'
        },
        subtitle: {
            content: 'Everything you could possibly need',
            colour: 'secondary'
        },
        background: null
    },

    Component: JumboTron,
    Settings: {
        Title: JumbotronTitleSettings,
        Subtitle: JumbotronSubtitleSettings,
        Highlight: JumbotronHighlightSettings,
        Background: JumbotronBackgroundSettings
    }
});
