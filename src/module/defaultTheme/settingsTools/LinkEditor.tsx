import { TextField } from '@material-ui/core';
import * as React from 'react';

import { LinkSettingsProps } from '../models';

import { SettingsGroup } from './SettingsGroup';

export interface LinkEditorProps {
    title: string;
    value: LinkSettingsProps;
    onChange: (link: LinkSettingsProps) => void;
}

export const LinkEditor: React.FC<LinkEditorProps> = ({ title, value, onChange }) => {
    return (
        <SettingsGroup
            items={[
                <TextField
                    fullWidth
                    label="Title"
                    value={value ? value.title : ''}
                    onChange={e => onChange({
                        ...value,
                        title: e.target.value
                    })}
                />,

                <TextField
                    fullWidth
                    label="URL"
                    value={value ? value.url : ''}
                    onChange={e => onChange({
                        ...value,
                        url: e.target.value
                    })}
                />
            ]}
        />
    )
};
