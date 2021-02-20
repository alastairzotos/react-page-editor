import { PageItemContext, ThemeItemContext, useEditorTheme } from '@bitmetro/content-renderer';
import { makeStyles, Typography } from '@material-ui/core';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { contentEditorActions } from '../../actions';
import { Panel } from '../../atomic/atoms/Panel';
import { getSelectedItem } from '../../selectors';
import { ItemMenu } from '../itemMenu/ItemMenu';

import { SettingsGroup } from './SettingsGroup';

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.background.paper
    },
    notSelected: {
        color: theme.palette.text.hint
    }
}));

export const Settings: React.FC = () => {
    const classes = useStyles();

    const dispatch = useDispatch();
    const selectedItem = useSelector(getSelectedItem);
    const theme = useEditorTheme();
    const themeItems = theme.itemMap;

    const themeItem = !!selectedItem && themeItems[selectedItem.itemType];

    const ThemeItemSettings = !!themeItem && themeItem.Settings;
    const shouldShowSettings = !!ThemeItemSettings && !themeItem.useInlineSettings;

    const handleUpdateItem = (data: any) => {
        dispatch(
            contentEditorActions.updateSelectedItem({
                ...selectedItem,
                props: data
            })
        );
    };

    return (
        <Panel className={classes.root}>
            {!shouldShowSettings && (
                <ItemMenu />
            )}

            {shouldShowSettings && (
                <PageItemContext.Provider value={selectedItem}>
                    <ThemeItemContext.Provider value={themeItem}>
                        {
                            Object.keys(ThemeItemSettings).map((title, index) => {
                                const SettingsComp = ThemeItemSettings[title];

                                return (
                                    <SettingsGroup
                                        key={index}
                                        title={title}
                                        open={title === themeItem.name}
                                    >
                                        <SettingsComp
                                            data={selectedItem.props}
                                            onUpdate={handleUpdateItem}
                                        />
                                    </SettingsGroup>
                                );
                            })
                        }
                    </ThemeItemContext.Provider>
                </PageItemContext.Provider>
            )}

            {!shouldShowSettings && (
                <Typography className={classes.notSelected}>
                    Select an item to view properties
                </Typography>
            )}
        </Panel>
    );
};
