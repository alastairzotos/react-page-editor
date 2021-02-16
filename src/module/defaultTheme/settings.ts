import { ThemeSettings } from '@bitmetro/cms-common';

export const defaultColourTypes = [
    'none',
    'primary',
    'secondary',
    'success',
    'warning',
    'error',
    'background1',
    'background2',
] as const;

export type DefaultColour = typeof defaultColourTypes[number];

export const defaultTextColourTypes = [
    'primary',
    'secondary',
    'hint',
    'disabled'
] as const;

export type DefaultTextColour = typeof defaultTextColourTypes[number];

export interface DefaultThemeSettings extends ThemeSettings {
    palette: {
        primary: string;
        secondary: string;
        success: string;
        warning: string;
        error: string;
        background1: string;
        background2: string;

        text: {
            primary: string;
            secondary: string;
            hint: string;
            disabled: string;
        }
    },
    spacing: number;
}

export const defaultThemeSettings: DefaultThemeSettings = {
    palette: {
        primary: '#3477eb',
        secondary: '#ffc219',
        success: '#02bd49',
        warning: '#ffe600',
        error: '#e8131a',
        background1: '#ffffff',
        background2: '#d0d0d0',

        text: {
            primary: '#0a0a0a',
            secondary: '#242529',
            hint: '#6d707d',
            disabled: '#aaabb3'
        }
    },
    spacing: 8
};
