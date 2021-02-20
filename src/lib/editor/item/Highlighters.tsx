import { makeStyles } from '@material-ui/core';
import * as React from 'react';

import { toolsColour } from '../common';

const useStyles = makeStyles(() => ({
    root: ({ position }: HighlighterProps) => ({
        width: 10,
        height: 10,
        backgroundColor: 'white',
        border: `2px solid ${toolsColour}`,
        borderRadius: 5,
        zIndex: 9999,
        position: 'absolute',

        top: position === 'top-left' || position === 'top-right'
            ? -5
            : undefined,
        bottom: position === 'bottom-left' || position === 'bottom-right'
            ? -5
            : undefined,
        left: position === 'top-left' || position === 'bottom-left'
            ? -5
            : undefined,
        right: position === 'top-right' || position === 'bottom-right'
            ? -5
            : undefined,
    })
}));

interface HighlighterProps {
    position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
}

const Highlighter: React.FC<HighlighterProps> = (props: HighlighterProps) => {
    const classes = useStyles(props);

    return <div className={classes.root}></div>;
};

export const Highlighters: React.FC = () => {
    return (
        <>
            <Highlighter position="top-left" />
            <Highlighter position="top-right" />
            <Highlighter position="bottom-left" />
            <Highlighter position="bottom-right" />
        </>
    );
};
