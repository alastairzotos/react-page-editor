import { DefaultColour } from '../settings';

export interface BackgroundImageSettingsProps {
    url: string;
    parallax: boolean;
}

export interface BackgroundSettingsProps {
    colour?: DefaultColour;
    image?: BackgroundImageSettingsProps;
    useImage: boolean;
}

export interface LinkSettingsProps {
    title: string;
    url: string;
    openInNewTab: boolean;
}
