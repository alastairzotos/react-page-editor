import {
    getAllChildren,
    PageItem
} from '@bitmetro/cms-common';
import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { contentEditorActions } from '../../actions';
import { ItemContext, ItemEditorSettings, useDefaultStyles, useEditorTheme } from '@bitmetro/content-renderer';
import {
    getDraggingItem,
    getDropTarget,
    getSelectedItem,
    isResizingColumn
} from '../../selectors';
import { getIndexedItem } from '../../utils';
import { toolsColour } from '../common';
import { ContainerEditor } from '../editting/ContainerEditor';

import { Highlighters } from './Highlighters';
import { ItemTools } from './ItemTools';
import { Overlay } from './Overlay';

export interface ItemWrapperProps {
    item: PageItem;
    draggable?: boolean;
}

const useStyles = makeStyles(theme => ({
    root: {
        position: 'relative',
        width: '100%',
        minHeight: 30,
        // cursor: 'pointer'
    },
    rootHover: {
        outline: `1px dashed ${toolsColour}`
    },
    rootHighlight: {
        outline: `1px dashed ${toolsColour}`,
        boxShadow: '0px 0px 2px 1px #ffffff'
    },
    content: {
        position: 'relative'
    }
}));

export const ItemWrapper: React.FC<ItemWrapperProps> = ({
    item,
    draggable = true
}) => {
    const classes = useStyles();
    const defaultClasses = useDefaultStyles(item.props || { foo: 'bar' });

    const ref = React.useRef<HTMLDivElement>(null);

    const dispatch = useDispatch();

    const isResizing = useSelector(isResizingColumn);
    const draggingItem = useSelector(getDraggingItem);
    const selectedItem = useSelector(getSelectedItem);
    const dropTarget = useSelector(getDropTarget);

    const theme = useEditorTheme();
    const themeItem = theme.itemMap[item.itemType];

    if (!themeItem) {
        return <pre>Error: Unknown item</pre>;
    }

    const Component = themeItem.Component;
    const EditorComponent = themeItem.InlineComponent;

    const selectedSelf = !!selectedItem && selectedItem.id === item.id;
    const draggingSelf = !!draggingItem && draggingItem.item.id === item.id;

    const shouldShowSettings = themeItem.useInlineSettings && !!themeItem.Settings && selectedSelf;
    const InlineSettings: React.FC<ItemEditorSettings<any>> =
        shouldShowSettings
            ? themeItem.Settings[Object.keys(themeItem.Settings)[0]]
            : null;

    const isDraggingOver = !!dropTarget && !!dropTarget.container && (
        dropTarget.container.id === item.id ||

        // If we're dragging over a column, then implicitly we're dragging over the parent row
        (item.itemType === 'Row' && item.children.find(child => child.id === dropTarget.container.id))
    );

    const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();

        if (!draggingSelf) {
            // if (!!selectedItem && selectedItem.id === item.id) {
            //     dispatch(contentEditorActions.selectItem(null));
            // } else {
            //     dispatch(contentEditorActions.selectItem(item));
            // }
            dispatch(contentEditorActions.selectItem(item));
        }
    };

    const handleParentSelectorClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        const parent = getIndexedItem(item.parentId);

        if (parent) {
            if (parent.itemType === 'Column') {
                dispatch(contentEditorActions.selectItem(getIndexedItem(parent.parentId)));
            } else {
                dispatch(contentEditorActions.selectItem(parent));
            }
        } else {
            dispatch(contentEditorActions.selectItem(null));
        }
    };

    const handleDragHandleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        const rect = ref.current.getBoundingClientRect();

        const offset = {
            x: e.clientX - rect.x,
            y: e.clientY - rect.y
        };

        dispatch(contentEditorActions.dragItem({
            item,
            width: rect.width,
            height: rect.height,
            position: {
                x: e.clientX - offset.x,
                y: e.clientY - offset.y
            },
            offset,
            ignoreChildren: (
                item.children
                    ? getAllChildren(item, i => !!i.children, true)
                    : [item]
            ).map(i => i.id)
        }));

        const container = getIndexedItem(item.parentId);
        if (container) {
            const index = container.children.findIndex(child => child.id === item.id);

            dispatch(contentEditorActions.setDropTarget({
                container,
                index
            }));
        }
    };

    const handleDeleteClick = () => {
        dispatch(contentEditorActions.deleteSelectedItem());
    };

    const handleUpdate = (data: any) => {
        dispatch(contentEditorActions.updateSelectedItem({
            ...item,
            props: data
        }));
    };

    return (
        <div
            ref={ref}
            id={item.id}
            className={clsx(classes.root, {
                [classes.rootHover]: !isResizing && draggingSelf,
                [classes.rootHighlight]: selectedSelf
            })}

            onClick={handleClick}
        >
            <div>
                <div className={classes.content}>
                    <ItemContext item={item} themeItem={themeItem}>
                        {
                            !!EditorComponent
                                ? (
                                    <EditorComponent
                                        defaultClass={defaultClasses.root}
                                        {...item.props}
                                    />
                                )
                                : (
                                    shouldShowSettings
                                        ? <InlineSettings data={item.props} onUpdate={handleUpdate} />
                                        : (
                                            themeItem.isContainer
                                                ? (
                                                    <Component
                                                        defaultClass={defaultClasses.root}
                                                        {...item.props}
                                                    >
                                                        {/* <Overlay /> */}
                                                        <ContainerEditor container={item} />
                                                    </Component>
                                                )
                                                : (
                                                    <>
                                                        <Component
                                                            defaultClass={defaultClasses.root}
                                                            {...item.props}
                                                        />

                                                        {/* <Overlay /> */}
                                                    </>
                                                )
                                        )
                                )
                        }
                    </ItemContext>

                    {selectedSelf && <Highlighters />}
                </div>

                <ItemTools
                    item={item}
                    draggable={draggable}
                    draggingSelf={draggingSelf}
                    visible={selectedSelf || !!isDraggingOver}

                    handleParentSelectorClick={handleParentSelectorClick}
                    handleDragHandleClick={handleDragHandleClick}
                    handleDeleteClick={handleDeleteClick}
                />
            </div>
        </div>
    );
};
