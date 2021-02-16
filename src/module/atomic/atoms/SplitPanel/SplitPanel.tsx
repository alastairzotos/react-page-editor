import { makeStyles } from '@material-ui/core/styles';
import * as React from 'react';
import SplitPane from 'react-split-pane';

export type ISplitDirection = 'horizontal' | 'vertical';

const MIN_SPLIT_SIZE_V = 150;
const DEFAULT_SPLIT_SIZE_V = 300;

const MIN_SPLIT_SIZE_H = 150;
const DEFAULT_SPLIT_SIZE_H = 300;

const SPLIT_STORAGE = 'aero-cms:split-panel';

const panelStorage = (id: string) => `${SPLIT_STORAGE}_${id}`;

export const getMinSplitPanelSize = (split: ISplitDirection) =>
    split === 'horizontal' ? MIN_SPLIT_SIZE_H : MIN_SPLIT_SIZE_V;

export const getDefaultSplitPanelSize = (id: string, split: ISplitDirection) =>
    split === 'horizontal'
    ? (
        parseInt(localStorage.getItem(panelStorage(id)), 10)
            || DEFAULT_SPLIT_SIZE_H
    )
    : (
        parseInt(localStorage.getItem(panelStorage(id)), 10)
            || DEFAULT_SPLIT_SIZE_V
    );

export const setSplitPanelSize = (id: string, split: ISplitDirection) =>
    size =>
        split === 'horizontal'
        ? localStorage.setItem(panelStorage(id), String(size))
        : localStorage.setItem(panelStorage(id), String(size));


export interface ISplitPanelProps {
    id: string;
    split: ISplitDirection;
    primary?: 'first' | 'second';
    minSplit?: number;
    maxSplit?: number;
    defaultSplit?: number;
}

const useStyles = makeStyles(theme => ({
    main: {
        height: '100%',
        width: '100%',
        maxWidth: '100%'
    }
}));

export const SplitPanel: React.FC<ISplitPanelProps> = ({
    id,
    split,
    primary = 'first',
    minSplit,
    maxSplit,
    defaultSplit,
    children
}) => {
    const classes = useStyles();

    return (
        <div className={classes.main}>
            <SplitPane

                split={split}
                minSize={minSplit !== undefined ? minSplit : getMinSplitPanelSize(split)}
                // minSize={minSplit}
                maxSize={maxSplit}
                defaultSize={defaultSplit !== undefined ? defaultSplit : getDefaultSplitPanelSize(id, split)}
                // defaultSize={defaultSplit}
                onChange={setSplitPanelSize(id, split)}
                style={{ position: 'relative' }}
                primary={primary}
            >
                {children}
            </SplitPane>
        </div>
    );
};
