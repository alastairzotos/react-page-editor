
import { ThemeItem } from '../../../theme';

import { Container, ContainerProps } from './Container';
import { ContainerSettings } from './ContainerSettings';
import { EditorContainer } from './EditorContainer';

export const containerItem = new ThemeItem<ContainerProps>('Container', {
    isContainer: true,

    defaultProps: {},

    Component: Container,
    InlineComponent: EditorContainer,
    Settings: ContainerSettings
});
