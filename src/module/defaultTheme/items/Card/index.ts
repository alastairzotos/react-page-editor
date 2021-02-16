import { ThemeItem } from '../../../theme';

import { Card, CardProps, contentSlot } from './Card';
import { CardButtonsSettings, CardImageSettings } from './CardSettings';

export const cardItem = new ThemeItem<CardProps>('Card', {
    defaultProps: {
        media: {
            image: 'https://s27142.pcdn.co/wp-content/uploads/2017/11/Flying-single-bird-colours.jpg',
            title: 'Parrot',
            height: 17
        },
        buttons: []
    },

    slots: [contentSlot],

    Component: Card,
    Settings: {
        Image: CardImageSettings,
        Buttons: CardButtonsSettings
    }
});
