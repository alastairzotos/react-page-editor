import {
    BackgroundSettingsProps,
    createBackgroundProps,
    createClasses,
    DefaultItemProps,
    DefaultThemeSettings
} from '@bitmetro/react-page-editor';
import * as React from 'react';

export interface SlantProps extends DefaultItemProps {
    angle: number;
    background: BackgroundSettingsProps;
}

const useStyles = createClasses((theme: DefaultThemeSettings) => ({
    root: ({ angle, background }: SlantProps) => ({
        transform: `skewY(-${angle}deg)`,
        ...createBackgroundProps(background, theme)
    }),
    inner: ({ angle }: SlantProps) => ({
        transform: `skewY(${angle}deg)`
    })
}));

export const SlantItemComponent: React.FC<SlantProps> = props => {
    const classes = useStyles(props);

    return (
        <div className={[props.defaultClass, classes.root].join(' ')}>
            <div className={classes.inner}>
                {props.children}
            </div>
        </div>
    );
};

