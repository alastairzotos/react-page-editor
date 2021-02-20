import {
    getAllChildren,
    hydratePrefab,
    PageItem,
    PAGE_CLASS,
    Prefab
} from '@bitmetro/cms-common';
import { useEditorTheme } from '@bitmetro/content-renderer';
import {
    FormControl,
    InputAdornment,
    makeStyles,
    OutlinedInput,
    Typography,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import * as React from 'react';
import { useDispatch } from 'react-redux';

import { contentEditorActions } from '../../actions';
import { Panel } from '../../atomic/atoms/Panel';
import { Position } from '../../models';
import { layoutPrefabs } from '../../prefabs';

import { ItemMenuSection, ItemMenuSectionProps } from './ItemMenuSection';

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        userSelect: 'none',
        height: '100%',
    },
    menu: {
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing(2),
        position: 'relative'
    },
    searchMargin: {
        margin: theme.spacing(1)
    },
    search: {
        borderRadius: 25
    },
    content: {
        width: '100%',
        height: '100%',
        overflowY: 'scroll',
        flexGrow: 1,
    }
}));

export const ItemMenu: React.FC = () => {
    const classes = useStyles();

    const theme = useEditorTheme();

    const dispatch = useDispatch();

    const [searchValue, setSearchValue] = React.useState('');

    const defaultWidth = 300;
    const defaultHeight = 150;

    const dragItem = (item: PageItem, position: Position) =>
        dispatch(contentEditorActions.dragItem({
            item,
            width: defaultWidth,
            height: defaultHeight,
            position,
            offset: {
                x: defaultWidth,
                y: 0
            },
            ignoreChildren: (
                item.children
                    ? getAllChildren(item, i => !!i.children, true)
                    : [item]
            ).map(i => i.id)
        }));

    const handleStartDrag = (itemName: string, position: Position) => {
        const themeItem = theme.itemMap[itemName];

        dragItem(themeItem.create(), position);
    };

    const handleAddPrefab = (prefab: Prefab, position: Position) => {
        dragItem(hydratePrefab(prefab), position);
    };

    const includeInSearch = (item: string) =>
        item.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase());

    const filterBySearch = (items: string[]): string[] => items.filter(includeInSearch);

    const sections: ItemMenuSectionProps[] = [
        {
            title: 'Layout',
            items: Object.keys(layoutPrefabs),
            onStartDrag: (itemName, position) => handleAddPrefab(layoutPrefabs[itemName], position)
        },
        {
            title: `${theme.name} Theme Items`,
            items: Object.keys(theme.itemMap).filter(i => i !== PAGE_CLASS && !theme.itemMap[i].hideFromMenu),
            onStartDrag: (itemName, position) => handleStartDrag(itemName, position)
        }
    ];

    if (theme.prefabs) {
        sections.push({
            title: `${theme.name} Theme Prefabs`,
            items: Object.keys(theme.prefabs),
            onStartDrag: (itemName, position) => handleAddPrefab(theme.prefabs[itemName], position)
        });
    }

    const searchedSections = sections.map(section => (
        includeInSearch(section.title)
            ? section
            : {
                ...section,
                items: filterBySearch(section.items)
            }
    ));

    return (
        <Panel className={classes.root}>
            <div className={classes.menu}>
                <Typography gutterBottom>Item Menu</Typography>

                <FormControl className={classes.searchMargin} variant="outlined" size="small">
                    <OutlinedInput
                        className={classes.search}
                        autoFocus

                        value={searchValue}
                        onChange={e => setSearchValue(e.target.value)}

                        endAdornment={
                            <InputAdornment position="end">
                                <SearchIcon />
                            </InputAdornment>
                        }
                    />
                </FormControl>

                <div className={classes.content}>
                    {
                        searchedSections.map((section, index) => (
                            <ItemMenuSection key={index} {...section} />
                        ))
                    }
                </div>

            </div>
        </Panel>
    );
};
