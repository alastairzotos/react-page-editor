import { extendDefaultTheme } from '@bitmetro/react-page-editor';

import { slantItem } from './slant-item';

export const myTheme = extendDefaultTheme({
    name: 'New Theme',
    items: [
        slantItem
    ]
});
