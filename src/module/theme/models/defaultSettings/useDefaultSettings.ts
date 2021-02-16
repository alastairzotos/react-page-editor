import { createClasses } from './createClasses';
import { DefaultItemProps, generateDefaultLayoutProps } from './model';

export const useDefaultStyles = createClasses(({ spacing }) => ({
    root: ({ layout = generateDefaultLayoutProps() }: DefaultItemProps) => (
        Object.keys(layout).reduce((props, key) => ({
            ...props,
            [key]: layout[key] * spacing
        }), {})
    )
}));
