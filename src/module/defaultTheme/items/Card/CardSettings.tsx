import { Button, Checkbox, FormControlLabel, IconButton, makeStyles, TextField } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import * as React from 'react';

import { ItemEditorSettings } from '../../../theme';
import { SettingsContainer } from '../../settingsTools/SettingsContainer';
import { SettingsGroup } from '../../settingsTools/SettingsGroup';

import { cardItem } from '.';
import { CardProps } from './Card';

export const CardImageSettings: React.FC<ItemEditorSettings<CardProps>> = ({
    data,
    onUpdate
}) => {
    return (
        <SettingsGroup
            items={[
                <TextField
                    fullWidth
                    label="URL"
                    value={data.media.image}
                    onChange={e => onUpdate({
                        ...data,
                        media: {
                            ...data.media,
                            image: e.target.value
                        }
                    })}
                />,

                <TextField
                    fullWidth
                    label="Alt Text"
                    value={data.media.title}
                    onChange={e => onUpdate({
                        ...data,
                        media: {
                            ...data.media,
                            title: e.target.value
                        }
                    })}
                />,

                <TextField
                    fullWidth
                    type="number"
                    label="Height"
                    value={data.media.height || cardItem.toProps().defaultProps.media.height}
                    onChange={e => onUpdate({
                        ...data,
                        media: {
                            ...data.media,
                            height: parseInt(e.target.value, 10)
                        }
                    })}
                />
            ]}
        />
    );
};

const useButtonSettingsStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        marginBottom: theme.spacing(1)
    },
    deleteContainer: {
        width: '100%',
        display: 'block'
    }
}));

export const CardButtonsSettings: React.FC<ItemEditorSettings<CardProps>> = ({
    data,
    onUpdate
}) => {
    const classes = useButtonSettingsStyles();

    const handleAddClick = () => {
        onUpdate({
            ...data,
            buttons: [
                ...(data.buttons || []),
                {
                    title: 'Button',
                    url: 'http://example.com',
                    openNewTab: true
                }
            ]
        });
    };

    return (
        <div className={classes.root}>
            <>
                {
                    (data.buttons || []).map((btn, index) => (
                        <SettingsContainer key={index} title="Button">
                            <SettingsGroup
                                items={[
                                    <TextField
                                        fullWidth
                                        label="Title"
                                        value={btn.title}
                                        onChange={e => onUpdate({
                                            ...data,
                                            buttons: data.buttons.map((btn2, btnIndex) => (
                                                index === btnIndex
                                                    ? { ...btn, title: e.target.value }
                                                    : btn2
                                            ))
                                        })}
                                    />,

                                    <TextField
                                        fullWidth
                                        label="Url"
                                        value={btn.url}
                                        onChange={e => onUpdate({
                                            ...data,
                                            buttons: data.buttons.map((btn2, btnIndex) => (
                                                index === btnIndex
                                                    ? { ...btn, url: e.target.value }
                                                    : btn2
                                            ))
                                        })}
                                    />,

                                    <FormControlLabel
                                        label="Open in new tab"
                                        control={
                                            <Checkbox
                                                checked={btn.openNewTab}
                                                onChange={e => onUpdate({
                                                    ...data,
                                                    buttons: data.buttons.map((btn2, btnIndex) => (
                                                        index === btnIndex
                                                            ? { ...btn, openNewTab: e.target.checked }
                                                            : btn2
                                                    ))
                                                })}
                                            />
                                        }
                                    />,

                                    <div className={classes.deleteContainer}>
                                        <IconButton
                                            onClick={() => onUpdate({
                                                ...data,
                                                buttons: data.buttons.filter((_, btnIndex) => btnIndex !== index)
                                            })}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </div>
                                ]}
                            />
                        </SettingsContainer>
                    ))
                }
            </>

            <Button onClick={handleAddClick}>Add Button</Button>
        </div>
    );
};
