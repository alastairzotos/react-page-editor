import { makeStyles } from '@material-ui/core';
import { convertFromRaw, convertToRaw, EditorState } from 'draft-js';
import * as React from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import { ItemEditorSettings } from '../../../theme';

import { RichTextProps } from './RichText';

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: '#ffffff',
        color: theme.palette.getContrastText('#ffffff')
    },
    editor: {
        padding: theme.spacing(1)
    }
}))

export const RichTextSettings: React.FC<ItemEditorSettings<RichTextProps>> = ({
    data,
    onUpdate
}) => {
    const classes = useStyles();

    const [state, setState] = React.useState(
        !!data.content
        ? EditorState.createWithContent(convertFromRaw(JSON.parse(data.content)))
        : EditorState.createEmpty()
    );

    const handleUpdate = (editorState: EditorState) => {
        setState(editorState);

        onUpdate({
            content: JSON.stringify(convertToRaw(editorState.getCurrentContent()))
        });
    };

    return (
        <Editor
            editorState={state}
            wrapperClassName={classes.root}
            editorClassName={classes.editor}
            onEditorStateChange={handleUpdate}
        />
    );
};
