import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import * as React from 'react';
import Hotkeys from 'react-hot-keys';
import { useDispatch, useSelector } from 'react-redux';

import { contentEditorActions } from '../../actions';
import { EditorContext } from '../../hooks';
import {
    getContent,
    getDraggingItem,
    getSelectedItem
} from '../../selectors';
import { GenericPageItem } from '../item/GenericPageItem';

const useStyles = makeStyles(theme => ({
    root: {
        position: 'relative',
        height: '100%'
    },
    dragging: {
        cursor: 'grabbing'
    }
}));


export const ContentEditorCore: React.FC = () => {
    const classes = useStyles();

    const dispatch = useDispatch();
    const currentContent = useSelector(getContent);
    const draggingItem = useSelector(getDraggingItem);
    const selectedItem = useSelector(getSelectedItem);

    const handleUndo = () => {
        dispatch(contentEditorActions.undo());
    };

    return (
        <div className={clsx(classes.root, {
            [classes.dragging]: !!draggingItem
        })}>
            <EditorContext.Provider value={{
                isSelected: item => !!item && !!selectedItem && item.id === selectedItem.id,

                updateSelectedItem: data =>
                    dispatch(contentEditorActions.updateSelectedItem({
                        ...selectedItem,
                        props: data
                    }))
            }}>
                <Hotkeys
                    keyName="command+z,ctrl+z"
                    onKeyUp={handleUndo}
                >
                    <GenericPageItem item={currentContent} />
                </Hotkeys>
            </EditorContext.Provider>
        </div>
    );
};
