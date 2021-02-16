import { makeStyles } from '@material-ui/core';
import { ContentBlock, convertFromRaw, Editor, EditorState } from 'draft-js';
import * as React from 'react';

import { DefaultItemProps } from '../../../theme';

export interface RichTextProps extends DefaultItemProps {
    content: string;
};

const useStyles = makeStyles(() => ({
    left: {
        textAlign: 'left',
        '&> div': {
            display: 'inline'
        }
    },
    center: {
        textAlign: 'center',
        '&> div': {
            display: 'inline'
        }
    },
    right: {
        textAlign: 'right',
        '&> div': {
            display: 'inline'
        }
    }
}));

export const RichText: React.FC<RichTextProps> = ({ content }) => {
    const classes = useStyles();

    if (!content) {
        return null;
    }

    const blockFn = (block: ContentBlock) => {
        const data = block.getData();

        const alignment = data && data.get('text-align');

        if (alignment) {
            return classes[alignment];
        }

        return null;
    };

    return (
        <Editor
            editorState={EditorState.createWithContent(convertFromRaw(JSON.parse(content)))}
            readOnly={true}
            onChange={() => {}} // tslint:disable-line
            blockStyleFn={blockFn}
        />
    );
};
